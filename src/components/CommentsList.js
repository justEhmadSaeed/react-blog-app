import React from "react"

const CommentsList = ({ comments }) => (
	<>
		<h3>Comments:</h3>
		{comments.map((comment, key) => (
			<div key={key} className="comment">
				<h4>{comment.username}</h4>
				<p>{comment.comment}</p>
			</div>
		))}
	</>
)

export default CommentsList
