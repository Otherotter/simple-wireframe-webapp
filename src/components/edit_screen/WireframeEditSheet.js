
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {Redirect} from 'react-router-dom';
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase';
import Draggable from 'react-draggable';
import WireframeComponent from './WireframeComponent';
import Properties from './Properties';



class WireframeEditSheet extends React.Component {
    constructor(){
        super();
         // This binding is necessary to make `this` work in the callback
        // this.handleElementDrag = this.handleElementDrag.bind(this);
        // this.dragMouseDown = this.dragMouseDown.bind(this);
        // this.closeDragElement = this.closeDragElement.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.deselect = this.deselect.bind(this);
        this.handleAddComponent = this.handleAddComponent.bind(this);
        this.state = {
            itemSelected: false,
            itemComponent: null,
   
        }
    }

   

    handleSelect(element){
        element.stopPropagation();
        console.log("handleComponentClick(element)");
        console.log(element.target);
        console.log(element.target.style.height);
        console.log(element.target.style.width);
        console.log(element.target.style.font);
        console.log(element.target.style.background);
        console.log(element.target.style.border);
        let style = []
        console.log(element.target.childNodes);
        // console.log("" +element.target.firstChild.data);
        
        
        this.setState({itemSelected: true})
        this.setState({itemComponent: element.target})
        
    }

    deselect(element) {
        if(this.state.itemSelected === true){
            this.setState({itemSelected:false})
        }
    }

    handleAddComponent(element){
        console.log("handleAddComponent(element)");
    }   

    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/Login" />;
        }
        console.log(this.props.height);
        let wireframe_dimension = {
            "height": this.props.height,
            "width": this.props.width,
        }
        let big = {
            "min-height":  this.props.height,
            "min-width": this.props.width,
            "height": this.props.height,
            "width": this.props.width,
        }
        
        return (

            <div id="wireframesheet">
                <div class="row no-gutters" align="center">
                    <div class="col-sm">
                        <h5>Components</h5>
                        <div class="center d-flex flex-column bd-highlight mb-3">
                            <div class="p-2 bd-highlight">
                                <div className="component_container" draggable="true" onClick={this.handleAddComponent} />  
                                <label>Container</label>
                            </div>
                            <div class="p-2 bd-highlight">
                                <div className="component_label" draggable="true" onClick={this.handleAddComponent} >
                                    <p className="component_description">Prompt for Input:</p>
                                </div>  
                                <label>Label</label>
                            </div>
                            <div class="p-2 bd-highlight"> 
                                <div className="component_button" draggable="true" onClick={this.handleAddComponent} >
                                    Submit
                                </div>
                                <label>Button</label>
                            </div>
                            <div class="p-2 bd-highlight"> 
                                <div className="component_textfield" type="text" draggable="true" onClick={this.handleAddComponent}>
                                    <p className="component_description">Input</p>
                                </div>
                                <label>Textfield</label>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div id="document-area" onClick={this.deselect}>
                            <div id="wireframer" style={wireframe_dimension}>
                                <div  id="big"style={big}>
                                    {this.props.components.map(component => (
                                        <WireframeComponent component={component} handleSelect={this.handleSelect}/> 
                                    ))}
                                </div>
                            </div> 
                        </div>
                        <div id="dimension">
                            <label> Dimension: </label> 
                            <input className="dimension_input"
                                type="number" 
                                id="wireframe_height"
                                min="0"
                                max="495"
                                defaultValue={this.props.height.slice(0, this.props.height.indexOf("p"))}
                                onChange={this.props.handleDimensionChange}

                                />
                            <input className="dimension_input"
                                type="number" 
                                id="wireframe_width"
                                min="0"
                                max="755"
                                defaultValue={this.props.width.slice(0,this.props.width.indexOf("p"))}
                                onChange={this.props.handleDimensionChange}   
                            />
                            <button id="dimension_button" onClick={this.props.handleDimensionSubmit} type="button">
                                Submit
                            </button>
                        </div>
                       
                    </div>
                    <div class="col-sm">
                        <h5>Properties</h5>
                        <Properties 
                            itemSelected={this.state.itemSelected}
                            itemComponent={this.state.itemComponent}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const component = state.component;
    return {
        component: component,
        auth: state.firebase.auth,
    };
};
export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'todoLists' },
    ]),
)(WireframeEditSheet);