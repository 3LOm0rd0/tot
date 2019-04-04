import {Injectable} from '@angular/core';
import{HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthServiceService} from '../Services/auth-service.service';
@Injectable()

export class JwtAnswer implements HttpInterceptor{
    constructor(private authenticateService: AuthServiceService){}

    intercept(request: HttpRequest<any>,
        next: HttpHandler):Observable<HttpEvent<any>>{

        let currentUser=this.authenticateService.currentUserValue;
        if(currentUser&&currentUser.token){
            request=request.clone({
                setHeaders:{
                    Authorization:`Bearer ${currentUser.token}`
                }
            });
        }
        return next.handle(request);
    }
    
    
}