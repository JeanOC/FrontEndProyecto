import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginComponent } from '../pages/auth/login/login/login.component';
import { LoginService } from '../service/login.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
user:any;
rol:any;
constructor(private login:LoginService , private router: Router){
  this.user = sessionStorage.getItem('user');
}

canActivate(){
  if(this.user === 'admin'){  
   return true 
  }
  alert('No tiene permiso')
  this.router.navigate(['/login'])
  return false
}

} 
