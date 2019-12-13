
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {Redirect} from 'react-router-dom';
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase';
import Draggable from 'react-draggable';
import { Resizable, ResizableBox } from 'react-resizable';
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
        this.handleResize = this.handleResize.bind(this)
        this.state = {
            itemSelected: false,
            itemComponent: null,
        }
    }



    handleResize(element){
        element.stopPropagation();
        console.log("handleResize(element)")
        // console.log(element.target.style.offsetHeight)
        console.log(element.target.parentNode.style.height)
        element.target.parentNode.style.resize ="both"
        element.target.parentNode.style.overflow = "hidden"
       
        // console.log(element.target.parentNode.className)
        // element.target.parentNode.style.height = "100px"
        // console.log(window.event.x);
        // console.log(window.event);
        console.log(this.mouse_position());
        // document.onmousemove = this.handlemousemove()

    }
    handlemousemove(){
        console.log("handlemousemove()");
        // console.log(element.target)
        

    }
    
    mouse_position(){
        // console.log("mouse_position()");
        // console.log(element.target)
        let x  = window.event.x;
        console.log(window.event);
        console.log(window.event.x);
        return x;
       
    }

    handleSelect(element){
        element.stopPropagation();
        // console.log(element.target)
        // console.log(this.state.itemComponent)
        if(element.target === this.state.itemComponent){
            console.error("RETIRN")
            return
        }
        if(this.state.itemSelected === true) this.deselect()
        console.log("handleComponentClick(element)");
        console.log();
        // for(let i = element.target.children.length-1; i >= 0 ; i--){
        //     if(element.target.children[i].tagName === "SPAN" ){
        //         var className = element.target.children[i].className;
        //         className = className.slice(0,className.indexOf("."));
        //         console.log(className);
        //         element.target.children[i].className = className;
        //     }
        // }  
        let elementType = "class"
        let onEvent = "click"
        let dot_top_left = document.createElement("span");
        dot_top_left.setAttribute(elementType, "dot_top_left");
        dot_top_left.addEventListener(onEvent, this.handleResize); 
        let dot_top_right = document.createElement("span")
        dot_top_right.setAttribute(elementType, "dot_top_right");
        dot_top_right.addEventListener(onEvent, this.handleResize); 
        let dot_bottom_left = document.createElement("span");
        dot_bottom_left.setAttribute(elementType, "dot_bottom_left");
        dot_bottom_left.addEventListener(onEvent, this.handleResize); 
        let dot_bottom_right = document.createElement("span");
        dot_bottom_right.setAttribute(elementType, "dot_bottom_right");
        dot_bottom_right.addEventListener(onEvent, this.handleResize); 
        element.target.append(dot_top_left, dot_top_right, dot_bottom_left, dot_bottom_right)
        // console.log(element.target.style.height);
        // console.log(element.target.style.width);
        // console.log(element.target.style.font);
        // console.log(element.target.style.background);
        // console.log(element.target.style.border);
        // let style = []
        // console.log(element.target.childNodes);
        // console.log("" +element.target.firstChild.data);
        this.setState({itemSelected: true})
        this.setState({itemComponent: element.target})
    }

    deselect(element) {
        if(this.state.itemSelected === true){
            let comp = this.state.itemComponent
            for(let i = 0; i < 4 ; i++){
                if(comp.lastChild.tagName === "SPAN"){
                    comp.removeChild(comp.lastChild);
                }
            }   
            // for(let i = comp.children.length-1; i >= 0 ; i--){
            //     if(comp.children[i].tagName === "SPAN"){
            //         var className = comp.children[i].className;
            //         comp.children[i].className = className +".hidden";
            //     }
            // }     
            this.setState({itemSelected:false})
            this.setState({itemComponent:null})
        }
    }

    handleAddComponent(element){
        if(this.state.itemSelected === true) this.deselect()     
        let components = this.props.components;
        console.log("handleAddComponent(element)");   
        
        components.push({
            "control": element.target.className,
                            "id": components.length,
                            "properties": { 
    
                            }
        });
        console.log(components[components.length - 1])
        // this.setState({itemSelected: true})
        this.setState({itemComponent: null})
        
    }   

    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/Login" />;
        }
        // console.log(this.props.height);
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
                                    Prompt for Input:
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
                                    Input
                                </div>
                                <label>Textfield</label>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div id="document-area" onClick={this.deselect}>
                            <div id="wireframer"  onMouseMove={this.handlemousemove}style={wireframe_dimension}>
                                <div  id="big"style={big}>
                                    {this.props.components.map(component => (
                                        <WireframeComponent component={component} 
                                        handleSelect={this.handleSelect}
                                        handleResize={this.handleResize}
                                        /> 
                                    ))}
                                    <Draggable
                                    bounds="parent"
                                    cancel="span"
                                    >
                                   
                                        <div className="dummy">
                                            <span onMouseDown={this.handleResize}
                                            // onMouseMove={this.handleResize} 
                                            
                                            className="dot_top_right"/> 
                                            <span className="dot_top_left"/>
                                            <span className="dot_bottom_right"/>
                                            <span className="dot_bottom_left"/>
                                        </div>
                                    
                                    </Draggable>
                                    <div className="component_container" >

                        
                                    </div>

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