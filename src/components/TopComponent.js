import React, {Component} from "react";

class TopComponent extends Component {
    constructor() {
        super();
        this.state = {
            title: "Top Component",
        };
    }

    render() {
        return (
            <b>{this.state.title}</b>
        );
    }
}


export default TopComponent;



