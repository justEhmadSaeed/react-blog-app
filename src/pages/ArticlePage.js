import React from "react";
import articles from "./article-content";

const ArticlePage = ({ match }) => {
	const name = match.params.name;
	const article = articles.find((art) => art.name === name);
	if (!article) return <h1>Article Not Found!</h1>;

	return (
		<>
			<h1>{article.title}</h1>
			{article.content.map((para, key) => (
				<p key={key}>{para}</p>
			))}
		</>
	);
};
export default ArticlePage;
