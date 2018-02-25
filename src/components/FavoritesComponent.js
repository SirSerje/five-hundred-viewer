import React, {Component} from "react";
import {connect} from "react-redux";
import {add_X_to_FAVS} from "../actions/photos";
import PhotoItem from "../components/PhotoItem";


class FavoritesComponent extends Component {
    constructor() {
        super();
        this.state = {
            title: "Favorites Component",
        };

        this.handler = this.handler.bind(this);

    }

    handler(e, one) {
        e.preventDefault();
        console.log("NOT IMPLEMENTED NOW");
    }

    render() {
        return (
            <div class="container">
                {/*     {this.state.sum}
                 <div>
                 {this.state.sum > 0 && <button className="btn btn-warning" onClick={this.toggleHidden}>
                 Favourites -> </button>                    }
                 </div>*/}


                <div class="row mt-3">
                    {console.log("++++------>",this.props.favorites)}
            {/*        <img src={this.props.favorites.image_url}/>*/}

                     {this.props.favorites.map((item) => (
                        <PhotoItem handler={this.handler} image_source={item}/>

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



