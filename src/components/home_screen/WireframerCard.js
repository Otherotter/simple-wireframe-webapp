import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getFirestore } from 'redux-firestore';

class WireframerCard extends React.Component {
    
    render() {
        const projects = this.props.projects;
        console.log(projects);
        return (
            <div class="col mb-3">
                <div class="c card text-dark text-center border-dark mb-3">
                    <svg data-toggle="modal" data-target="#exampleModal" onClick={this.handleDeleteList} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="ml-auto feather feather-x-circle">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="15" y1="9" x2="9" y2="15"></line>
                                <line x1="9" y1="9" x2="15" y2="15"></line>
                    </svg>
                    <Link to={'/Edit/' + projects.name}>
                    <div class="card-header">{projects.name}</div>
                    </Link>
                </div>
               
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        
        auth: state.firebase.auth,
    };
};
export default WireframerCard;