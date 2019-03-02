import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';


interface IState {
  id: string,
  post: any;
}

export class Post extends React.Component<{} & RouteComponentProps<any>, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      post: {}
    }
  }

  public async componentDidMount(): Promise<any> {
    const response = await fetch(`/blog/post/${this.state.id}`);
    const json = await response.json();
    this.setState({ post: json })
  }

  public viewAllPosts(): void {
    this.props.history.push('/');
  }

  public render() {
    const post = this.state.post;
    return (
      <div className={'text-center page-wrapper'}>
        <div>
          <h4>
            <small>
              <button className="btn btn-success" onClick={() => this.viewAllPosts()}> View All Posts
                            </button>
            </small>
          </h4>
        </div>
        {
          this.state.post &&
          <div className="col-sm-12">

            <h2>{post.title}</h2>
            <h5>
              Post by {post.author}.</h5>
            <p> {post.body} </p>

          </div>
        }
      </div >
    )
  }
}
