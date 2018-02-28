import React, {Component} from "react";
import {connect} from "react-redux";
import {loadFromFavorites, removeFromFavorites} from "../actions/Photos";
import {isEmptyObject} from "../utils/Utils";
import PhotoItem from "./ItemComponent";

var style = {
    backgroundColor: "#F8F8F8",
    borderTop      : "1px solid #E7E7E7",
    textAlign      : "center",
    position       : "fixed",
    left           : "0",
    top            : "0",
    height         : "60px",
    width          : "100%",
};

var phantom = {
    display: "block",
    height : "60px",
    width  : "100%",
};


class FavoritesComponent extends Component {
    componentDidMount() {
        this.props.loadFavorites;
    }

    constructor() {
        super();
        this.state = {
            sum       : 0,
            selections: [],
        };
        this.handler = this.handler.bind(this);
        this.toggleHidden = this.toggleHidden.bind(this);
    }

    handler(e, one, selected, item) {
        e && e.preventDefault();
        let a;
        if (item != undefined) {
            if (selected) {
                a = this.state.sum + 1;
            } else {
                a = this.state.sum - 1;
            }
            this.setState({sum: a});
        }
        var selection_state = this.state.selections;
        selection_state[one] = selected;
        this.setState({
            selections: selection_state,
        });
    }

    toggleHidden() {
        if (this.state.sum > 0) {

            var resultArray = [];

            for (var i = 0; i < this.state.selections.length; i++) {
                if (this.state.selections[i] != 0) {
                    resultArray.push(this.props.favorites[i]);
                }
            }
            this.props.removeFavorites(resultArray);
            this.clearState();
        }
    }


    clearState() {
        this.setState({sum: 0});
        var selection_state = this.state.selections;
        for (var i = 0; i < selection_state.length; i++) {
            selection_state[i] = 0;
        }
        this.setState({selections: selection_state});
    }


    render() {
        return (
            <div class="container">
                <div class="row mt-3">

                    {!isEmptyObject(this.props.favorites) && this.props.favorites.map((item, key) => (
                        <PhotoItem selected_item={this.state.selections[key]} id={key} handler={this.handler}
                                   image_source={item}/>
                    ))}
                </div>

                <div style={phantom}/>
                <div style={style}>
                    <b>Top photo</b> <i>selected total : </i>{this.state.sum}
                    <div>
                        {<button
                            className={this.state.sum > 0 ? "btn btn-danger btn-sm" : "btn btn-danger disabled btn-sm"}
                            onClick={this.toggleHidden}>
                            Favourites X </button>}
                    </div>
                </div>
            </div>);
    }
}

const mapStateToProps = (state) => {
    return {
        favorites: state.favorites,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        removeFavorites: (favs) => dispatch(removeFromFavorites(favs)),
        loadFavorites  : dispatch(loadFromFavorites()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesComponent);


