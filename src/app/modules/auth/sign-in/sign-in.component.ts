import { NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertComponent, FuseAlertType } from '@fuse/components/alert';
import { OAuthModule, } from 'angular-oauth2-oidc';
import { AuthService } from 'app/core/auth/auth.service';
import { GoogleApiService, UserInfo } from 'app/services/googleService/google-api.service';

@Component({
    selector: 'auth-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [HttpClientModule, OAuthModule, RouterLink, FuseAlertComponent, NgIf, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatCheckboxModule, MatProgressSpinnerModule],
})
export class AuthSignInComponent implements OnInit {
    userProfile: any;
    userInfo?: UserInfo;
    @ViewChild('signInNgForm') signInNgForm: NgForm;
    isUserAuthenticate = false;
    UserloggedInStatus: boolean = false;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    signInForm: UntypedFormGroup;
    showAlert: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _formBuilder: UntypedFormBuilder,
        private _router: Router,
        private googleApiService: GoogleApiService,

        iconReg: MatIconRegistry, sanitizer: DomSanitizer, private dialog: MatDialog
    ) {
        iconReg
            .addSvgIcon('google', sanitizer.bypassSecurityTrustResourceUrl('https://www.gstatic.com/mobilesdk/160512_mobilesdk/auth_service_google.svg'))
            .addSvgIcon('googlee', sanitizer.bypassSecurityTrustResourceUrl('../../../../assets/icons/google.svg'))
            .addSvgIcon('ellipse22', sanitizer.bypassSecurityTrustResourceUrl('../../../../assets/icons/Ellipse-22.svg'));
        // googleApiService.userProfileSubject.subscribe( info => {
        //     this.userInfo = info;
        // })
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
    */
    ngOnInit(): void {
        
        this.googleApiService.userProfile$.subscribe((profile) => {
            if (profile) {
              this.isUserAuthenticate = true;
              this.userProfile = profile;
              localStorage.setItem('_access_Token', JSON.stringify(true));
              this.googleApiService.loginUserDetails(this.googleApiService.googleAuthUserDetail);
              this.signIn();
              ;
              console.log('User Profile:', profile);
              console.log("Logged-In:", this.googleApiService);
            } else {
              this.isUserAuthenticate = false;
              console.log('User is not authenticated.');
            }
          });
      debugger
          // Check if already logged in
          if (this.googleApiService.isLoggedIn) {
            this.isUserAuthenticate = true;
            this.userProfile = this.googleApiService.identityClaims;
            console.log("Already LoggedIn:",this.userProfile);
          }

        // console.log('isloggedin: ', this.googleApiService.isLoggedIn())
        // const UserLoggedIn = localStorage.getItem('UserLoggedIn');
        // console.log(typeof(UserLoggedIn));
        
        // this.isUserAuthenticate = false;
        // //this.UserloggedInStatus = UserLoggedIn === 'true';
        // debugger
        // if (this.googleApiService.identityClaims) {
        //     debugger
        //     this.signIn();
        //     // this.googleApiService.userProfile.subscribe({
        //     //     next: (profile) => {
        //     //         if (profile) {
        //     //             this.isUserAuthenticate = true;
        //     //             this.userProfile = profile;
        //     //             this.signIn();
        //     //             localStorage.setItem('UserLoggedIn', JSON.stringify(true));
        //     //             console.log('UserProfile:', profile);
        //     //         }
        //     //     },
        //     //     error: (err) => {
        //     //         console.error('Error fetching user profile:', err);
        //     //     }
        //     // });
        //     // console.log("Access Token:", this.googleApiService.accessToken);
        // } 
        // else if (this.googleApiService.isLoggedIn()) 
        // else if (UserLoggedIn === 'false' && !this.isUserAuthenticate) 
        //     {
        //         debugger
        //     //this.isUserAuthenticate = true;
        //     setTimeout(() => {
        //         localStorage.setItem('UserLoggedIn', JSON.stringify(true));
        //         // window.location.reload();
        //     }, 1000);
        // }

        // Create the form
        this.signInForm = this._formBuilder.group({
            email: ['hughes.brian@company.com', [Validators.required, Validators.email]],
            password: ['admin', Validators.required],
            rememberMe: [''],
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign in
     */
    googleSignIn() {
        this.googleApiService.signIn();
        localStorage.setItem('UserLoggedIn', JSON.stringify(false));

        // const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/signed-in-redirect';
        //     console.log('Redirect_Url:', redirectURL);
        // Navigate to the redirect url
        // this._router.navigateByUrl(redirectURL);
    }
    signOut() {
        this.googleApiService.signOut();
        this.isUserAuthenticate = false;
        this.userProfile = null;
      }

    // isLoggedIn(){
    //     return this.googleApiService.isLoggedIn();
    // }
    get isLoggedIn() {
        return !!this.googleApiService.identityClaims;
    }

    logout() {
        this.googleApiService.signOut();
        this._router.navigateByUrl('/signin');
    }

    signIn(): void {
        // Return if the form is invalid
        if (this.signInForm.invalid) {
            return;
        }

        // Disable the form
        this.signInForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Sign in
        this._authService.signIn(this.signInForm.value)
            .subscribe(
                () => {
                    // Set the redirect url.
                    // The '/signed-in-redirect' is a dummy url to catch the request and redirect the user
                    // to the correct page after a successful sign in. This way, that url can be set via
                    // routing file and we don't have to touch here.
                    const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/signed-in-redirect';

                    // Navigate to the redirect url
                    this._router.navigateByUrl(redirectURL);

                },
                (response) => {
                    // Re-enable the form
                    this.signInForm.enable();

                    // Reset the form
                    this.signInNgForm.resetForm();

                    // Set the alert
                    this.alert = {
                        type: 'error',
                        message: 'Wrong email or password',
                    };

                    // Show the alert
                    this.showAlert = true;
                },
            );

    }
}
