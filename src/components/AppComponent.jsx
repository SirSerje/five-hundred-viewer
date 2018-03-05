import FavoritesComponent from "./FavoritesComponent";
import RunLoadPhotosComponent from "./TopComponent";
import FavoritesButtonComponent from "./ui/FavoritesButtonComponent";
import TopButtonComponent from "./ui/TopButtonComponent";
import {BrowserRouter, Route} from "react-router-dom";
import React from "react";
import "../styles/main.css";

const App = () => (
	<BrowserRouter>
		<div>

			<div class="row mt-3">
				<div className="col-md">
					<Route exact path="/" component={RunLoadPhotosComponent}/>
					<Route exact path="/favorites" component={FavoritesComponent}/>
				</div>
			</div>
			<div className ="app-phantom"/>
			<div className ="app-style">

				<div className="col-md">
					<TopButtonComponent/>
					<FavoritesButtonComponent/>
				</div>
			</div>
		</div>
	</BrowserRouter>

);
export default App;




