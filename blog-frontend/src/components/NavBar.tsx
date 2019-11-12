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
      <header>
        <div className="container-fluid position-relative no-side-padding">
          <a href="#" className="logo">
            <img src="https://res.cloudinary.com/yemiwebby-com-ng/image/upload/v1513770253/WEB_FREAK_50PX-01_yaqxg7.png" alt="Logo Image" />
          </a>

          <div className="menu-nav-icon" data-nav-menu="#main-menu">
            <i className="ion-navicon" />
          </div>

          <ul className="main-menu visible-on-click" id="main-menu">
            <li><Link className={"nav-link"} to={"/"}> Nest React TypeScript Blog </Link></li>
            <li>
              <Link className={"nav-link"} to={"/"}>
                {
                  !auth0Client.isAuthenticated() &&
                  <button className="btn btn-dark" onClick={auth0Client.login}>Sign In</button>
                }
                {
                  auth0Client.isAuthenticated() &&
                  <div>
                    <label className="mr-2">{auth0Client.getProfile().name}</label>
                    <button className="btn btn-dark" onClick={() => this.logout()}>Sign Out</button>
                  </div>
                }
              </Link>
            </li>
            <li><Link className={"nav-link"} to={"/"}> Home </Link></li>
            <li><Link className={"nav-link"} to={"/create"}> Create </Link></li>
          </ul>
        </div>
      </header>
    )
  }
}
export default withRouter(NavBar);

