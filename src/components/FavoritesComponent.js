import React, {Component} from "react";
import {connect} from "react-redux";
import PhotoItem from "../components/PhotoItem";
import {isEmptyObject} from "../utils/utils"
import {ld_fvs, rmv_F_FAVS} from "../actions/photos";


class FavoritesComponent extends Component {
    componentDidMount() {
        this.props.load_XM_fAvs;
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
                    resultArray.push(this.props.favorites[i])
                }
            }
            this.props.rmFS(resultArray);
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
                    {<button className={this.state.sum > 0 ? "btn btn-danger btn-sm" : "btn btn-danger disabled btn-sm"}
                             onClick={this.toggleHidden}>
                        Favourites X </button>                    }
                </div>

                <div class="row mt-3">

                    {!isEmptyObject(this.props.favorites) && this.props.favorites.map((item, key) => (
                        <PhotoItem slctd={this.state.selections[key]} id={key} handler={this.handler}
                                   image_source={item}/>
                    ))}

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
        rmFS: (favs) => dispatch(rmv_F_FAVS(favs)),
        load_XM_fAvs: dispatch(ld_fvs()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesComponent);



