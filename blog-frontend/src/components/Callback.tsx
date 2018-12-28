import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import auth0Client from '../utils/auth';


export class Callback extends React.Component<{} & RouteComponentProps<any>, {}> {

    public async componentDidMount(): Promise<any> {
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
