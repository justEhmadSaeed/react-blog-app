import logo from "./logo.svg";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import ArticleList from "./pages/ArticleList";
import ArticlePage from "./pages/ArticlePage";
import AboutPage from "./pages/AboutPage";
import NavBar from "./NavBar";

function App() {
	return (
		<Router>
      <div className="App">
        <NavBar/>
				<div id="page-body">
					<Route path="/" component={HomePage} exact />
					<Route path="/about" component={AboutPage} />
					<Route path="/article-list" component={ArticleList} />
					<Route path="/article" component={ArticlePage} />
				</div>
			</div>
		</Router>
	);
}

export default App;
