import * as React from 'react';
import './App.css';
import { Switch, Link, Route, withRouter, RouteComponentProps } from 'react-router-dom';
import { Home } from './components/Home';
import { Callback } from './components/Callback';
import Create from './components/post/Create';
import { Post } from './components/post/Post';
import { EditPost } from './components/post/Edit';
import auth0Client from './utils/auth';
import PrivateRoute from './components/PrivateRoute';


class App extends React.Component<{} & RouteComponentProps<any>, {}> {

  public async componentDidMount() {
    if (this.props.match.path === '/callback') { return };
    try {
      await auth0Client.silentAuth();
      this.forceUpdate();
    } catch (err) {
      if (err.error === 'login_required') { return };
      console.log(err);
    }
  }

  public logout(): void {
    auth0Client.logout();
    this.props.history.replace('/');
  }

  public render() {
    return (
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a href="#" className="navbar-brand"> Nest React TypeScript Blog </a>
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

        <Switch>
          <Route path={"/callback"} component={Callback} />
          <PrivateRoute path={"/edit/:id"} component={EditPost} />
          <Route path={"/post/:id"} component={Post} />
          <PrivateRoute path={"/create"} component={Create} />
          <Route path={"/"} exact={true} component={Home} />
        </Switch>

      </div>
    );
  }
}

export default withRouter(App);
