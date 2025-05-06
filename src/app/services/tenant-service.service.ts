import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tenant } from '../models/Tenant';
import { ThemeModel } from '../models/Theme';

@Injectable({
  providedIn: 'root'
})
export class TenantServiceService {

  apiurl = "https://localhost:7120/api/TenantService"
  constructor(private _http: HttpClient) 
  { 
    
  }
  getTenantsById(id: number): Observable<Tenant> {
    return this._http.get<Tenant>(this.apiurl+'/'+ id);
  }
  getThemeById(id: number): Observable<ThemeModel> {
    return this._http.get<ThemeModel>("");
  }
}
