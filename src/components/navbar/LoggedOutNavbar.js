import React from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';

class LoggedOutLinks extends React.Component {
  render() {
    return (
        <div class="navbar-nav">
           <form class="form-inline my-2 my-lg-0">
              <Link to="/Register">
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Register</button>
              </Link>
            </form>
        </div>
    );
  }
}

export default LoggedOutLinks;