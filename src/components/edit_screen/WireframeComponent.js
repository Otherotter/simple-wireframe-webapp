import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getFirestore } from 'redux-firestore';
import Draggable from 'react-draggable';

class WireframeComponent extends React.Component {
    
    render() {
        const component = this.props.component;
        console.log(component);
        var text = null
        if(component.properties.text != null) text = component.properties.text


        return (
            <Draggable 
            bounds="parent"
           
            >
                <div id={component.control+component.id} 
                className={component.control} 
                onClick={this.props.handleSelect}
                style={component.properties}>
                    {text}
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