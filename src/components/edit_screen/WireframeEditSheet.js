import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {Redirect} from 'react-router-dom';
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase';





class WireframeEditSheet extends React.Component {
    constructor(){
        super();
         // This binding is necessary to make `this` work in the callback
        this.handleDrag = this.handleDrag.bind(this);
    }
    allowDrop(ev) {
        ev.preventDefault();
    }
      
    handleDrag = (ev) => {
        console.log(ev);
        console.log(ev.target.id);
        console.log(this);
        ev.dataTransfer.setData("text/plain", ev.target.innerText); //chanage this
        
    }
    
    drop(ev) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        ev.target.appendChild(document.getElementById(data));
    }

    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/Login" />;
        }
        return (

            <div id="wireframesheet">
                <div class="row">
                    <div class="col-2">
                        <div class="d-flex flex-column bd-highlight mb-3">
                            <div class="p-2 bd-highlight">
                                <div className="component_container" draggable="true" onDragStart={this.handleDrag}/>  
                                <label>Container</label>
                            </div>
                            <div class="p-2 bd-highlight">
                                <div className="component_label" draggable="true" onDragStart={this.handleDrag}>
                                    <p className="component_description">Prompt for Input:</p>
                                </div>  
                                <label>Label</label>
                            </div>
                            <div class="p-2 bd-highlight"> 
                                <div className="component_button" draggable="true" onDragStart={this.handleDrag}>Submit</div>
                                <label>Button</label>
                            </div>
                            <div class="p-2 bd-highlight"> 
                                <div className="component_textfield" type="text" draggable="true" onDragStart={this.handleDrag}>
                                    <p className="component_description">Input</p>
                                </div>
                                <label>Textfield</label>
                            </div>
                        </div>
                    </div>
                    <div class="col-8">
                        <div id="document-area">
                            
                                <canvas id="myCanvas">

                                </canvas>
                           
                            
                            
                        </div>
                    </div>
                    <div class="col-1">
                        INPUTS
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const todoList = ownProps.todoList;
    return {
        todoList,
        auth: state.firebase.auth,
    };
};
export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'todoLists' },
    ]),
)(WireframeEditSheet);