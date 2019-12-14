import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getFirestore } from 'redux-firestore';
import Draggable from 'react-draggable';

class WireframeComponent extends React.Component {
    
    render() {
        const component = this.props.component;
        // console.log();
        var text = "";
        if(component.properties.text !== null) text = component.properties.text


        return (
            <Draggable 
            bounds="parent"
            cancel="span"
            >
                <div id={component.control+component.id} 
                className={component.control} 
                onClick={this.props.handleSelect}
                style ={component.properties}
                >
                    {text}
                    {/* <span onClick={this.handleResize} className="dot_top_right.hidden no-cursor"/> 
                    <span className="dot_top_left.hidden"/>
                    <span className="dot_bottom_right.hidden"/>
                    <span className="dot_bottom_left.hidden"/> */}
                </div>
            </Draggable>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
    };
};
export default WireframeComponent;