import React from "react";
import ArticlesList from "../components/ArticlesList";
import articles from "./article-content";

const ArticlePage = ({ match }) => {
	const name = match.params.name;
	const article = articles.find((art) => art.name === name);
	if (!article) return <h1>Article Not Found!</h1>;

	const otherArticles = articles.filter((article) => article.name !== name);
	return (
		<>
			<h1>{article.title}</h1>
			{article.content.map((para, key) => (
				<p key={key}>{para}</p>
			))}
			<h3>Other Articles</h3>
			<ArticlesList articles={otherArticles} />
		</>
	);
};
export default ArticlePage;
