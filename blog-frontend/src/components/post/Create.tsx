import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import auth0Client from '../../utils/auth';

export interface IValues {
  title: string,
  description: string,
  body: string,
  author: string
}

export interface IFormState {
  [key: string]: any;
  values: IValues[];
  submitSuccess?: boolean;
  loading: boolean;
}

class Create extends React.Component<{} & RouteComponentProps, IFormState> {
  constructor(props: any) {
    super(props);
    this.state = {
      title: '',
      description: '',
      body: '',
      author: auth0Client.getProfile().nickname,
      values: [],
      loading: false
    }
  }

  private handleFormSubmission = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    this.setState({ loading: true });

    const formData = {
      title: this.state.title,
      description: this.state.description,
      body: this.state.body,
      author: this.state.author
    }

    const submitSuccess: boolean = await this.submitForm(formData);
    this.setState({ submitSuccess, values: [...this.state.values, formData], loading: false });
    setTimeout(() => {
      this.props.history.push('/');
    }, 1500)
  }

  private async submitForm(formData: {}) {
    try {
      const response = await fetch('/blog/post', {
        method: "post",
        headers: new Headers({
          "Content-Type": "application/json",
          "Accept": "application/json",
          "authorization": `Bearer ${auth0Client.getIdToken()}`
        }),
        body: JSON.stringify(formData)
      });
      return response.ok;
    } catch (ex) {
      return false;
    }
  }

  private handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value,
    })
  }

  public render() {
    const { submitSuccess, loading } = this.state;
    return (
      <div>
        <div className={"col-md-12 form-wrapper"}>
          <h2> Create Post </h2>
          {!submitSuccess && (
            <div className="alert alert-info" role="alert">
              Fill the form below to create a new post
                    </div>
          )}

          {submitSuccess && (
            <div className="alert alert-info" role="alert">
              The form was successfully submitted!
                            </div>
          )}

          <form id={"create-post-form"} onSubmit={this.handleFormSubmission} noValidate={true}>
            <div className="form-group col-md-12">
              <label htmlFor="title"> Title </label>
              <input type="text" id="title" onChange={(e) => this.handleInputChanges(e)} name="title" className="form-control" placeholder="Enter title" />
            </div>

            <div className="form-group col-md-12">
              <label htmlFor="description"> Description </label>
              <input type="text" id="description" onChange={(e) => this.handleInputChanges(e)} name="description" className="form-control" placeholder="Enter Description" />
            </div>

            <div className="form-group col-md-12">
              <label htmlFor="body"> Write Content </label>
              <input type="text" id="body" onChange={(e) => this.handleInputChanges(e)} name="body" className="form-control" placeholder="Enter content" />
            </div>

            <div className="form-group col-md-12">
              <label htmlFor="author"> Author </label>
              <input type="text" id="author" defaultValue={this.state.author} onChange={(e) => this.handleInputChanges(e)} name="author" className="form-control" />
            </div>

            <div className="form-group col-md-4 pull-right">
              <button className="btn btn-success" type="submit">
                Create Post
              </button>
              {loading &&
                <span className="fa fa-circle-o-notch fa-spin" />
              }
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default withRouter(Create)
