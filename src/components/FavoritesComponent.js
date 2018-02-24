import React, {Component} from "react";

class FavoritesComponent extends Component {
    constructor() {
        super();
        this.state = {
            title: "Favorites Component",
        };
    }

    render() {
        return (
            <b>{this.state.title}</b>
        );
    }
}


export default FavoritesComponent;

