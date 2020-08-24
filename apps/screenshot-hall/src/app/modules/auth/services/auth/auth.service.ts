import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  IUser,
  JwtPayload,
  SignInDTO,
  SignUpDTO,
} from '@screenshot-hall/models';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, shareReplay, switchMap, take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import AppConfig from '../../../../../configuration/app.config';
import { TOKEN_KEY } from '../../../../../utils/constantes';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _token: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(this.token ? (this.isExpired ? null : this.token) : null);

  private readonly endpoint = `${this.config.api}/api/auth`;

  public readonly user$: Observable<IUser | null> = this._token
    .asObservable()
    .pipe(
      switchMap((token) => {
        if (!token) {
          return of(null);
        }
        return this.profile();
      })
    );

  public readonly loggedIn$: Observable<boolean> = this._token.pipe(
    map((user) => {
      return !!user;
    })
  );

  public get token(): string | null {
    return this.jwtService.tokenGetter();
  }

  public decoded(): (JwtPayload & { exp: number }) | null {
    if (!this.token) {
      return null;
    }
    return this.jwtService.decodeToken();
  }

  public get expireAt(): Date | null {
    if (!this.token) {
      return null;
    }
    return this.jwtService.getTokenExpirationDate();
  }

  public get isExpired(): boolean {
    if (!this.token) {
      return true;
    }
    return this.jwtService.isTokenExpired();
  }

  constructor(
    private router: Router,
    private http: HttpClient,
    private config: AppConfig,
    private jwtService: JwtHelperService
  ) {}

  public signUp(user: SignUpDTO): Observable<any> {
    return this.http.post<any>(`${this.endpoint}/signup`, user);
  }

  public async signIn(credentials: SignInDTO): Promise<boolean> {
    const { accessToken } = await this.http
      .post<{ accessToken: string }>(`${this.endpoint}/signin`, credentials)
      .toPromise();
    localStorage.setItem(TOKEN_KEY, accessToken);
    this._token.next(accessToken);
    return this.router.navigate(['/galleries']);
  }

  public signOut(): void {
    localStorage.removeItem(TOKEN_KEY);
  }

  public profile(): Observable<IUser> {
    return this.http
      .get<IUser>(`${this.endpoint}/profile`)
      .pipe(take(1), shareReplay());
  }
}
