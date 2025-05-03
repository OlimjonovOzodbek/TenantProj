import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tenant } from '../models/Tenant';
import { Observable } from 'rxjs';
import { ThemeModel } from '../models/Theme';

@Injectable({
  providedIn: 'root'
})
export class TenantServiceService {

  constructor(private _http: HttpClient) 
  { 
    
  }
  getTenantsById(id: number): Observable<Tenant> {
    return this._http.get<Tenant>("");
  }
  getThemeById(id: number): Observable<ThemeModel> {
    return this._http.get<ThemeModel>("");
  }

}
