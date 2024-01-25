import {
  DataStore,
  RepoProducer,
  PrefixRegShorter,
  respondRdr,
  PrefixRegDynamic,
  PrefixRegStatic,
} from "@ndn/repo";
import leveldown from "leveldown";

import { openUplinks } from "@ndn/cli-common";
import { delay } from "@ndn/util";
import { Name } from "@ndn/packet";

await openUplinks();

export async function makeDataStore(pkts) {
  const store = new DataStore(leveldown("./cs"));
  await store.insert(pkts);

  return store;
}
export async function getDataStore(pkts) {
  const store = new DataStore(leveldown("./cs"));
  const data = await store.get(new Name("/nexus"));
  // store.close();
  return data.content;
}
export async function makeRepoProducer(data) {
  const store = await makeDataStore(data);
  const producer = RepoProducer.create(store, {
    describe: "RepoProducer test-fixture",
    reg: PrefixRegShorter(1),
    fallback: respondRdr(),
  });

  return {
    store,
    producer,
    async close() {
      try {
        await store.close();
        producer.close();
      } catch {}
    },
  };
}
