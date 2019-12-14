import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect, Link} from 'react-router-dom';
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase';
import WireframerLink  from './WireframerLink';
import { getFirestore } from 'redux-firestore';
import { newListHandler } from '../../store/database/asynchHandler';


class HomeScreen extends React.Component {
    constructor(){
        super();
        // this.sendPossibleDeletedWireframe = this.sendPossibleDeletedWireframe.bind(this);
        this.state ={
            "poetentialToBeDeleted": null
        }
    }

    handleAddWireframe = () =>{
        let newListData = {
            "name": "Unknown",
            "height":"500px",
            "width": "500px",
            "timestamp": 0,
            "components": []
        }
        const fireStore = getFirestore();
        let newList = fireStore.collection("members").doc();
        newList.set(newListData);
        
        // this.props.history.push({
        //     pathname: "/Edit/" + newList.id,
        //     key: newList.id,
    
        // });
    }

    sendPossibleDeletedWireframe = (event, wireframeid) =>{
        console.log(wireframeid)
        this.setState({poetentialToBeDeleted: wireframeid})
    }

    deleteWireframe = (event) =>{
        const fireStore = getFirestore();
        console.log(this.state.poetentialToBeDeleted)
        let id = this.state.poetentialToBeDeleted
    
        getFirestore().collection("members").doc(id).delete().then(function() {
            console.log(this.props.todoList.id + " successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
        // fireStore.collection('members').doc(event.id).delete();
        this.setState({poetentialToBeDeleted: event.id})
    }

    render() {

        if (!this.props.auth.uid) {
            return <Redirect to="/Login" />;
        }
        // var user = getFirestore()
        // console.log(user)
        // var member = null
        // let members = this.props.members;
        // const fireStore = getFirestore();
        // console.log(this.props.auth.email)
        // for(var item in members){
        //     if(members[item].email === this.props.auth.email){
        //         console.log(members[item].member)
        //         member = members[item];
        //         console.log(member)
        //         break;
        //     }
        // }
        // this.setState({user:member})
        // console.log(member)
        // console.log(members)
        // const clone = JSON.parse(JSON.stringify(member.projects));
        // console.log(clone)
        
        return (

            <div className="container-sm">
               <h5>HomeScreen</h5> 
               <div class="addwireframe card text-dark text-center border-secondary mb-3" onClick={this.handleAddWireframe}>
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
                <WireframerLink handleDeleteList={this.sendPossibleDeletedWireframe}/> 
                <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog text-dark" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Delete Wireframe</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <p>Are you sure you want to delete this Wireframe?</p>
                                    <p className="font-weight-bold">This action cannot be reversed</p>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={this.deleteWireframe}>Delete</button>
                                </div>
                            </div>
                        </div>
                </div>
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
      { collection: 'members'},
    ]),
)(HomeScreen);

// export default HomeScreen;