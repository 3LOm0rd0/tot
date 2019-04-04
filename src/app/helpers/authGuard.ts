import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import{ AuthServiceService} from '../Services/auth-service.service';
import { AlertService } from '../Services/alert.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router,private message: AlertService,
        private authenticationService:AuthServiceService ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot, ) {
        const currentUser=this.authenticationService.currentUserValue;
        if(currentUser){
            if(route.data.roles && route.data.roles.indexOf(currentUser.rola)===-1){
                this.router.navigate(['/']);
                return false;
            }
        return true;
        }
        

        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        } 
               // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
        }

        
        }

    
