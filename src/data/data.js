import { Endpoint } from "@ndn/endpoint";
import { FileMetadata } from "@ndn/fileserver";
import { retrieveMetadata } from "@ndn/rdr";
import { Data, Interest, Name } from "@ndn/packet";
import { fetch } from "@ndn/segmented-object";
import { store } from "../db/db.js";
import { toUtf8 } from "@ndn/util";
const endpoint = new Endpoint();

export async function getData() {
  const interest = new Interest(
    new Name("/test/index.js"),
    Interest.MustBeFresh
  );
  const metadata = await retrieveMetadata(interest.name, FileMetadata, {
    endpoint,
    retx: 100,
  });
  const payload = await fetch(metadata.name, {
    endpoint,
    retxLimit: 4,
  });
  //   await store.insert(
  //     new Data(interest.name, Data.FreshnessPeriod(1000), toUtf8(payload))
  //   );
  return payload;
}
