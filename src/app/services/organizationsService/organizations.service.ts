import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Organizations } from 'app/models/organizations.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrganizationsService {

  constructor(private http:HttpClient) { }

  // addOrganizations(data:Organizations):Observable<Organizations>{
  //   return this.http.post<Organizations>("http://localhost:3000/organizations",data);
  // }
  // updateOrganizations(id:any, data:Organizations):Observable<any>{
  //   return this.http.put<Organizations>(`http://localhost:3000/organizations/${id}`,data);
  // }
  // getAllOrganizations():Observable<Organizations>{
  //   return this.http.get<Organizations>("http://localhost:3000/organizations");
  // }
  // // getOrganizations(id: number):Observable<any>{
  // //   return this.http.get("http://localhost:3000/organizations/",id)
  // // }
  
  //archiveOrganizations
  // deleteOrganizations(id:any):Observable<any>{
  //   return this.http.delete<Organizations>(`http://localhost:3000/organizations/${id}`);
  // }

}
