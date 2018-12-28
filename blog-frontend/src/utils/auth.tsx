import { WebAuth } from 'auth0-js';

class AuthenticateUsers {
    public authClient: WebAuth;
    private profile: any;
    public accessToken: any;
    public idToken: string;
    public expiresAt: any;

    constructor() {
        this.authClient = new WebAuth({
            clientID: 'kdKA3zlTOUgAkPGDEEZHrdoTxEMURvYh',
            domain: 'webby.auth0.com',
            responseType: 'token id_token',
            audience: 'http://localhost:3000/',
            redirectUri: 'http://localhost:3000/callback',
            scope: 'openid profile'
        });

        this.getProfile = this.getProfile.bind(this);
        this.getAccessToken = this.getAccessToken.bind(this);
        this.silentAuth = this.silentAuth.bind(this);
        this.handleAuthentication = this.handleAuthentication.bind(this);
        this.isAuthenticated = this.isAuthenticated.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);

    }

    public login(): void {
        this.authClient.authorize();
    }

    public handleAuthentication(): void {
        this.authClient.parseHash((err: auth0.Auth0Error, result: auth0.Auth0DecodedHash) => {
            if (result && result.accessToken && result.idToken) {
                this.setSession(result);
            } else if (err) {
                console.error(err);
            }
        })
    }

    private setSession(authResult: any): void {
        const { accessToken, idTokenPayload, expiresIn, idToken } = authResult;
        this.profile = idTokenPayload;
        this.accessToken = accessToken;
        this.idToken = idToken;
        this.expiresAt = expiresIn * 1000 + new Date().getTime();
    }

    public isAuthenticated(): boolean {
        return new Date().getTime() < this.expiresAt;
    }

    public getProfile() {
        return this.profile;
    }

    public getAccessToken() {
        return this.accessToken;
    }

    public logout(): void {
        this.authClient.logout({
            returnTo: 'http://localhost:3000/',
            clientID: 'kdKA3zlTOUgAkPGDEEZHrdoTxEMURvYh'
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