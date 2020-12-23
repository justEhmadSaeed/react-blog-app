import express from "express"

const app = express()

const articleInfo = {
	"learn-react": {
		upvotes: 0,
		comments: [],
	},
	"learn-node": {
		upvotes: 0,
		comments: [],
	},
	"my-thoughts-on-resumes": {
		upvotes: 0,
		comments: [],
	},
}
app.use(express.json())

app.post("/api/articles/:name/upvote", (req, res) => {
	const articleName = req.params.name
	articleInfo[articleName].upvotes++
	res
		.status(200)
		.send(`${articleName} now has ${articleInfo[articleName].upvotes} upvotes.`)
})
app.post("/api/articles/:name/comment", (req, res) => {
	const { username, comment } = req.body
	const articleName = req.params.name
	articleInfo[articleName].comments.push({ username, comment })
	res.status(200).send(articleInfo[articleName])
})
app.listen(8000, () => console.log("Listening on Port 8000"))
