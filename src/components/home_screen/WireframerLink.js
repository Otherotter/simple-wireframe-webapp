import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getFirestore } from 'redux-firestore';
import WireframerCard from './WireframerCard';

class WireframerLink extends React.Component {
    
    render() {
        const projects = this.props.projects;
        return (
            <div className="">
                <div class="row row-cols-1 row-cols-md-4">
                {projects.map(wireframe => (
                    // console.log(wireframe)
                    
                        
                            <WireframerCard  projects={wireframe}/>
                    
                    // <Link to={'/todoList/' + todoList.id} key={todoList.id }>            
                ))}
                 </div>
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
                                    <button type="button" class="btn btn-primary">Delete</button>
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
        
        auth: state.firebase.auth,
    };
};

export default compose(connect(mapStateToProps))(WireframerLink);