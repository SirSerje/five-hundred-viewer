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
            title     : "",
            selected  : false,
            showButton: false,
            isHidden  : true,
            sum       : 0,
            toFvs     : [],
        };

        this.handler = this.handler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleHidden = this.toggleHidden.bind(this);
    }

    handler(e, one, selected) {
        //Проверка на нулл
        e && e.preventDefault();


        this.setState({showButton: !(one.selected)});


        if (!(one.selected)) {
            this.state.sum++;
            this.state.toFvs.push(one);
            console.log(this.state.toFvs);
        } else {
            this.state.toFvs.splice(this.state.toFvs.indexOf(one), 1);
            this.state.sum--;
            console.log(this.state.toFvs);

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

        //Дополнительная проверка
        if (this.state.sum > 0) {
            this.props.add_FAVS(this.state.toFvs);

            this.setState({sum: 0});

            {
                this.state.toFvs.map((item) => (
                    this.handler(null, item, 1)

                ));
            }
        }
    }

    render() {
        return (
            <div class="container">
                <b>Top photo</b> <i>selected total : </i>{this.state.sum}

                {this.state.sum > 0 && <button className="btn btn-success btn-sm" onClick={this.toggleHidden}>
                    Favourites + </button>                    }


                <div class="row mt-3">
                    {this.props.photos.map((item, key) => (
                        <PhotoItem  id={key} handler={this.handler} image_source={item}/>

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