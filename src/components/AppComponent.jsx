import React from "react";
import {BrowserRouter as Router, Route, withRouter} from "react-router-dom";
import FavoritesComponent from "./FavoritesComponent";
import RunLoadPhotosComponent from "./TopComponent";

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
    <Router>
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
    </Router>

);
export default App;

const TopButtonComponent = withRouter(({history}) => (
    <button
        className="btn btn-primary"
        type='button'
        onClick={() => {
            history.push("/");
        }}
    >
        HOT
    </button>
));

const FavoritesButtonComponent = withRouter(({history}) => (
    <button
        className="btn btn-warning"
        type='button'
        onClick={() => {
            history.push("/favorites");
        }}
    >
        FAV
    </button>
));



