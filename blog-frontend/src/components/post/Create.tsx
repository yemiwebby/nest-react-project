import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import auth0Client from '../../utils/auth';

export interface IValues {
    [key: string]: any;
}

export interface IFormState {
    values: IValues;
    author: string,
    submitSuccess?: boolean;
}

class Create extends React.Component<{} & RouteComponentProps, IFormState> {
    constructor(props: any) {
        super(props);
        const values: IValues = {};
        this.state = { values, author: auth0Client.getProfile().nickname }
    }

    private handleFormSubmission = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        const submitSuccess: boolean = await this.submitForm();
        this.setState({ submitSuccess });
        this.props.history.push('/');
    }

    private setValues = (values: IValues) => {
        this.setState({ values: { ...this.state.values, ...values } })
    }

    private async submitForm(): Promise<boolean> {
        try {
            const response = await fetch('http://localhost:5000/blog/post', {
                method: "post",
                headers: new Headers({
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "authorization": `Bearer ${auth0Client.getAccessToken()}`
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
        const { submitSuccess } = this.state;
        return (
            <div>
                <div className={"col-md-12 form-wrapper"}>
                    <h2> Create Post </h2>
                    <div className="alert alert-info" role="alert">
                        Fill the form below to create a new post
                    </div>
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
                            <button className="btn btn-success" type="submit"> Create Post </button>
                        </div>

                        {submitSuccess && (
                            <div className="alert alert-info" role="alert">
                                The form was successfully submitted!
                            </div>
                        )}
                    </form>
                </div>
            </div>
        )
    }
}

export default withRouter(Create)