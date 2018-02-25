import React from "react";

class PhotoItem extends React.Component {


    constructor() {
        super();

        this.state = {
            title:"",
            selected:0
        };

        this.photoClick= this.photoClick.bind(this);
    }

    photoClick(event) {


        event.preventDefault();



        this.setState({selected: this.state.selected == 0 ? 1 : 0})
        this.props.handler(event, this.state.selected)

        /*console.log("PRESSED", event.target)*/
    }
        render() {
        return (
       <div className="col-md-4" >
           <img src={this.props.image_source} alt="default" class="img-thumbnail"  style={{"opacity":this.state.selected == 1 ? .5 : 1}} onClick= {this.photoClick}
           />
           <p>[debug] selected: {this.state.selected}</p>
        </div>
        )
    }
}
export default PhotoItem;
