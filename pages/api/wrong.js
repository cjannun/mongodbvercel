import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

export default async function handler(request, response) {
  try {
    const mongoClient = await (new MongoClient(uri, options)).connect();
    console.log("Just connected!");
    const db = mongoClient.db("playerDatabase");
    const collection = db.collection("playersAndReports");
    const results = await collection
      .find({})
      .project({
        name: "Test name",
        streetAddress: "Test street address",
        country: "Test country",
        state: "Test state",
        city: "Test city",
        policeDept: "Test police department",
        policePhoneNumber: "Test police phone number",
        reports: 0,
        reportInfo: [
          { "liquidPlusUsernames": "test liquidplus", "additionalInfo": "test additional info" }
        ]
      })
      .limit(4)
      .toArray();
    
    response.status(200).json(results);
  } catch(e) {
    console.error(e);
    response.status(500).json(e);
  }
}