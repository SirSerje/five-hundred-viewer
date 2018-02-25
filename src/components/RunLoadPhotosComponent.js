import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import uuidv1 from "uuid";
import { itemsFetchData } from '../actions/items';
import { load_X_Photos } from '../actions/photos';


class RunLoadPhotosComponent extends Component {
    constructor() {
        super();

        this.state = {
            title:""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit= this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.id]: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.loadPH();
    }

    render() {
        const { title } = this.state;
        return (
            <div>
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        value={title}
                        onChange={this.handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-success btn-lg">
                    SAVE
                </button>
            </form>
                {console.log("RLPH render", this.props.photos)}
                {console.log("RLPH render items", this.props.items)}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log("mapStateToProps", state.photos)
    return {
        photos: state.photos,
        items: state.items,
        hasErrored: state.itemsHasErrored,
        isLoading: state.itemsIsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadPH: (url) => dispatch(load_X_Photos(1))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RunLoadPhotosComponent);