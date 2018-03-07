import {connect} from "react-redux";
import {loadFromFavorites, removeFromFavorites} from "../actions/FavoriteActions";
import {isEmptyObject} from "../utils/Utils";
import PhotoItem from "./ItemComponent";
import React from "react";
import {STYLE_TOP, OFFSET_CONTAINER, FAVORITE_REMOVE, BUTTON_DISABLED} from "../constants/StyleTypes";

import "../styles/main.css";

class FavoritesComponent extends React.Component {
	componentDidMount() {
		this.props.loadFavorites;
	}

	constructor() {
		super();
		this.state = {
			sum       : 0,
			selections: [],
		};
		this.handler = this.handler.bind(this);
		this.toggleHidden = this.toggleHidden.bind(this);
	}

	handler(e, one, selected, item) {
		e && e.preventDefault();
		let a;
		if (item !== undefined) {
			if (selected) {
				a = this.state.sum + 1;
			} else {
				a = this.state.sum - 1;
			}
			this.setState({sum: a});
		}
		var selection_state = this.state.selections;
		selection_state[one] = selected;
		this.setState({
			selections: selection_state,
		});
	}

	toggleHidden() {
		if (this.state.sum > 0) {

			var resultArray = [];

			for (var i = 0; i < this.state.selections.length; i++) {
				if (this.state.selections[i] !== 0) {
					resultArray.push(this.props.favorites[i]);
				}
			}
			this.props.removeFavorites(resultArray);
			this.clearState();
		}
	}


	clearState() {
		this.setState({sum: 0});
		var selection_state = this.state.selections;
		for (var i = 0; i < selection_state.length; i++) {
			selection_state[i] = 0;
		}
		this.setState({selections: selection_state});
	}


	render() {
		return (
			<div className="container">
				<div className={OFFSET_CONTAINER}>
					{!isEmptyObject(this.props.favorites) && this.props.favorites.map((item, key) => (
						<PhotoItem selected_item={this.state.selections[key]} id={key} handler={this.handler}
							image_source={item}/>
					))}
				</div>

				<div className ={STYLE_TOP}>
					<b>Top photo</b> <i>selected total : </i>{this.state.sum}
					<div>
						{<button
							className={this.state.sum > 0 ? FAVORITE_REMOVE : BUTTON_DISABLED}
							onClick={this.toggleHidden}>
                            Favourites X </button>}
					</div>
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
		removeFavorites: (favs) => dispatch(removeFromFavorites(favs)),
		loadFavorites  : dispatch(loadFromFavorites()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesComponent);