import FavoritesComponent from "./FavoritesComponent";
import RunLoadPhotosComponent from "./TopComponent";
import FavoritesButtonComponent from "./ui/FavoritesButtonComponent";
import TopButtonComponent from "./ui/TopButtonComponent";
import {BrowserRouter, Route} from "react-router-dom";
import React from "react";

var style = {
	backgroundColor: "#F8F8F8",
	borderTop      : "1px solid #E7E7E7",
	textAlign      : "center",
	padding        : "20px",
	position       : "fixed",
	left           : "0",
	bottom         : "0",
	height         : "60px",
	width          : "100%",
};

var phantom = {
	display: "block",
	padding: "20px",
	height : "60px",
	width  : "100%",
};

const App = () => (
	<BrowserRouter>
		<div>

			<div class="row mt-3">
				<div className="col-md">
					<Route exact path="/" component={RunLoadPhotosComponent}/>
					<Route exact path="/favorites" component={FavoritesComponent}/>
				</div>
			</div>
			<div style={phantom}/>
			<div style={style}>

				<div className="col-md">
					<TopButtonComponent/>
					<FavoritesButtonComponent/>
				</div>
			</div>
		</div>
	</BrowserRouter>

);
export default App;




