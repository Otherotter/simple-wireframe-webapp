import React from 'react'
import { connect } from 'react-redux';
import {Link } from 'react-router-dom';
import todoJson from './TestWireframeData.json'
import { getFirestore } from 'redux-firestore';
import { firebaseConnect } from 'react-redux-firebase';

class DatabaseTester extends React.Component {

    // NOTE, BY KEEPING THE DATABASE PUBLIC YOU CAN
    // DO THIS ANY TIME YOU LIKE WITHOUT HAVING
    // TO LOG IN


    handleClear = () => {
        const fireStore = getFirestore();
        fireStore.collection('users').get().then(function(querySnapshot){
            querySnapshot.forEach(function(doc) {
                console.log("deleting " + doc.id);
                fireStore.collection('todoLists').doc(doc.id).delete();
            })
        });
    }

    handleReset = () => {
        const fireStore = getFirestore();
        todoJson.members.forEach(listData => {
            fireStore.collection('users').add({
                    name: listData.name,
                    id: listData.id,
                    administrator: listData.administrator,
                    projects: listData.projects
                }).then(() => {
                    console.log("DATABASE RESET");
                }).catch((err) => {
                    console.log(err);
                });
        });
    }

    handleLoginPeter = () =>{
        

    }

    handleAddList = () => {
        const fireStore = getFirestore();
            fireStore.collection('todoLists').add({
                    name: "Man of Spider",
                    owner: "Peter Parker",
                    items: [
                        {
                            "key": 0,
                            "description": "Make Blue-Red Suit",
                            "due_date": "2022-1-15",
                            "assigned_to": "Peter Parker",
                            "completed": false
                        },
                        {
                            "key": 1,
                            "description": "Dinner with MJ",
                            "due_date": "2022-10-15",
                            "assigned_to": "Peter Parker",
                            "completed": false
                        },
                    ]
                }).then(docRef => {
                    this.peterId = docRef.id;
                    console.log("Document written with ID: ", docRef.id);
                    console.log(this.peterId);
                }).catch((err) => {
                    console.log(err);
                });
                
            
        
    }

    handlePrint= () =>{
        // console.log( getFirestore().collection('todoLists').get("0"));
        getFirestore().collection('todoLists').get().then(function(querySnapshot){
            querySnapshot.forEach(function(doc) {
                console.log("Here: " + doc.id);
                console.log(doc.data().items);
            })
        });

            // // Set the "capital" field of the city 'DC'
            // return washingtonRef.update({
            //     name: "Mile Morales"
            // })
            // .then(function() {
            //     console.log("Document successfully updated!");
            // })
            // .catch(function(error) {
            //     // The document probably doesn't exist.
            //     console.error("Error updating document: ", error);
            // });
    }

    handleUpdateListFields = () => {
        var washingtonRef = getFirestore().collection("todoLists").doc(this.peterId);
        // Set the "capital" field of the city 'DC'
            return washingtonRef.update({
                owner: "Mile Morales",
                name: "Spider-man"
            })
            .then(function() {
                console.log("Document successfully updated!");
            })
            .catch(function(error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });       
    }

    handleUpdateCollection = () => {
        var washingtonRef = getFirestore().collection("todoLists").doc();
        connect.log(washingtonRef);
        // Set the "capital" field of the city 'DC'
             
    }
    
   

    render() {
    
        // var members = firestore.ordered.users;
        return (
            <div>
                <button onClick={this.handleClear}>Clear Database</button>
                <button onClick={this.handleReset}>Reset Database</button>
              
                {/* {members && members.map(todoList => (
                    <Link to={'/Home/' + todoList.name + todoList.id}  key={todoList.id }>
                        <button>{todoList.name}</button>
                    </Link>
                ))} */}
                <button onClick={this.handleAddList}>Add List Peter</button>
                <button onClick={this.handleUpdateListFields}>Update TextField of Peter </button>
                <button onClick={this.handleUpdateCollection}>Update Card of Peter </button>
                <button onClick={this.handleDeleteList}>Delete List Peter Database</button>
            </div>)
    }
}

const mapStateToProps = function (state) {
    return {
        members: state.firestore.ordered.users,
        auth: state.firebase.auth,
        firebase: state.firebase
    };
}

export default connect(mapStateToProps)(DatabaseTester);