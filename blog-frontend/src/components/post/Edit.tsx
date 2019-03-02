import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import auth0Client from '../../utils/auth';

export interface IValues {
  [key: string]: any;
}

export interface IFormState {
  id: string;
  post: any;
  values: IValues;
  submitSuccess?: boolean;
  loading: boolean;
}

export class EditPost extends React.Component<{} & RouteComponentProps<any>, IFormState> {

  constructor(props: any) {
    super(props);
    const values: IValues = {};
    this.state = {
      id: this.props.match.params.id,
      post: {},
      values,
      loading: false
    }
  }

  public async componentDidMount(): Promise<any> {
    const response = await fetch(`/blog/post/${this.state.id}`);
    const json = await response.json();
    this.setState({ post: json })
  }

  /**
   * handles form submission
   * @param e
   */
  private handleFormSubmission = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    this.setState({ loading: true });

    const submitSuccess: boolean = await this.submitForm();
    this.setState({ submitSuccess, loading: false });
    setTimeout(() => {
      this.props.history.push('/');
    }, 1500)
  }

  private setValues = (values: IValues) => {
    this.setState({ values: { ...this.state.values, ...values } });
  }

  private async submitForm(): Promise<boolean> {
    try {
      const response = await fetch(`/blog/edit?postID=${this.state.id}`, {
        method: "put",
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
          "authorization": `Bearer ${auth0Client.getIdToken()}`
        }),
        body: JSON.stringify(this.state.values)
      });
      return response.ok;
    } catch (ex) {
      return false;
    }
  }

  private handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
    this.setValues({ [e.currentTarget.id]: e.currentTarget.value })
  }


  public render() {
    const { submitSuccess, loading } = this.state;
    return (
      <div className={'page-wrapper'}>
        {this.state.post &&
          <div className={"col-md-12 form-wrapper"}>
            <h2> Create Post </h2>

            {submitSuccess && (
              <div className="alert alert-info" role="alert">
                The post has been edited successfully!
                            </div>
            )}
            <form id={"create-post-form"} onSubmit={this.handleFormSubmission} noValidate={true}>
              <div className="form-group col-md-12">
                <label htmlFor="title"> Title </label>
                <input type="text" id="title" defaultValue={this.state.post.title} onChange={(e) => this.handleInputChanges(e)} name="title" className="form-control" placeholder="Enter title" />
              </div>

              <div className="form-group col-md-12">
                <label htmlFor="description"> Description </label>
                <input type="text" id="description" defaultValue={this.state.post.description} onChange={(e) => this.handleInputChanges(e)} name="description" className="form-control" placeholder="Enter Description" />
              </div>

              <div className="form-group col-md-12">
                <label htmlFor="body"> Write Content </label>
                <input type="text" id="body" defaultValue={this.state.post.body} onChange={(e) => this.handleInputChanges(e)} name="body" className="form-control" placeholder="Enter content" />
              </div>

              <div className="form-group col-md-4 pull-right">
                <button className="btn btn-success" type="submit">
                  Edit Post
                </button>
                {loading &&
                  <span className="fa fa-circle-o-notch fa-spin" />
                }
              </div>
            </form>
          </div>
        }
      </div>
    )
  }
}
