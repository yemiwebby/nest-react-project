import { WebAuth } from 'auth0-js';

class AuthenticateUsers {
  public authClient: WebAuth;
  private profile: any;
  public idToken: string;
  public expiresAt: any;

  constructor() {
    this.authClient = new WebAuth({
      clientID: `${process.env.REACT_APP_AUTH0_CLIENT_ID}`,
      domain: `${process.env.REACT_APP_AUTH0_DOMAIN}`,
      responseType: 'id_token',
      redirectUri: `${process.env.REACT_APP_AUTH0_REDIRECT_URI}`,
      scope: 'openid profile'
    });

    this.getProfile = this.getProfile.bind(this);
    this.getIdToken = this.getIdToken.bind(this);
    this.silentAuth = this.silentAuth.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);

  }

  public login(): void {
    this.authClient.authorize();
  }

  public handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.authClient.parseHash((err: auth0.Auth0Error, result: auth0.Auth0DecodedHash) => {
        if (err) { return reject(err) };
        if (!result || !result.idToken) {
          return reject(err);
        }
        this.setSession(result);
        resolve();
      })
    })
  }

  private setSession(authResult: any): void {
    const { idTokenPayload, idToken } = authResult;
    this.profile = idTokenPayload;
    this.idToken = idToken;
    this.expiresAt = idTokenPayload.exp * 1000 + new Date().getTime();
  }

  public isAuthenticated(): boolean {
    return new Date().getTime() < this.expiresAt;
  }

  public getProfile() {
    return this.profile;
  }

  public getIdToken() {
    return this.idToken;
  }

  public logout(): void {
    this.authClient.logout({
      returnTo: `${process.env.REACT_APP_BASEURL}`,
      clientID: `${process.env.REACT_APP_AUTH0_CLIENT_ID}`
    })
  }

  public silentAuth() {
    return new Promise((resolve, reject) => {
      this.authClient.checkSession({}, (err, result) => {
        if (err) { return reject(err) };
        this.setSession(result);
        resolve();
      })
    })
  }
}
const auth0Client = new AuthenticateUsers();

export default auth0Client;
