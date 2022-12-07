import { connectToDatabase } from "../../lib/connectToDatabase";

<script async
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBir_vOTx0F4JfL28QfCzewZyX2QB366Z8&libraries=places&callback=initMap">
</script>

export default async function handler(request, response) {
  try {
    const { mongoClient } = await connectToDatabase();
    const db = mongoClient.db("test");
    const collection = db.collection("playersAndReports");
    const results = await collection
      .find({})
      .project({
        streetAddress: 0,
        country: 0,
      })
      .limit(10)
      .toArray();
    
    response.status(200).json(results);
  } catch(e) {
    console.error(e);
    response.status(500).json(e);
  }
}