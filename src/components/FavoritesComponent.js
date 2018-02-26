import React, {Component} from "react";
import {connect} from "react-redux";
import {reactLocalStorage} from "reactjs-localstorage";
import PhotoItem from "../components/PhotoItem";

class FavoritesComponent extends Component {

    componentDidMount() {
    }

    constructor() {
        super();
        this.state = {
            title     : "",
            selected  : false,
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

        item && console.log(item.photo);
        if (item != undefined) {
            let a;
            if (selected) {
                a = this.state.sum + 1;
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
            console.log("Отправляем", this.state.toFvs);
            /*this.props.rmv_F_FAVS(this.state.toFvs);*/
            console.log("!", this.state.selections);
            console.log("+", this.state.toFvs); // <<<< тут храниться индекс того что надо выпилить


            this.setState({sum: 0});

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

                    {JSON.parse(reactLocalStorage.getObject("favs")).map((item, key) => (
                        <PhotoItem slctd={this.state.selections[key]} id={key} handler={this.handler}
                                   image_source={item.photo}/>

                    ))}</div>
            </div>);
    }
}
{/*{this.props.favorites.map((item, key) => (*/}

const mapStateToProps = (state) => {
    return {
        favorites: state.favorites,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        //rmv_F_FAVS: (favs) => dispatch(rm_v_f(favs))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesComponent);



