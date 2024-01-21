import { WsTransport } from "@ndn/ws-transport";
import { openUplinks } from "@ndn/cli-common";
import { Endpoint } from "@ndn/endpoint";
import { Data, Name } from "@ndn/packet";
import { toUtf8 } from "@ndn/util";
await openUplinks();
export async function connection() {
  const endpoint = new Endpoint();
  // const socket = await WsTransport.createFace({}, "ws://172.24.68.2:9696/ws"); client only
  try {
    endpoint.produce("/started", (interest) => {
      return new Data(
        interest.name,
        Data.FreshnessPeriod(1000),
        toUtf8("Started Data")
      );
    });
  } catch (error) {
    return error;
  }
}
