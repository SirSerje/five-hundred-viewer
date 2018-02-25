import React, {Component} from "react";
import {connect} from "react-redux";
import {load_X_Photos} from "../actions/photos";
import PhotoItem from "../components/PhotoItem"


class RunLoadPhotosComponent extends Component {


    componentDidMount() {
        this.props.loadPH(this.props.page);

        console.log("component did mount" , this.props.page);

        window.addEventListener("scroll", (e) => {
            //console.log(document.body.scrollHeight,  window.innerHeight +  e.pageY)
            if (document.body.scrollHeight < (window.innerHeight +  e.pageY)) {
                console.log("OVERSCROLL!", this.props.page + 1) //TODO пофиксить работу props.page
                    this.props.loadPH(/*this.props.selectedFilter,*/ this.props.page + 1, this.props.photos);
            }
        });
    }


    constructor() {
        super();

        this.state = {
            title:"",
            selected:false
        };

        this.handler = this.handler.bind(this);
        //this.handleChange = this.handleChange.bind(this);
        this.handleSubmit= this.handleSubmit.bind(this);
        //this.photoClick= this.photoClick.bind(this);
    }

    handler(e, one) {
        e.preventDefault();
        console.log(!one)

    }

    /*handler(event) {
        console.log("UPDATE FORM")
        event.targer.setState({selected: this.state.selected == 0 ? 1 : 0})
    }*/

    handleSubmit(event) {
        event.preventDefault();
        this.props.loadPH(this.props.page+1, this.props.photos);
    }

  /*  photoClick(event) {
        event.preventDefault();
        console.log("PRESSED")
    }*/

    render() {
        return (
            <div>
                {/*<b>{this.props.page}</b>*/}
            {/*<form onSubmit={this.handleSubmit}>*/}

                {/*<nav class="navbar navbar-default navbar-fixed-top">HEADER</nav>*/}


                {/*<button type="submit" className="btn btn-success btn-lg">
                    SAVE
                </button>*/}
            {/*</form>*/}
                {console.log(">>>>",this.props.photos)}

                <div class="container">
                    <div class="row mt-3">
                            {this.props.photos.map((item) => (
                                <PhotoItem   handler = {this.handler} image_source={item.image_url[0]}/>
                            ))}


                    </div>
                </div>



            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log("mapStateToProps", state)
    return {
        photos: state.photos,
        page: state.page,
        items: state.items,
        hasErrored: state.itemsHasErrored,
        isLoading: state.itemsIsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadPH: (page, photos) => dispatch(load_X_Photos(page, photos))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RunLoadPhotosComponent);