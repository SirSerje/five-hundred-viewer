import _ from "lodash";
import PropTypes from "prop-types";
import React from "react";
import {connect} from "react-redux";
import {addToFavorites} from "../actions/FavoriteActions";
import {loadNewPhotos} from "../actions/PhotoActions";
import "../styles/main.css";
import PhotoItem from "./ItemComponent";


class TopComponent extends React.Component {

	componentDidMount() {
		this.props.loadPhotos(this.props.page);
		window.addEventListener("scroll", this.scrollHandler.bind(this));
	}

	componentWillUnmount() {
		window.removeEventListener("scroll", this.scrollHandler.bind(this));
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

	scrollHandler() {
		let d = document.documentElement;
		let offset = d.scrollTop + window.innerHeight;
		let height = d.offsetHeight;
		if (offset >= height) {
			this.props.loadPhotos(this.props.page + 1, this.props.photos);
		}
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
					resultArray.push(_.find(this.props.photos, function (o) {
						return Number(o.id) === Number(m);
					}));
				}
			}
			this.props.addFavorites(resultArray);
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
					{this.props.photos.map((item) => (
						<PhotoItem selected_item={this.state.selections[item.id]} key={item.id} id={item.id}
							handler={this.handler}
							image_source={item}/>
					))}
				</div>

				<div className="app-style-top">
					<b>Top photo</b> <i>selected total : </i>{this.state.sum}
					{this.props.photosError &&
                    <span className="badge badge-pill badge-danger">{this.props.photosError.message}</span>}

					<div>
						{<button
							className={this.state.sum > 0 ? "favorite-add": "button-disabled"}
							onClick={this.toggleHidden}>
                            Favourites + </button>                    }
					</div>
				</div>


			</div>
		);
	}
}

TopComponent.propTypes = {
	photos   : PropTypes.array,
	page     : PropTypes.number,
	favorites: PropTypes.array,
};

const mapStateToProps = (state) => {
	return {
		photos     : state.photos,
		page       : state.page,
		photosError: state.photosError,
		favorites  : state.favorites,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		loadPhotos  : (page, photos) => dispatch(loadNewPhotos(page, photos)),
		addFavorites: (favs) => dispatch(addToFavorites(favs)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(TopComponent);