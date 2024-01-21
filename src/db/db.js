import { RepoProducer, PrefixRegShorter, DataStore } from "@ndn/repo";

import { Name, Data, Interest } from "@ndn/packet";
import leveldown from "leveldown";
import { delay } from "@ndn/util";

export const store = new DataStore(leveldown("./cs"));

const p = RepoProducer.create(store, { reg: PrefixRegShorter(1) });
