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
      <section className="post-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-1 col-md-0" />
            <div className="col-lg-10 col-md-12">
              <div className="main-post">
                <div className="post-top-area">
                  <h5 className="pre-title">Nest React Blog</h5>
                  <h3 className="title">
                    <a href="#">
                      <b>{post.title}</b>
                    </a>
                  </h3>

                  <p className="para">
                    {post.body}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      // <div className={'text-center page-wrapper'}>
      //   <div>
      //     <h4>
      //       <small>
      //         <button className="btn btn-success" onClick={() => this.viewAllPosts()}> View All Posts
      //                       </button>
      //       </small>
      //     </h4>
      //   </div>
      //   {
      //     this.state.post &&
      //     <div className="col-sm-12">

      //       <h2>{post.title}</h2>
      //       <h5>
      //         Post by {post.author}.</h5>
      //       <p> {post.body} </p>

      //     </div>
      //   }
      // </div >
    )
  }
}
