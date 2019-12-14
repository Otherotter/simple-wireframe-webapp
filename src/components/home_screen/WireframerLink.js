import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import WireframerCard from './WireframerCard';

class WireframerLink extends React.Component {
    
    render() {
        const members = this.props.members;
        console.log(members);
        return (
            <div className="">
                <div class="row row-cols-1 row-cols-md-4">
                {members && members.map(wireframe => (
                    <WireframerCard  projects={wireframe} handleDeleteList={this.props.handleDeleteList}/>
                    // <Link to={'/todoList/' + todoList.id} key={todoList.id }>            
                ))}
                 </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        members: state.firestore.ordered.members,
        auth: state.firebase.auth,
    };
};

export default compose(connect(mapStateToProps))(WireframerLink);