import React from "react";
import {connect} from "react-redux";

const mapStateToProps = state => {
    console.log("Стейт ту пропс из листа", state.photos)
    return {photos: state.photos};
}


const PhotoView = ({photos}) => (
    <div>
        {photos.map(el => (
            <li className="list-group-item" key={el.id}>
                {el.title}
            </li>
        ))}
    </div>
);
const List = connect(mapStateToProps)(PhotoView);
export default List;