import { Endpoint } from "@ndn/endpoint";
import { Data, FwHint, Interest, digestSigning } from "@ndn/packet";
import { Encoder } from "@ndn/tlv";
import { Forwarder } from "@ndn/fw";
import { openUplinks } from "@ndn/cli-common";
await openUplinks();
export async function producing(prefix, content) {
  const fws = new Forwarder.create();

  const endpoint = new Endpoint({
    fw: fws,
  });
  try {
    endpoint.produce(prefix, async (interest) => {
      const data = new Data(interest.name, Data.FreshnessPeriod(20000));
      data.content = content;
      await digestSigning.sign(data);
      await digestSigning.verify(data);
      const result = Encoder.encode(data);
      return result;
    });
  } catch (error) {}
}
