import React from "react";

class PhotoItem extends React.Component {

    componentDidMount() {
        this.setState({photo:this.props.image_source})

        //console.log("!", this.state.photo)
        console.log("!", this.props.image_source)
    }

    constructor() {
        super();

        this.state = {
            title:"",
            selected:0,
            photo:"",
        };

        this.photoClick= this.photoClick.bind(this);
    }

    photoClick(event) {

        event.preventDefault();

        this.setState({selected: this.state.selected == 0 ? 1 : 0})
        this.props.handler(event, this.state)
    }
        render() {

        return (

       <div className="col-md-4" >

           <img
               src={this.state.photo.image_url}
               alt="default"
               class="img-thumbnail"
               style={{"opacity":this.state.selected == 1 ? .5 : 1}}
               onClick= {this.photoClick}
           />

           <p>[debug] selected: {this.state.selected}</p>
        </div>
        )
    }
}
export default PhotoItem;

{/*{this.state.photo.image_url[0]}*/}
