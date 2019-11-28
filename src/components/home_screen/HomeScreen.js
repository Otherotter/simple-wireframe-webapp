import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect, Route } from 'react-router-dom';
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase';

import { Link } from 'react-router-dom';
import { getFirestore } from 'redux-firestore';



class HomeScreen extends Component {
    
   
    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/Login" />;
        }
        return (

            <div className="container-sm">
               <h5>HomeScreen</h5> 
                    <div class="row row-cols-1 row-cols-md-3">
                        <div class="col mb-4">
                            <div class="card">
                                <div class="card-body">
                                    <p class="card-text">Add Wireframe</p>
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
        todoLists: state.firestore.ordered.todoLists,
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