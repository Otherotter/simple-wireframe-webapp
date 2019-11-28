import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import LoggedInNavbar from './LoggedInNavbar';
import LoggedOutNavbar from './LoggedOutNavbar';

class Navbar extends React.Component {

  render() {
    const { auth, profile } = this.props;
    const links = auth.uid ? <LoggedInNavbar profile={profile} /> : <LoggedOutNavbar />;
    
    return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link  to="/Home" class="navbar-brand" href="#">Wireframe</Link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        {links}
      </div>
      
    </nav>
    );
  };
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
});

export default compose(
  firebaseConnect(),
  connect(mapStateToProps),
)(Navbar);