import React from "react";

class PhotoItem extends React.Component {

    componentDidMount() {
        this.setState({photo:this.props.image_source, id:this.props.id})

    }

    constructor() {
        super();

        this.state = {
            title:"",
            selected:false,
            photo:"",
            id:-1
        };

        this.photoClick= this.photoClick.bind(this);
    }

    photoClick(event) {

        event.preventDefault();

        this.setState({selected: !this.state.selected})
        this.props.handler(event, this.state)
    }
        render() {

        return (

       <div className="col-md-4" >

           <img
               src={this.state.photo.image_url}
               alt="default"
               class="img-thumbnail"
               style={{"opacity":this.state.selected == true ? .5 : 1}}
               onClick= {this.photoClick}
           />
           <p> id: {this.state.id}  selected: {this.state.selected}</p>{/*TODO rearrange this*/}
        </div>
        )
    }
}
export default PhotoItem;

{/*{this.state.photo.image_url[0]}*/}
