import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
import { GoogleAuthLogin } from 'app/models/googleAuthLogin.model';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

const oAuthConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  redirectUri: window.location.origin,
  clientId: '550998559651-ulhvqbsm7cqs164el0uo7ot618qa6u84.apps.googleusercontent.com',
  scope: 'openid profile email'
}

export interface UserInfo {
  info: {
    sub: string,
    email: string,
    name: string,
    picture: string
  }
}

@Injectable({
  providedIn: 'root'
})
export class GoogleApiService {
  private userProfileSubject = new BehaviorSubject<any>(null);
  public userProfile$: Observable<any> = this.userProfileSubject.asObservable();
  //authUserDetail: GoogleAuthLogin;
  // userProfileSubject = new Subject<UserInfo>();

  constructor(private oauthService: OAuthService, private http: HttpClient) {
    
    // oAuthService.configure(oAuthConfig);
    // oAuthService.tokenValidationHandler = new JwksValidationHandler();
    this.configureOAuth();


    // oAuthService.logoutUrl = 'https://www.google.com/accounts/logout';
    //oAuthService.loadDiscoveryDocumentAndTryLogin()
    // oAuthService.loadDiscoveryDocument().then( () => {
    //   oAuthService.tryLoginImplicitFlow().then( () => {
    //     if(!oAuthService.hasValidAccessToken()){
    //       oAuthService.initLoginFlow();
    //     }
    //     else{
    //       oAuthService.loadUserProfile().then( (userProfile) => {
    //         console.log(JSON.stringify(userProfile));
    //         this.userProfileSubject.next(userProfile as UserInfo)
    //       })
    //     }
    //   })
    // })
  }
  private configureOAuth() {
    this.oauthService.configure(oAuthConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      if (this.oauthService.hasValidAccessToken()) {
        this.loadUserProfile();
      }
    });
  }
  private loadUserProfile() {
    this.oauthService.loadUserProfile().then((profile) => {
      this.userProfileSubject.next(profile);
      localStorage.setItem('UserLoggedIn', 'true');
      localStorage.setItem('userProfile', JSON.stringify(profile));
    });
  }
  signIn() {
    this.oauthService.initImplicitFlow();
  }
  signOut() {
    // const logoutUrl = `https://accounts.google.com/Logout`;
    // window.location.href = logoutUrl; 
    this.oauthService.logOut();
    // this.oauthService.revokeTokenAndLogout();
    this.userProfileSubject.next(null);
    localStorage.removeItem('UserLoggedIn');
    localStorage.removeItem('userProfile');
  }
  get isLoggedIn(): boolean {
    return this.oauthService.hasValidAccessToken();
  }

  get identityClaims(): any {
    return this.oauthService.getIdentityClaims();
  }
   get accessToken() {
    return this.oauthService.getAccessToken();
  }
  get id_Token() {
    return this.oauthService.getIdToken();
  }
  get IdTokenexpiresIn() {
    return this.oauthService.getIdTokenExpiration();
  }
  get AccessTokenexpiresIn() {
    return this.oauthService.getAccessTokenExpiration();
  }
  get googleAuthUserDetail() {
    const authUserDetail = {
      cid: this.identityClaims.sub,
      accessToken: this.accessToken,
      email:this.identityClaims.email,
      domain: this.identityClaims.hd
    }
    console.log('authUserDetail:',authUserDetail);
    return authUserDetail;
  }

  loginUserDetails(data:any):Observable<any>{
      return this.http.post<any>("https://localhost:7251/api/Auth/verify",data);
    }

  // get userProfile() {
  //   const url = "https://www.googleapis.com/oauth2/v2/userinfo";

  //   return this.http.get(url, {
  //     headers: {
  //       Authorization: `Bearer ${this.accessToken}`
  //     }
  //   })
  // }
}