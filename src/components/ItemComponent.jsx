import PropTypes from "prop-types";
import React from "react";

class PhotoItem extends React.Component {
  componentDidMount() {
    this.setState({ photo: this.props.image_source, id: this.props.id });
    this.props.handler(null, this.props.id, 0);
  }

  constructor() {
    super();
    this.photoClick = this.photoClick.bind(this);
  }

  photoClick(event) {
    event && event.preventDefault();
    this.props.handler(
      event,
      this.props.id,
      this.props.selected_item === 0 ? 1 : 0,
      this.props
    );
  }

  render() {
    return (
      <div className="col-md-4">
        <img
          src={this.props.image_source.image_url[0]}
          alt="default"
          className="img-thumbnail"
          style={{ opacity: this.props.selected_item === 1 ? 0.5 : 1 }}
          onClick={this.photoClick}
        />
        <p />
      </div>
    );
  }
}
export default PhotoItem;

PhotoItem.propTypes = {
  image_url: PropTypes.array,
  image_source: PropTypes.object,
  selected_item: PropTypes.number,
  id: PropTypes.number
};
