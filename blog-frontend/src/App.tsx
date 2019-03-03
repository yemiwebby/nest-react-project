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

export interface ISessionState {
  validateSession: boolean
}


class App extends React.Component<{} & RouteComponentProps<any>, ISessionState> {

  constructor(props: any) {
    super(props);
    this.state = {
      validateSession: true,
    }
  }

  public async componentDidMount() {
    if (this.props.location.pathname === '/callback') {
      this.setState({ validateSession: false });
      return;
    }
    try {
      await auth0Client.silentAuth();
      this.forceUpdate();
    } catch (err) {
      if (err.error === 'login_required') { return };
      console.log(err);
    }
    this.setState({ validateSession: false });
  }

  public render() {
    return (
      <div className="App">
        <NavBar />
        <div className={'container'}>
          <Switch>
            <Route path={"/"} exact={true} component={Home} />
            <Route path={"/post/:id"} component={Post} />
            <Route path={"/callback"} exact={true} component={Callback} />
            <PrivateRoute path={"/edit/:id"} component={EditPost} validateSession={this.state.validateSession} />
            <PrivateRoute path={"/create"} component={Create} validateSession={this.state.validateSession} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
