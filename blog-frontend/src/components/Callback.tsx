import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import auth0Client from '../utils/auth';


class Callback extends React.Component<{} & RouteComponentProps<any>, {}> {

  public async componentDidMount() {
    await auth0Client.handleAuthentication();
    this.props.history.replace('/');
  }

  public render() {
    return (
      <div>
        <p> Loading profile ... </p>
      </div >
    )
  }
}

export default withRouter(Callback);
