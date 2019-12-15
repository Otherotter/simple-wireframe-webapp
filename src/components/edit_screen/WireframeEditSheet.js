
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
    constructor(props){
        super(props);
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
            itemStyle: null,
            itemSelectedNumber: -1,


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

    keyboardEvent = (e) =>{
        e.stopPropagation()
        
        // console.log(e);
        // console.log(e.ctrlKey);
        // console.log(e.keyCode);
        // console.log(e.key);

        let components = this.props.components;
        // console.log("handleAddComponent(element)");
        // console.log(this.state.itemComponent);
        // console.log(this.state.itemComponent.firstChild.data);
        // console.log(this.state.itemComponent.id);
        // console.log(this.state.itemComponent.style);
        // console.log(this.state.itemSelected);
        if(e.key ==="Backspace" && window.event.target.tagName !== "INPUT"){
            e.preventDefault()
            console.log("Delete")
            console.log(window.event)
            console.log(this.props.components);
            console.log(this.state.itemComponent);
            var thenum = this.state.itemComponent.id.replace(/^\D+/g, ''); // replace all leading non-digits with nothing
            console.log("This is the number: " + thenum);
            if(this.props.components.length === 0){
                console.log("Deleted list")
               this.props.components.pop() 
            }
            else if(this.props.components.length >= 1){
                console.log("Deleted list")
                this.props.components.splice(thenum, 1);
            }
            this.deselect();
            this.setState({docChange: true})
            for(var i in this.props.components){
                this.props.components[i].id = i;
            }
        }
        else if(e.key ==='d' && e.ctrlKey===true){
            console.log(" Duplicate")
            let transfrom = this.state.itemComponent.style.transform.substring(10,this.state.itemComponent.style.transform.length-1);
            let x = parseInt(transfrom.slice(0,transfrom.indexOf("p")))
            let y = transfrom.slice(transfrom.indexOf("x")+1);;
            if(y.length !== 0){
                y = parseInt(y.slice(2,y.indexOf("p")))   
            }
            else{
                y = 0;
            }
            components.push({
                            "control": this.state.itemComponent.className,
                            "id": components.length,
                            "properties": { 
                                "position": "absolute",
                                "height": this.state.itemComponent.style.height,
                                "width": this.state.itemComponent.style.width,
                                "text": this.state.itemComponent.firstChild.data,
                                "background-color": this.state.itemComponent.style.backgroundColor,
                                "color": this.state.itemComponent.style.color,
                                "font-size": this.state.itemComponent.style.fontSize,
                                "border": this.state.itemComponent.style.border,
                                "border-color": this.state.itemComponent.style.borderColor,
                                "border-width": this.state.itemComponent.style.borderWidth,
                                "border-radius": this.state.itemComponent.style.borderRadius,
                                "x": x - 10,
                                "y": y + 10,
                                // "x": parseInt(this.state.itemComponent.style.x.slice(0,this.state.itemComponent.style.x.indexOf("p"))) - 1,
                                // "y": parseInt(this.state.itemComponent.style.y.slice(0,this.state.itemComponent.style.y.indexOf("p"))) + 1 ,
                                "resize":"both",
                                "overflow":"hidden",
                            }
            });
            this.deselect();
            console.log(this.props.components)
        }    

        
    }



    handleSelect(element){
        element.stopPropagation();
        console.log(element.target)
        // console.log(this.state.itemComponent)
        if(element.target === this.state.itemComponent){
            console.error("RETIRN")
            return
        }
        if(this.state.itemSelected === true) this.deselect()
        console.log("handleComponentClick(element)");
        console.log(element.target.style);
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

        document.body.addEventListener("keydown", this.keyboardEvent)
        
        // console.log(element.target.firstChild);
        let text = null
        if(element.target.firstChild.nodeName === "#text"){
            text = element.target.firstChild.nodeValue;
        }
        // console.log(element.target.style.fontSize);
        // console.log(element.target.style.backgroundColor.hex);
        // console.log(element.target.style.borderColor);
        // console.log(element.target.style.borderWidth);
        // console.log(element.target.style.borderRadius);
        let style ={
            "fontSize": element.target.style.fontSize,
            "backgroundColor": element.target.style.backgroundColor,
            "borderColor": element.target.style.borderColor,
            "borderWidth": element.target.style.borderWidth,
            "borderRadius": element.target.style.borderRadius,
            "text": text
        }
        

        // let style = []
        // console.log(element.target.childNodes);
        // console.log("" +element.target.firstChild.data);
        this.setState({itemSelected: true})
        this.setState({itemComponent: element.target})
        this.setState({itemStyle: style})
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
            document.body.removeEventListener("keydown", this.keyboardEvent)
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
                                "position": "absolute",
                                "height": "50px",
                                "width": "50px",
                                "text": "Hello",
                                "background-color": "#FFFFFF",
                                "color": "#000000",
                                "font-size": "10px",
                                "border": "solid",
                                "border-color": "#FFFFFF",
                                "border-width": "0px",
                                "border-radius": "0px",
                                "top": "0px",
                                "left": "0px",
                                "x": 0,
                                "y": 0,
                                "resize":"both",
                                "overflow":"hidden",
    
                            }
        });
        console.log(components[components.length - 1])
        // this.setState({itemSelected: true})
        this.setState({itemComponent: null})
        this.setState({docChange: true})
        this.props.tigger(true);
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
                                    {/* <Draggable
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
                                    
                                    </Draggable> */}
                                    {/* <Rnd
                                        default={{
                                            x: 0,
                                            y: 0,
                                            width: 320,
                                            height: 200,
                                        }}
                                        >
                                        Rnd
                                        </Rnd>
                                     */}

                                </div>
                            </div> 
                        </div>
                        <div id="dimension">
                            <label> Dimension: </label> 
                            <input className="dimension_input"
                                type="number" 
                                id="wireframe_height"
                                min="0"
                                max="600"
                                defaultValue={this.props.height.slice(0, this.props.height.indexOf("p"))}
                                onChange={this.props.handleDimensionChange}

                                />
                            <input className="dimension_input"
                                type="number" 
                                id="wireframe_width"
                                min="0"
                                max="800"
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
                            itemStyle={this.state.itemStyle}
                            tigger={this.props.tigger}
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