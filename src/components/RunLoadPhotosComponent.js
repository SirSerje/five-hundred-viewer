import React, {Component} from "react";
import {connect} from "react-redux";
import {add_X_to_FAVS, load_X_Photos} from "../actions/photos";
import PhotoItem from "../components/PhotoItem";

class RunLoadPhotosComponent extends Component {

    componentDidMount() {
        this.props.loadPH(this.props.page);


        window.addEventListener("scroll", (e) => {
            if (document.body.scrollHeight < (window.innerHeight + e.pageY)) {
                this.props.loadPH(this.props.page + 1, this.props.photos);
            }
        });
    }


    constructor() {
        super();
        this.state = {
            sum: 0,
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
        var SR = this.state.selections;
        SR[one] = selected;
        this.setState({
            selections: SR,
        });
    }

    toggleHidden() {
        if (this.state.sum > 0) {

            var resultArray = []

            for (var i = 0; i < this.state.selections.length; i++) {
                if (this.state.selections[i] == 0) {

                } else {
                    resultArray.push(this.props.photos[i])
                }
            }

            this.props.add_FAVS(resultArray);
            this.clearState()

        }
    }

    clearState() {
        this.setState({sum: 0});
        var SR = this.state.selections;
        for (var i = 0; i < SR.length; i++) {
            SR[i] = 0;
        }
        this.setState({selections: SR});
    }

    render() {
        return (
            <div class="container">
                <b>Top photo</b> <i>selected total : </i>{this.state.sum}
                <div>
                    {<button
                        className={this.state.sum > 0 ? "btn btn-success btn-sm" : "btn btn-success disabled btn-sm"}
                        onClick={this.toggleHidden}>
                        Favourites + </button>                    }
                </div>

                <div class="row mt-3">

                    {this.props.photos.map((item, key) => (
                        <PhotoItem slctd={this.state.selections[key]} id={key} handler={this.handler}
                                   image_source={item}/>

                    ))}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        photos: state.photos,
        page: state.page,
        items: state.items,
        favorites: state.favorites,
        hasErrored: state.itemsHasErrored,
        isLoading: state.itemsIsLoading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadPH: (page, photos) => dispatch(load_X_Photos(page, photos)),
        add_FAVS: (favs) => dispatch(add_X_to_FAVS(favs)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RunLoadPhotosComponent);