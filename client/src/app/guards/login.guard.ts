import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { PermissionsService } from '../services/permissions.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  userLogin: any;

  constructor(
    private permissionsService: PermissionsService,
    private router: Router
  ) {
    this.userLogin = this.permissionsService.getUserLogin();
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // console.log(this.userLogin);
    if (this.userLogin) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
