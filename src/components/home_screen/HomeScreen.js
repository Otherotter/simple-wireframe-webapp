import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect, Link} from 'react-router-dom';
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase';
import WireframerLink  from './WireframerLink';


class HomeScreen extends React.Component {
    constructor(){
        super();
        this.handleDeleteList = this.handleDeleteList.bind(this);

        this.state = {
            "projects": [
                {
                    "name": "Photograph portfolio",
                    "key": 0,
                    "height":1000,
                    "width": 1000,
                    "timestamp": 0,
                    "component": [
                        {
                            "control": "container",
                            "properties": { 
                                "text" : "None",
                                "font_size" : "None",
                                "background_color" : "#FFFFFFFF",
                                "border_color" : "#FFFFFFFF",
                                "border_thickness" : 1,
                                "border_radius" : 1,
                                "width": 100,
                                "height": 100,
                                "margin-top": 0
                            }
                        },
                        {
                            "control": "label",
                            "properties": { 
                                "text" : "Hello",
                                "font_size" : 10,
                                "background_color" : "#EEEE3333",
                                "border_color" : "#AAAA3333",
                                "border_thickness" : 2,
                                "border_radius" : 2,
                                "width": 10,
                                "height": 10,
                                "margin-top": 10
                            }

                        },
                        {
                            "control": "button",
                            "properties": { 
                                "text" : "CLICK",
                                "font_size" : 10,
                                "background_color" : "#EEEE3333",
                                "border_color" : "#AAAA3333",
                               	"border_thickness" : 2,
                                "border_radius" : 2,
                                "width": 10,
                                "height": 10,
                                "margin-top": 20
                            }

                        },
                        {
                            "control": "textfield",
                            "properties": { 
                                "text" : "TEXTFIELD",
                                "font_size" : 12,
                                "background_color" : "#EEEE3333",
                                "border_color" : "#BBBBB111",
                               	"border_thickness" : 2,
                                "border_radius" : 2,
                                "width": 100,
                                "height": 100,
                                "margin-top": 30
                            }

                        }
                    ]

                }, 
                { 
                    "name": "Spider-Man Rescue Thread",
                    "key": 1,
                    "height":1000,
                    "width": 1000,
                    "timestamp": 1,
                    "component": [
                        {
                            "control": "container",
                            "properties": { 
                                "text" : "None",
                                "font_size" : "None",
                                "background_color" : "#FFFFFFFF",
                                "border_color" : "#101010101",
                                "border_thickness" : 1,
                                "border_radius" : 1,
                                "width": 100,
                                "height": 100,
                                "margin-top": 0
                            }
                        },
                        {
                            "control": "label",
                             "properties": { 
                                "text" : "Hello",
                                "font_size" : 10,
                                "background_color" : "#EEEE3333",
                                "border_color" : "#AAAA3333",
                                "border_thickness" : 3,
                                "border_radius" : 3,
                                "width": 10,
                                "height": 10,
                                "margin-top": 10
                            }

                        },
                        {
                            "control": "button",
                            "properties": { 
                                "text" : "CLICK",
                                "font_size" : 10,
                                "background_color" : "#EEEE3333",
                                "border_color" : "#A5F33C83",
                               	"border_thickness" : 2,
                                "border_radius" : 2,
                                "width": 10,
                                "height": 10,
                                "margin-top": 20
                            }

                        }
                    ]
                }
            ]
        }
    }
    handleAddWireframe(){
        console.log("handleWireframe()"); 
        // let newListData = {
        //     name: 'Unnamed todolist',
        //     owner: 'Unknown owner',
        //     items: [],
        //     time: Date.now(),
        // }
        // const fireStore = getFirestore();
        // let newList = fireStore.collection("todoLists").doc();
        // newList.set(newListData);

        // this.props.history.push({
        //     pathname: "todoList/" + newList.id,
        //     key: newList.id,
        // });
    }
    handleDeleteList(event) {
        event.stopPropagation();
        console.log("handleDeleteList(event)")
    }

    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/Login" />;
        }
        return (

            <div className="container-sm">
               <h5>HomeScreen</h5> 
               <div class="card text-dark text-center border-secondary mb-3" onClick={this.handleAddWireframe}>
                    <div class="card-header">
                        <p>Add Wireframe</p>
                    </div>
                    <div class="card-body">
                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-plus-square">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                            <line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line>
                        </svg>
                    </div>
                </div>
                <WireframerLink projects={this.state.projects}/> 
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'todoLists', orderBy:['timestamp', 'desc']},
    ]),
)(HomeScreen);

// export default HomeScreen;