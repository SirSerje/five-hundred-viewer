import React, {Component} from "react";
import {connect} from "react-redux";
import {reactLocalStorage} from "reactjs-localstorage";
import PhotoItem from "../components/PhotoItem";
import {isEmptyObject} from "../utils/utils"


import {ld_fvs, rmv_F_FAVS} from "../actions/photos";


class FavoritesComponent extends Component {

    componentDidMount() {
                //TODO выполнить loadFavs
        this.props.load_XM_fAvs;
    }

    constructor() {
        super();
        this.state = {
            title     : "",
           // selected  : false,
            sum       : 0,
            toFvs     : [],
            reset     : 0,
            selections: [],
            items     : {},
        };

        this.handler = this.handler.bind(this);
        this.toggleHidden = this.toggleHidden.bind(this);
    }


    handler(e, one, selected, item) {
        e && e.preventDefault();

        if (item != undefined) {
            let a;
            if (selected) {
                a = this.state.sum + 1;
                this.state.toFvs.push(item);
            } else {
                this.state.toFvs.splice(this.state.toFvs.indexOf(item), 1);
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
            this.props.rmFS(this.state.toFvs);
            this.setState({toFvs: []}, () => console.log("X : ", this.state.toFvs));
            this.setState({sum: 0});
            //all disable
            var SR = this.state.selections;
            for (var i = 0; i < SR.length; i++) {
                SR[i] = 0;
            }
            this.setState({selections: SR});
        }
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

                    {!isEmptyObject(this.props.favorites) && this.props.favorites.map((item, key) =>  (
                        <PhotoItem slctd={this.state.selections[key]} id={key} handler={this.handler}
                                   image_source={item.photo}/>

                    ))}</div>
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
        //TODO реализовать удаление из фавориов
        //TODO подумать, смотреть ниже:
        //Возможно add_to_favorites и remove_from_favorites сделать одинм
        //и апдейтить просто в нем локал сторедж
        rmFS: (favs) => dispatch(rmv_F_FAVS(favs)),
        load_XM_fAvs: dispatch(ld_fvs()),

      //  add_FAVS: (favs) => dispatch(add_X_to_FAVS(favs)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesComponent);



