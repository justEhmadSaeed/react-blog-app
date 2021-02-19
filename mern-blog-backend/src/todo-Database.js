const MongoClient = require("mongodb")

// Rename the File to Database.js and insert your API key below
 
async function withDB(operations, res) {
	try {
		const client = await MongoClient.connect(
			// Replace it with your monogdb API key
			"YOUR_API_KEY",
			{
				useUnifiedTopology: true,
			}
		)
		const db = client.db("my-blog")
		await operations(db)

		client.close()
	} catch (error) {
		res.status(500).json({ message: "Error Connecting to db ", error })
	}
}
module.exports.withDB = withDB