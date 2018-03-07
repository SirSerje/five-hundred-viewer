import _ from "lodash";
import PropTypes from "prop-types";
import React from "react";
import {connect} from "react-redux";
import {loadFromFavorites, removeFromFavorites} from "../actions/FavoriteActions";
import "../styles/main.css";
import {isEmptyObject} from "../utils/Utils";
import PhotoItem from "./ItemComponent";

class FavoritesComponent extends React.Component {
	componentDidMount() {
		this.props.loadFavorites();
	}

	constructor() {
		super();
		this.state = {
			sum       : 0,
			selections: {},
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
		let selection_state = this.state.selections;
		selection_state[one] = selected;
		this.setState({
			selections: selection_state,
		});
	}

	toggleHidden() {
		if (this.state.sum > 0) {
			let resultArray = [];
			for (let m in this.state.selections) {
				if (this.state.selections[m] !== 0) {
					resultArray.push(_.find(this.props.favorites, function (o) {
						return Number(o.id) === Number(m);
					}));
				}
			}
			this.props.removeFavorites(resultArray);
			this.clearState();
		}
	}


	clearState() {
		this.setState({sum: 0});
		let selection_state = this.state.selections;
		for (let i in this.state.selections) {
			selection_state[i] = 0;
		}
		this.setState({selections: selection_state});
	}


	render() {
		return (
			<div className="container">
				<div className="row mt-3 offset-container">
					{!isEmptyObject(this.props.favorites) && this.props.favorites.map((item) => (
						<PhotoItem selected_item={this.state.selections[item.id]} key={item.id} id={item.id}
							handler={this.handler}
							image_source={item}/>
					))}
				</div>

				<div className="app-style-top">
					<b>Top photo</b> <i>selected total : </i>{this.state.sum}
					<div>
						{<button
							className={this.state.sum > 0 ? "favorite_remove" : "button-disabled"}
							onClick={this.toggleHidden}>
                            Favourites X </button>}
					</div>
				</div>
			</div>);
	}
}

FavoritesComponent.propTypes = {
	favorites: PropTypes.array,
};

const mapStateToProps = (state) => {
	return {
		favorites: state.favorites,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		removeFavorites: (favs) => dispatch(removeFromFavorites(favs)),
		loadFavorites  : () => dispatch(loadFromFavorites()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesComponent);