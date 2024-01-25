import { openUplinks } from "@ndn/cli-common";
import { Data, Interest, Name } from "@ndn/packet";
import {
  RepoProducer,
  DataStore,
  PrefixRegShorter,
  respondRdr,
} from "@ndn/repo";
import { delay, toUtf8 } from "@ndn/util";
import leveldown from "leveldown";
await openUplinks();

export class Produce {
  constructor(name, content) {
    this.named = new Name(`/${name}`);
    this.content = content;
  }
  static async makeDataStore() {
    const store = new DataStore(leveldown("./cs"));

    return store;
  }
  static async repoProducer() {
    const store = await Produce.makeDataStore();
    const producer = RepoProducer.create(store, {
      describe: "Just Test Implementasi",
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
  async insertData() {
    const { producer, store } = await Produce.repoProducer();
    const data = new Data(this.named);
    data.content = toUtf8(this.content);
    await store.insert(data);
    await delay(1000);
    producer.close();
    store.close();
  }
  async getData() {
    const { store } = await Produce.repoProducer();
    const data = await store.find(
      new Interest(this.named, Interest.MustBeFresh)
    );
    await store.close();
    return data.content;
  }

  async deleteData() {
    try {
      const { store } = await Produce.repoProducer();
      await store.delete(this.named);
      await delay(1000);
      await store.close();
      return "Deleted";
    } catch (error) {
      return error;
    }
  }
}
