import express from "express"

const app = express()

const articleInfo = {
	"learn-react": {
		upvotes: 0,
	},
	"learn-node": {
		upvotes: 0,
	},
	"my-thoughts-on-resumes": {
		upvotes: 0,
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

app.listen(8000, () => console.log("Listening on Port 8000"))
