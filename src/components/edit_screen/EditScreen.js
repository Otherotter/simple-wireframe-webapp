import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {Redirect} from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import { Dropdown } from 'react-bootstrap';
import WireframeEditSheet  from './WireframeEditSheet';

class EditScreen extends Component {
    constructor(props){
        super(props);
        this.handleZoomIn = this.handleZoomIn.bind(this);
        this.handleZoomOut = this.handleZoomOut.bind(this);
        this.handleDimensionChange = this.handleDimensionChange.bind(this);
        this.handleDimensionSubmit = this.handleDimensionSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleCloseExit = this.handleCloseExit.bind(this);
        this.handleCloseCancel = this.handleCloseCancel.bind(this);
        
        // console.log(props.location.state.wireframe.components)
        this.state = {
                    "name": props.location.state.wireframe.name,
                    "height": props.location.state.wireframe.height,
                    "width": props.location.state.wireframe.width,
                    "timestamp": props.location.state.wireframe.timestamp,
                    "components": props.location.state.wireframe.components,
                    "docChange": false,
        }

    }

    handleZoomIn(){
        let zoomIn = document.getElementById("zoom-out");
        let big = document.getElementById("big");
        // this.props.width.slice(0,this.props.width.indexOf("p"))
        let newHeight = big.style.height.slice(0,big.style.height.indexOf("p")) * 2;
        let newWidth = big.style.width.slice(0,big.style.width.indexOf("p")) * 2;
        big.style.height = newHeight+"px";
        big.style.width = newWidth+"px"; 
        zoomIn.removeAttribute("class","disabled");
        zoomIn.setAttribute("class","nav-item");
    }

    handleZoomOut(){
        let big = document.getElementById("big");
        let zoomOut = document.getElementById("zoom-out");
        // this.props.width.slice(0,this.props.width.indexOf("p"))
        let originalHeight =  big.style.height
        let originalWidth =  big.style.height
        console.log(originalHeight)
        console.log(originalWidth)
        let newHeight = big.style.height.slice(0,big.style.height.indexOf("p")) / 2;
        let newWidth = big.style.width.slice(0,big.style.width.indexOf("p")) / 2;
        if(originalHeight === this.state.height && originalWidth ===this.state.width){
            zoomOut.style.opacity = "5px"
        }
        else{
            big.style.height = newHeight+"px";
            big.style.width = newWidth+"px";
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
        // console.log("handleDimensionSubmit")
        // console.log(height)
        // console.log(width)
        if(0 <= height && height <= 600 && 0 <= width && width <= 800){
            // console.log(this.state.height)
            // console.log(this.state.height === height + "px")
            if(this.state.height !== height + "px" || this.state.width !== width + "px"){
                this.setState({height: height + "px"});
                this.setState({width: width + "px"});
                button.setAttribute("class","disabled")
                this.setState({docChange: true})
            }else{
                console.log("Nothing");
            }
        }
    }

    handleSave(){

    }

    handleClose(){
        console.log("handleClose()")
        if(this.state.docChange === true){
            console.log("You Sure")
            let outsidediv = document.getElementById("close_dialog_hidden")
            let insidediv = document.getElementById("are_your_sure_dialog_hidden")
            console.log(outsidediv)
            outsidediv.setAttribute("id", "close_dialog")
            insidediv.setAttribute("id", "are_your_sure_dialog")
        }
        else{
            this.props.history.push({
                pathname: "/Home/",
            });
        }

        
    }
    handleCloseCancel(){
        let outsidediv = document.getElementById("close_dialog")
        let insidediv = document.getElementById("are_your_sure_dialog")
        outsidediv.setAttribute("id", "close_dialog_hidden")
        insidediv.setAttribute("id", "are_your_sure_dialog_hidden")
    }

    handleCloseExit(){
        this.props.history.push({
            pathname: "/Home/",
        });  
    }

    handleNameChange = (event) => {
        let newString = event.target.value;
        // if(newString === "") newString = "Unknown"
        // getFirestore().collection("members").doc(this.props.location.state.wireframe.id).update({
        //   name: newString
        // })
        // .then(function() {
        //     console.log("Document successfully updated!");
        // })
        // .catch(function(error) {
        //     // The document probably doesn't exist.
        //     console.error("Error updating document: ", error);
        // });  
        this.setState({name: newString})
        this.setState({docChange: true})
    }

    
    render() {
        const auth = this.props.auth;
        let member = this.props.member;
        console.log(member)

        if (!auth.uid) {
            return <Redirect to="/" />;
        }
        console.log(this.props.location.state.wireframe.height)
        console.log(this.props.location.state.wireframe.width)
        // if (!todoList)
        //     return <React.Fragment />


        return (

            <div className="container-sm">
               <h5>Edit: {this.state.name}</h5> 
               <input  onChange={this.handleNameChange.bind(this)} id="wireframe_name"type="text" defaultValue={this.state.name}/>
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
                    <li class="nav-item"  onClick={this.handleClose}>
                        <a>Close</a>
                    </li>
                
                </ul>
                <WireframeEditSheet 
                    name ={this.state.name}
                    height = {this.state.height}
                    width = {this.state.width}
                    components= {this.state.components}
                    handleDimensionChange ={this.handleDimensionChange} 
                    handleDimensionSubmit = {this.handleDimensionSubmit}
                />
                <div id="close_dialog_hidden">
                    <div id="are_your_sure_dialog_hidden">
                        <h5> Close </h5>
                        <p> You haven't saved your work</p>
                        <strong> All progress will be lost.</strong>
                        <br></br>
                        <btn className="are_your_sure_buttons" onClick={this.handleCloseCancel}>Cancel</btn>   
                        <btn className="are_your_sure_buttons" onClick={this.handleCloseExit}>Close</btn>   
                    </div>
                </div>
               
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps.match.params;
    console.log(ownProps.match.params);
    const { project } = state.firestore.data;
    console.log("mapsTo:" + state.firestore.data)
    console.log(state.firestore.data)
    console.log(id)
    const member = project ? project[id] : null;
    if (member)
        member.id = id;

    return {
        member,
        auth: state.firebase.auth,
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'members' },
    ]),
)(EditScreen);

