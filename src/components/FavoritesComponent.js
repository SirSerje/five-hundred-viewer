import React, {Component} from "react";
import {connect} from "react-redux";
import {add_X_to_FAVS} from "../actions/photos";
import PhotoItem from "../components/PhotoItem";


class FavoritesComponent extends Component {
    constructor() {
        super();
        this.state = {
            title: "Favorites Component",
            toFvs:[],
            sum:0


        };


        this.handler = this.handler.bind(this);
        this.toggleHidden = this.toggleHidden.bind(this);

    }



    handler(e, one) {
        e.preventDefault();

        this.setState({showButton: !(one.selected)});
        console.log("!!!", one.selected)

        if(!(one.selected)) {
            this.state.sum++
            this.state.toFvs.push(one)
        } else {
            this.state.toFvs.splice(this.state.toFvs.indexOf(one),1)
            this.state.sum--

        }

    }

    toggleHidden() {
        this.setState({
            isHidden: !this.state.isHidden,
        });
        console.log(this.state.isHidden);

        //arr.push(this.props.photos[1]);
        if(this.state.sum > 0) {
        this.props.add_FAVS(this.state.toFvs);
        }

    }

    render() {
        return (
            <div class="container">
                <b>Favorite photo</b> <i>selected total : </i>{this.state.sum}





                    {
                        this.state.sum > 0 &&
                        <button
                            className="btn btn-danger btn-sm"
                            onClick={this.toggleHidden}>
                            Favourites X
                        </button>
                    }



                <div class="row mt-3">

                     {this.props.favorites.map((item) => (
                     <PhotoItem handler={this.handler} image_source={item.photo}/>
                    ))}



                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        favorites: state.favorites,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        add_FAVS: (favs) => dispatch(add_X_to_FAVS(favs)),
        //rmv_F_FAVS: (favs) => dispatch(rm_v_f(favs))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesComponent);



