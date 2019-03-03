import * as React from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import auth0Client from '../utils/auth';

class NavBar extends React.Component<{} & RouteComponentProps<any>, {}> {

  public logout(): void {
    auth0Client.logout();
    this.props.history.replace('/');
  }

  public render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className={"nav-link"} to={"/"}> Nest React TypeScript Blog </Link>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className={"nav-link"} to={"/"}>
                {
                  !auth0Client.isAuthenticated() &&
                  <button className="btn btn-dark" onClick={auth0Client.login}>Sign In</button>
                }
                {
                  auth0Client.isAuthenticated() &&
                  <div>
                    <label className="mr-2 text-white">{auth0Client.getProfile().name}</label>
                    <button className="btn btn-dark" onClick={() => this.logout()}>Sign Out</button>
                  </div>
                }
              </Link>
            </li>

            <li className="nav-item">
              <Link className={"nav-link"} to={"/"}> Home </Link>
            </li>

            <li className="nav-item">
              <Link className={"nav-link"} to={"/create"}> Create </Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}
export default withRouter(NavBar);

