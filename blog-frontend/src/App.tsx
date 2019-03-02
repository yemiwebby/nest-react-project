import * as React from 'react';
import './App.css';
import { Switch, Route, withRouter, RouteComponentProps } from 'react-router-dom';
import { Home } from './components/Home';
import Callback from './components/Callback';
import Create from './components/post/Create';
import { Post } from './components/post/Post';
import { EditPost } from './components/post/Edit';
import auth0Client from './utils/auth';
import PrivateRoute from './components/PrivateRoute';
import NavBar from './components/NavBar';


class App extends React.Component<{} & RouteComponentProps<any>, {}> {

  public async componentDidMount() {
    if (this.props.location.pathname === '/callback') {
      window.location.reload();
      return;
    } else {
      try {
        await auth0Client.silentAuth();
        this.forceUpdate();
      } catch (err) {
        if (err.error === 'login_required') { return };
        console.log(err);
      }
    }
  }

  public render() {
    return (
      <div className="App">
        <NavBar />
        <div className={'container'}>
          <Switch>
            <PrivateRoute path={"/edit/:id"} component={EditPost} />
            <Route path={"/post/:id"} component={Post} />
            <PrivateRoute path={"/create"} component={Create} />
            <Route path={"/callback"} exact={true} component={Callback} />
            <Route path={"/"} exact={true} component={Home} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
