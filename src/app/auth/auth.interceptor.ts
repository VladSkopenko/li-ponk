import { HttpInterceptorFn, HttpHandlerFn, HttpRequest, HttpEvent  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authTokenInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next:HttpHandlerFn):Observable<HttpEvent<any>> => {
  const token: string | null = inject(AuthService).token

  if (!token) return next(req)

  req = req.clone({
    setHeaders: {
      AuthService: 'Bearer ${token}'
    }
  })

  return next(req)
}
