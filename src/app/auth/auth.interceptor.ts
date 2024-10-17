import { HttpInterceptorFn, HttpHandlerFn, HttpRequest, HttpEvent  } from '@angular/common/http';
import { Observable, catchError, throwError, switchMap } from 'rxjs';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { TokenResponse } from './auth.interface';

let isRefreshing:boolean = false



export const authTokenInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next:HttpHandlerFn):Observable<HttpEvent<any>> => {

  const authService: AuthService = inject(AuthService)
  const token: string | null = authService.token

  if (!token) return next(req)

  if (isRefreshing) {
    return refreshAndProceed(authService, req, next)
  }

  return next(addToken(req, token))
      .pipe(
      catchError( error => {
        if (error.status === 403) {
          return refreshAndProceed(authService, req, next)
        }

        return throwError(error)
    })
  )
}


const refreshAndProceed = (
  authService: AuthService,
  req: HttpRequest<any>,
  next:HttpHandlerFn
) => {
    if (!isRefreshing) {
      isRefreshing = true
      return authService.refreshAuthToken()
        .pipe(
          switchMap((res: TokenResponse) => {
            isRefreshing = false
            return next(addToken(req, res.access_token))
      })
      )
    }

    return next(addToken(req, authService.token!))
}

const addToken = (req: HttpRequest<any>, token: string) => {
    return req = req.clone({
    setHeaders: {
      AuthService: 'Bearer ${token}'
    }
  })
}
