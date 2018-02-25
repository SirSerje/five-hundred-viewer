import React, {Component} from "react";
import {connect} from "react-redux";
import {load_X_Photos} from "../actions/photos";


class RunLoadPhotosComponent extends Component {


    componentDidMount() {
        this.props.loadPH();
        window.addEventListener("scroll", (e) => {
            //console.log(document.body.scrollHeight,  window.innerHeight +  e.pageY)
            if (document.body.scrollHeight < (window.innerHeight +  e.pageY)) {
                console.log("OVERSCROLL!", this.props.page + 1) //TODO пофиксить работу props.page
                    this.props.loadPH(/*this.props.selectedFilter,*/ this.props.page + 1);
            }
        });
    }


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
                {/*<div className="form-group">
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
                 */}
            </form>

                {this.props.photos.map((item) => (
                    <img src={item.image_url[0]} alt="default" class="img-thumbnail" />
                ))}

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log("mapStateToProps", state.photos)
    return {
        photos: state.photos,
     //   items: state.items,
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