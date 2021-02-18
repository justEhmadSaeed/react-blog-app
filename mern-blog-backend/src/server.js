'use strict'
const express = require('express')
const path = require('path')
const { withDB } = require('./Database')
const app = express()

app.use(express.static(path.join(__dirname, '/build')))

app.use(express.json())

app.get('/api/articles/:name', function (req, res) {
	const articleName = req.params.name
	withDB(async function (db) {
		const articleInfo = await db
			.collection('articles')
			.findOne({ name: articleName })
		res.status(200).json(articleInfo)
	}, res)
})

app.post('/api/articles/:name/upvote', function (req, res) {
	const articleName = req.params.name

	withDB(async function (db) {
		const articleInfo = await db
			.collection('articles')
			.findOne({ name: articleName })

		await db.collection('articles').updateOne(
			{ name: articleName },
			{
				$set: {
					upvotes: articleInfo.upvotes + 1,
				},
			}
		)
		const updatedInfo = await db
			.collection('articles')
			.findOne({ name: articleName })

		res.status(200).json(updatedInfo)
	}, res)
})
app.post('/api/articles/:name/comment', function (req, res) {
	const { username, comment } = req.body
	const articleName = req.params.name
	withDB(async function (db) {
		const articleInfo = await db
			.collection('articles')
			.findOne({ name: articleName })
		await db.collection('articles').updateOne(
			{ name: articleName },
			{
				$set: {
					comments: articleInfo.comments.concat({ username, comment }),
				},
			}
		)
		const updatedInfo = await db
			.collection('articles')
			.findOne({ name: articleName })

		res.status(200).json(updatedInfo)
	}, res)
})

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/build/index.html'))
})

app.listen(process.env.PORT || 8000, () =>
	console.log('Listening on Port 8000')
)
