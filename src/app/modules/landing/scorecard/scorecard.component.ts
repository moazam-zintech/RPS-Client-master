import { Component, OnInit } from '@angular/core';
import { GoogleApiService } from 'app/services/googleService/google-api.service';

@Component({
  selector: 'app-scorecard',
  standalone: true,
  templateUrl: './scorecard.component.html',
  styleUrls: ['./scorecard.component.scss']
})
export class ScorecardComponent {
  // userProfile: any;
  
  // constructor(private _googleApiService: GoogleApiService){}

  // ngOnInit(): void {
  //   this._googleApiService.userProfile.subscribe({
  //     next: (profile) => {
  //         if (profile) {
  //             this.userProfile = profile;
  //         }
  //     },
  //     error: (err) => {
  //         console.error('Error fetching user profile:', err);
  //     }
  // });
  // }

}
