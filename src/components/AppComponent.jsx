import React from "react";
import {BrowserRouter, Route} from "react-router-dom";
import {STYLE} from "../constants/StyleTypes";
import "../styles/main.css";
import FavoritesComponent from "./FavoritesComponent";
import RunLoadPhotosComponent from "./TopComponent";
import FavoritesButtonComponent from "./ui/FavoritesButtonComponent";
import TopButtonComponent from "./ui/TopButtonComponent";

const App = () => (
	<BrowserRouter>
		<div>

			<div className="row mt-3">
				<div className="col-md">
					<Route exact path="/" component={RunLoadPhotosComponent}/>
					<Route exact path="/favorites" component={FavoritesComponent}/>
				</div>
			</div>
			<div className={STYLE}>

				<div className="col-md">
					<TopButtonComponent/>
					<FavoritesButtonComponent/>
				</div>
			</div>
		</div>
	</BrowserRouter>

);
export default App;




