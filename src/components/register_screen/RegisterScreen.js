import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { registerHandler } from '../../store/database/asynchHandler'

class RegisterScreen extends Component {
  state = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  }

  handleChange = (e) => {
    const { target } = e;

    this.setState(state => ({
      ...state,
      [target.id]: target.value,
    }));
    
  }

  handleSubmit = (e) => {
    e.preventDefault();
    
    console.log("handleSubmit()");
    console.log(this.state.email);
    console.log(this.state.password);
    console.log(this.state.firstName);
    const { props, state } = this;
    const { firebase } = props;
    const newUser = { ...state };

    props.register(newUser, firebase);
  }

  render() {
    const { auth, authError } = this.props;
    if (auth.uid) {
        return <Redirect to="/" />;
    }

    return (
      <div className="container-sm">
        <form onSubmit={this.handleSubmit} className="white">
            <h5 className="grey-text text-darken-3">Register</h5>

            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" class="form-control" id="email" aria-describedby="emailHelp" onChange={this.handleChange}/>
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else. We'll never sell it, we aren't amazon or google</small>
            </div>

            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" id="password" onChange={this.handleChange}/>
            </div>

            <div class="form-group">
                <label for="firstName">First Name</label>
                <input type="text" class="form-control" name="firstName" id="firstName" onChange={this.handleChange} />
            </div>
          
            <div class="form-group">
                <label for="lastName">Last Name</label>
                <input type="text" class="form-control" name="lastName" id="lastName" onChange={this.handleChange} />
            
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-primary">Sign Up</button>
                {authError ? <div className="red-text center"><p>{authError}</p></div> : null}
            
            </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  authError: state.auth.authError,
});

const mapDispatchToProps = dispatch => ({
  register: (newUser, firebase) => dispatch(registerHandler(newUser, firebase)),
});

export default compose(
  firebaseConnect(),
  connect(mapStateToProps, mapDispatchToProps),
)(RegisterScreen);