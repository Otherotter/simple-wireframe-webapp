import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {Redirect} from 'react-router-dom';
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase';
import { Dropdown } from 'react-bootstrap';
import WireframeEditSheet  from './WireframeEditSheet';



class EditScreen extends Component {
    constructor(){
        super();
        this.handleZoomIn = this.handleZoomIn.bind(this);
        this.handleZoomOut = this.handleZoomOut.bind(this);
        this.handleDimensionChange = this.handleDimensionChange.bind(this);
        this.handleDimensionSubmit = this.handleDimensionSubmit.bind(this);
        this.state ={
                    "name": "Photograph portfolio",
                    "key": 0,
                    "height": "400px",
                    "width": "600px",
                    "timestamp": 0,
                    "components": [
                        {
                            "control": "component_container",
                            "id": 0,
                            "properties": { 
                                "text" : "None",
                                "font_size" : "None",
                                "background_color" : "#FFFFFFFF",
                                "border_color" : "#FFFFFFFF",
                                "border_thickness" : 1,
                                "border_radius" : 1,
                                "width": 100,
                                "height": 100,
                                "margin-top": 0,
                                "transform": "scale(0)",
                                "transform-origin": "0% 0% 0px",
                            }
                        },
                        {
                            "control": "component_label",
                            "id": 1,
                            "properties": { 
                                "text" : "Hello",
                                "font_size" : 10,
                                "background_color" : "#EEEE3333",
                                "border_color" : "#AAAA3333",
                                "border_thickness" : 2,
                                "border_radius" : 2,
                                "width": 10,
                                "height": 10,
                                "transform": "scale(0)",
                                "transform-origin": "0% 0% 0px",
                               
                            }

                        },
                        {
                            "control": "component_button",
                            "id": 2,
                            "properties": { 
                                "text" : "CLICK",
                                "font_size" : 10,
                                "background_color" : "#EEEE3333",
                                "border_color" : "#AAAA3333",
                                "border_thickness" : 2,
                                "border_radius" : 2,
                                "width": 10,
                                "height": 10,
                                "margin-top": 20,
                                "transform": "scale(0)",
                                "transform-origin": "0% 0% 0px",
                            }

                        },
                    ]
                
        }
    }

    handleZoomIn(){
        let zoomIn = document.getElementById("zoom-out");
        let big = document.getElementById("big");
        // this.props.width.slice(0,this.props.width.indexOf("p"))
        let newHeight = big.style.height.slice(0,big.style.height.indexOf("p")) * 2;
        let newWidth = big.style.width.slice(0,big.style.width.indexOf("p")) * 2;
        // console.log(newHeight)
        // console.log(newWidth)
        // console.log(big);
        // console.log(big.childNodes);
    
        // if(big.childElementCount >= 1){
        //     for(var i = 0; i < big.childElementCount; i++){
        
        //         big.children[i].style.transform = "scale(2)";
        //         big.children[i].style.transformOrigin = "0% 0% 0px";
        //         // console.log(big.children[i].style.transform);
        //         // console.log(big.children[i].style.transform-origin );
               
        //     //     this.setState({components: [
        //     //         ...this.state.components.filter(x => element.ID !== x.ID),
        //     //         { id: element.id, name: element.name }
        //     //    ]})
        //     let component = this.state.components[i];
          
        //     // this.setState(
        //     //     this.state.components[i].properties.transform =  "scale(2)",

        //     // );
        //     console.log(component);
        //     console.log(component.properties.transform);
        //     console.log("ASDF");
        //         // transform: scale(2);

        //     }
        // }
        
        big.style.height = newHeight+"px";
        big.style.width = newWidth+"px"; 
        zoomIn.removeAttribute("class","disabled");
        zoomIn.setAttribute("class","nav-item");
    }

    handleZoomOut(){
        let big = document.getElementById("big");
        let zoomOut = document.getElementById("zoom-out");
        // this.props.width.slice(0,this.props.width.indexOf("p"))
        let originalHeight =  big.style.height.slice(0,big.style.height.indexOf("p"))
        let originalWidth =  big.style.height.slice(0,big.style.height.indexOf("p"))
        let newHeight = big.style.height.slice(0,big.style.height.indexOf("p")) / 2;
        let newWidth = big.style.width.slice(0,big.style.width.indexOf("p")) / 2;
        if(originalHeight !== this.state.height && originalWidth !== this.state.width){
            big.style.height = newHeight+"px";
            big.style.width = newWidth+"px";
        }
        if(originalHeight === this.state.height && originalWidth ===this.state.width){
            zoomOut.setAttribute("class","disabled")
        }
            
    }

    handleDimensionChange(element){
        let button = document.getElementById("dimension_button");
        button.removeAttribute("class","disabled")
    }
    handleDimensionSubmit(){
        let height = document.getElementById("wireframe_height").value;
        let width = document.getElementById("wireframe_width").value; 
        let button = document.getElementById("dimension_button");
        console.log("handleDimensionSubmit")
        console.log(height)
        console.log(width)
        if(0 <= height && height <= 495 && 0 <= width && width <= 755){
            this.setState({height: height + "px"});
            this.setState({width: width + "px"});
            button.setAttribute("class","disabled")
        }
        console.log("Cant do that dimension");
    }

    
    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/Login" />;
        }
        const project = this.props.project;
        console.log(project);
        return (

            <div className="container-sm">
               <h5>Edit</h5> 
               <ul class="nav nav-pills nav-fill p-3">
                    <li id="zoom-in" class="nav-item" onClick={this.handleZoomIn}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-zoom-in">
                            <circle cx="11" cy="11" r="8"/>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                            <line x1="11" y1="8" x2="11" y2="14"/>
                            <line x1="8" y1="11" x2="14" y2="11"/>
                        </svg>
                    </li>
                    <li id="zoom-out" class="nav-item disabled" onClick={this.handleZoomOut}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-zoom-out">
                            <circle cx="11" cy="11" r="8"/>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                            <line x1="8" y1="11" x2="14" y2="11"/>
                        </svg>
                    </li>
                    <li class="nav-item">
                        <a>Save</a>
                    </li>
                    <li class="nav-item">
                        <a>Close</a>
                    </li>
                
                </ul>
                <WireframeEditSheet 
                    project ={this.state.project}
                    name ={this.state.name}
                    height = {this.state.height}
                    width = {this.state.width}
                    components= {this.state.components}
                    handleDimensionChange ={this.handleDimensionChange} 
                    handleDimensionSubmit = {this.handleDimensionSubmit}
                />


                

              
                                            
        
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const project = ownProps.project;
    return {
        project,
        auth: state.firebase.auth,
    };
};
export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'members' },
    ]),
)(EditScreen);