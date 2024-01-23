import {
  DataStore,
  RepoProducer,
  PrefixRegShorter,
  respondRdr,
} from "@ndn/repo";
import leveldown from "leveldown";
import { generateSigningKey } from "@ndn/keychain";
import { enableNfdPrefixReg } from "@ndn/nfdmgmt";
import { UnixTransport } from "@ndn/node-transport";
import { openUplinks } from "@ndn/cli-common";
import { Endpoint } from "@ndn/endpoint";
import { Forwarder } from "@ndn/fw";
await openUplinks();
// const repo = RepoProducer.create(
//   store,
//   {
//     fallback: respondRdr({}),
//   },
//   PrefixRegShorter(1)
// );
const store = new DataStore(leveldown("./cs"));

export async function storage(data) {
  await store.insert(data);
}
const repo = RepoProducer.create(store, PrefixRegShorter(1));
