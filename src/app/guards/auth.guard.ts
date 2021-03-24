import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { Router } from "@angular/router";
import jwt_decode from "jwt-decode"; // ESTO LO INSTALÉ CON npm i jwt-decode



@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  

      try {
        const token = localStorage.getItem('token');
        const payload = jwt_decode(token);
        return true;
      }

      catch (error) 
      {
        this.router.navigateByUrl("/login");
        return false;
      }

  }
  
}
