import * as React from 'react';
import { Link } from 'react-router-dom';
import auth0Client from '../utils/auth';


interface IState {
    data: any[];
}

export class Home extends React.Component<{}, IState> {
    constructor(props: any) {
        super(props);

        this.state = { data: [] }
    }

    public async componentDidMount(): Promise<any> {
        const response = await fetch('http://localhost:5000/blog/posts');
        const json = await response.json();
        this.setState({ data: json })
    }

    public async deletePost(id: string) {
        await fetch(`http://localhost:5000/blog/delete?postID=${id}`, {
            method: "delete",
            headers: new Headers({
                "Content-Type": "application/json",
                Accept: "application/json",
                "authorization": `Bearer ${auth0Client.getAccessToken()}`
            })
        });
        window.location.reload();

    }

    public render() {
        return (
            <div className={'page-wrapper'}>
                <div className="row">
                    {this.state.data && this.state.data.map(post => (
                        <div className="col-md-4" key={post._id}>
                            <div className="card mb-4 shadow-sm">
                                <div className="card-body">
                                    <h2 className="card-img-top">{post.title}</h2>
                                    <p className="card-text">{post.body}</p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="btn-group">
                                            <Link to={`edit/${post._id}`} className="btn btn-sm btn-outline-secondary">Edit Post </Link>
                                            <Link to={`post/${post._id}`} className="btn btn-sm btn-outline-secondary">View Post </Link>
                                            {
                                                auth0Client.isAuthenticated() &&
                                                <button className="btn btn-sm btn-outline-secondary" onClick={() => this.deletePost(post._id)}>Delete Post</button>
                                            }
                                        </div>
                                    </div>

                                    <div className="card-footer">
                                        <small className="text-muted">by: {post.author}</small>
                                    </div>

                                </div>
                            </div >
                        </div >
                    ))}
                </div >
            </div >
        )
    }
}