import React from "react";

class PhotoItem extends React.Component {
    componentDidMount() {
        this.setState({photo: this.props.image_source, id: this.props.id});
        this.props.handler(null, this.props.id, 0);
    }

    constructor() {
        super();
        this.state = {
            title   : "",
           // selected: 0,
            photo   : "",
            id      : -1,
        };
        this.photoClick = this.photoClick.bind(this);
    }

    photoClick(event) {
        event && event.preventDefault();
        // this.setState({selected: this.props.slctd == 0 ? 1 : 0});
        this.props.handler(event, this.props.id, this.props.slctd == 0 ? 1 : 0, this.state);
    }

    render() {
        return (
            <div className="col-md-4">
                <img
                    src={this.state.photo.image_url}
                    alt="default"
                    class="img-thumbnail"
                    style={{"opacity": this.props.slctd == 1 ? .5 : 1}}
                    onClick={this.photoClick}
                />
                <p> id: {this.state.id} selected: {this.props.slctd}</p>
            </div>
        );
    }
}
export default PhotoItem;
