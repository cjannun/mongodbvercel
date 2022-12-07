import { connectToDatabase } from "../../lib/connectToDatabase";

export default async function handler(request, response) {
  try {
    const { mongoClient } = await connectToDatabase();
    const db = mongoClient.db("test");
    const collection = db.collection("playersAndReports");
    const results = await collection
      .find({})
      .project({
        name: 0,
        streetAddress: 0,
        country: 0,
        state: 0,
        city: 0,
        policeDept: 0,
        policePhoneNumber: 0,
        reports: 0,
      })
      .limit(10)
      .toArray();
    
    response.status(200).json(results);
  } catch(e) {
    console.error(e);
    response.status(500).json(e);
  }
}