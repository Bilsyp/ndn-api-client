import { Endpoint } from "@ndn/endpoint";
import { Data, Interest } from "@ndn/packet";
import { toUtf8 } from "@ndn/util";
import { Forwarder } from "@ndn/fw";
import { Name } from "@ndn/packet";
import { generateSigningKey } from "@ndn/keychain";
import { enableNfdPrefixReg } from "@ndn/nfdmgmt";
import { UnixTransport } from "@ndn/node-transport";
import fs from "node:fs";
import { checkData } from "../consume/consume.js";
class Produce {
  constructor(name, content) {
    this.uri = new Interest(new Name(name));
    this.content = content;
    this.fw = Forwarder.create();
    this.endpoint = new Endpoint();
  }
  async produces(check) {
    const socket = await UnixTransport.createFace(
      { fw: this.fw, addRoutes: [this.uri.name] },
      "/run/nfd/nfd.sock"
    );
    const [privatekey] = await generateSigningKey("K");
    enableNfdPrefixReg(socket, { signer: privatekey });
    const interest = { name: this.uri.name };

    const producing = new Endpoint({ fw: this.fw }).produce(
      interest.name,
      async (interest) => {
        const data = new Data(
          interest.name,
          Data.FreshnessPeriod(3000),
          toUtf8(this.content)
        );
        return data;
      }
    );
  }
}
// const content = await getData();
// content.forEach(async (item) => {
//   const check = await checkData(item.prefix);
//   if (!check) {
//     const data = new Produce(item.prefix, item.content);
//     await data.produces(item.prefix);
//     console.log(" add route");
//   } else {
//     console.log(" route");
//   }
// });
fs.readFile("../content/content.json", "utf-8", async (err, data) => {
  const content = JSON.parse(data);
  content.forEach(async (item) => {
    const check = await checkData(item.prefix);
    if (!check) {
      const data = new Produce(item.prefix, item.content);
      await data.produces(item.prefix);
      console.log(" route");
    } else {
      console.log(" route");
    }
  });
});
