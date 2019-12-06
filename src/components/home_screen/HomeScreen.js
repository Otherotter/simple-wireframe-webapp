import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect, Link} from 'react-router-dom';
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase';


class HomeScreen extends Component {
    
   
    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/Login" />;
        }
        return (

            <div className="container-sm">
               <h5>HomeScreen</h5> 
                    <div class="row row-cols-md-3">
                        <Link to="/Edit">
                            <div class="col mb-4">
                                <div class="card text-center border-primary mb-3">
                                    <div class="card-header">Add Wireframe</div>
                                        <div class="card-body">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-square">
                                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                                                <line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line>
                                            </svg>
                                        </div>
                                </div>
                            </div>
                        </Link>
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