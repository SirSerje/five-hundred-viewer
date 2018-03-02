import React from "react";
import {connect} from "react-redux";
import {addToFavorites} from "../actions/FavoriteActions";
import {loadNewPhotos} from "../actions/PhotoActions";
import PhotoItem from "./ItemComponent";
import {style_top, phantom_top} from "../constants/StyleTypes";

class TopComponent extends React.Component {

	componentDidMount() {
		this.props.loadPhotos(this.props.page);

		window.addEventListener("scroll", (e) => {
			if (document.body.scrollHeight < (window.innerHeight + e.pageY)) {
				this.props.loadPhotos(this.props.page + 1, this.props.photos);
			}
		});
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
					resultArray.push(this.props.photos[i]);
				}
			}
			this.props.addFavorites(resultArray);
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
			<div class="container">
				<div class="row mt-3">
					{this.props.photos.map((item, key) => (
						<PhotoItem selected_item={this.state.selections[key]} id={key} handler={this.handler}
							image_source={item}/>
					))}
				</div>


				<div style={phantom_top}/>
				<div style={style_top}>
					<b>Top photo</b> <i>selected total : </i>{this.state.sum}
					{this.props.photosError &&
                    <span class="badge badge-pill badge-danger">{this.props.photosError.message}</span>}

					<div>
						{<button
							className={this.state.sum > 0 ? "btn btn-success btn-sm" : "btn btn-success disabled btn-sm"}
							onClick={this.toggleHidden}>
                            Favourites + </button>                    }
					</div>
				</div>


			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		photos     : state.photos,
		page       : state.page,
		photosError: state.photosError,
		items      : state.items,
		favorites  : state.favorites,
		hasErrored : state.itemsHasErrored,
		isLoading  : state.itemsIsLoading,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		loadPhotos  : (page, photos) => dispatch(loadNewPhotos(page, photos)),
		addFavorites: (favs) => dispatch(addToFavorites(favs)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(TopComponent);