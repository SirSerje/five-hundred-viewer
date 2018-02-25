import React, {Component} from "react";
import {connect} from "react-redux";
import {load_X_Photos, add_X_to_FAVS} from "../actions/photos";
import PhotoItem from "../components/PhotoItem";


class RunLoadPhotosComponent extends Component {

    componentDidMount() {
        this.props.loadPH(this.props.page);

        console.log("component did mount", this.props.page);

        window.addEventListener("scroll", (e) => {
            if (document.body.scrollHeight < (window.innerHeight + e.pageY)) {
                console.log("OVERSCROLL!", this.props.page + 1); //TODO пофиксить работу props.page
                this.props.loadPH(this.props.page + 1, this.props.photos);
            }
        });
    }

    constructor() {
        super();
        this.state = {
            title     : "",
            selected  : false,
            showButton: false,
            isHidden  : true,
            sum:0
        };

        this.handler = this.handler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleHidden = this.toggleHidden.bind(this);
    }

    handler(e, one) {
        e.preventDefault();

        this.setState({showButton: !(one.selected)});
        if(!(one.selected)) {
         this.state.sum++
        } else {
            this.state.sum--
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.loadPH(this.props.page + 1, this.props.photos);
    }

    toggleHidden() {
        this.setState({
            isHidden: !this.state.isHidden,
        });
        console.log(this.state.isHidden);

let arr =[]
        arr.push(this.props.photos[0]);
        //arr.push(this.props.photos[1]);
        this.props.add_FAVS(arr);

    }

    render() {
        return (
            <div class="container">
                {this.state.sum}
                <div>
                    {this.state.sum > 0 && <button className="btn btn-warning" onClick={this.toggleHidden}>
                        Favourites -> </button>                    }
                </div>


                <div class="row mt-3">
                    {this.props.photos.map((item) => (

                        <PhotoItem handler={this.handler} image_source={item}/>

                    ))}
                </div>
            </div>
        );
    }
}
const Child = () => (
    <p>Hello, World!</p>
);

const mapStateToProps = (state) => {
    console.log("mapStateToProps", state.favorites);
    return {
        photos    : state.photos,
        page      : state.page,
        items     : state.items,
        hasErrored: state.itemsHasErrored,
        isLoading : state.itemsIsLoading,

        favorites: state.favorites
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadPH: (page, photos) => dispatch(load_X_Photos(page, photos)),
        add_FAVS: (favs) => dispatch(add_X_to_FAVS( favs)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RunLoadPhotosComponent);