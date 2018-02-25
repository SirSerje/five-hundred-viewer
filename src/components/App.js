import React from "react";
import {BrowserRouter as Router, Route, withRouter} from "react-router-dom";
import RunLoadPhotosComponent from "../components/RunLoadPhotosComponent";
import FavoritesComponent from "./FavoritesComponent";


const App = () => (
    <Router>
        <div>

           {/* <div class="container">
                <div class="row mt-5">
                    <div className="col-md-4 offset-md-1">
                        <h2>Articles</h2>
                        <List />
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <h2>Add a new article</h2>
                        <Form />
                    </div>
                </div>
            </div>*/}

            <div class="container">
                <div class="row mt-3">
                        <ButtonTop/>
                        <ButtonFavorites/>


                </div>
            </div>



            <div class="container">
                <div class="row mt-3">
                    <div className="col-md">
                        <Route exact path="/" component={RunLoadPhotosComponent}/>
                        <Route exact path="/favorites" component={FavoritesComponent}/>
                    </div>
                </div>
            </div>


        </div>

    </Router>

);
export default App;

//TODO использовать одну кнопку вместо двух
const ButtonTop = withRouter(({history}) => (
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

const ButtonFavorites = withRouter(({history}) => (
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



