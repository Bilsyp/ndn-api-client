import { Endpoint } from "@ndn/endpoint";
import { Interest, Name } from "@ndn/packet";

export async function consume() {
  const endpoint = new Endpoint();
  const interest = new Interest(new Name("/next"), Interest.MustBeFresh);
  try {
    const consumes = await endpoint.consume(interest.name, { retx: 100 });
    console.log(consumes);
  } catch (error) {
    console.log(error);
  }
}
