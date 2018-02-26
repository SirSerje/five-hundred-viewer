import React, {Component} from "react";
import {connect} from "react-redux";
import {add_X_to_FAVS, load_X_Photos} from "../actions/photos";
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
            title   : "",
            selected: false,
            sum     : 0,
            toFvs   : [],
            reset   : 0,
        };

        this.handler = this.handler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleHidden = this.toggleHidden.bind(this);
    }

    handler(e, one, selected) {
        e && e.preventDefault();

        let a;
        console.log(selected);
        if (selected) {
            a = this.state.sum + 1;
            this.state.toFvs.push(one);
        } else {
            this.state.toFvs.splice(this.state.toFvs.indexOf(one), 1);
            a = this.state.sum - 1;
        }
        this.setState({sum: a});
        console.log(this.state.sum);
    }


    handleSubmit(event) {
        event.preventDefault();
        this.props.loadPH(this.props.page + 1, this.props.photos);
    }

    toggleHidden() {
        //Дополнительная проверка
        if (this.state.sum > 0) {
            this.props.add_FAVS(this.state.toFvs);
            this.setState({sum: 0});
        }
    }

    click(index) {
        this.setState({active: index});
    }

    render() {
        return (
            <div class="container">
                <b>Top photo</b> <i>selected total : </i>{this.state.sum}

                {this.state.sum > 0 && <button className="btn btn-success btn-sm" onClick={this.toggleHidden}>
                    Favourites + </button>                    }


                <div class="row mt-3">
                    {this.props.photos.map((item, key) => (
                        <PhotoItem id={key} handler={this.handler} image_source={item}/>

                    ))}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log("mapStateToProps", state.favorites);
    return {
        photos: state.photos,
        page  : state.page,

        items: state.items,

        favorites: state.favorites,

        hasErrored: state.itemsHasErrored,
        isLoading : state.itemsIsLoading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadPH  : (page, photos) => dispatch(load_X_Photos(page, photos)),
        add_FAVS: (favs) => dispatch(add_X_to_FAVS(favs)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RunLoadPhotosComponent);