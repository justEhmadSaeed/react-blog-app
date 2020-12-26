import express from "express"
import { MongoClient } from "mongodb"

const app = express()

app.use(express.json())

app.get("/api/articles/:name", async (req, res) => {
	try {
		const articleName = req.params.name
		const client = await MongoClient.connect("mongodb://localhost:27017", {
			useUnifiedTopology: true,
		})
		const db = client.db("my-blog")

		const articleInfo = await db
			.collection("articles")
			.findOne({ name: articleName })

		res.status(200).json(articleInfo)
		client.close()
	} catch (error) {
		res.status(500).json({ message: "Error Connecting to db ", error })
	}
})

app.post("/api/articles/:name/upvote", async (req, res) => {
	try {
		const articleName = req.params.name
		const client = await MongoClient.connect("mongodb://localhost:27017", {
			useUnifiedTopology: true,
		})
		const db = client.db("my-blog")

		const articleInfo = await db
			.collection("articles")
			.findOne({ name: articleName })

		await db.collection("articles").updateOne(
			{ name: articleName },
			{
				$set: {
					upvotes: articleInfo.upvotes + 1,
				},
			}
		)
		const updatedInfo = await db
			.collection("articles")
			.findOne({ name: articleName })

		res.status(200).json(updatedInfo)
		client.close()
	} catch (error) {
		res.status(500).json({ message: "Error Connecting to db ", error })
	}
})
app.post("/api/articles/:name/comment", (req, res) => {
	const { username, comment } = req.body
	const articleName = req.params.name
	articleInfo[articleName].comments.push({ username, comment })
	res.status(200).send(articleInfo[articleName])
})
app.listen(8000, () => console.log("Listening on Port 8000"))
