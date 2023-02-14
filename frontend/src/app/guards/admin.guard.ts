import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(){
    if(this.authService.isLoggedIn() && this.userService.isAdmin()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
