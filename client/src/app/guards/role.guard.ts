import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { PermissionsService } from '../services/permissions.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  userLogin: any;

  constructor(private permissionsService: PermissionsService) {
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
    switch (this.userLogin.role) {
      case '5f136f1b5e21105a19dfc224':
        return true;
        break;
      default:
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: `Tu  no tienes los permisos para ingresar`,
          showConfirmButton: false,
          timer: 2000,
        }).then(() => window.location.reload());
        return false;
    }
  }
}
