import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IUser, SignInDTO, SignUpDTO } from '@screenshot-hall/models';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, shareReplay, switchMap, take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import AppConfig from '../../../../../configuration/app.config';
import { TOKEN_KEY } from '../../../../../utils/constantes';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _token: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(localStorage.getItem(TOKEN_KEY));

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

  constructor(
    private router: Router,
    private http: HttpClient,
    private config: AppConfig
  ) {}

  public signUp(user: SignUpDTO): Observable<any> {
    return this.http.post<any>(`${this.endpoint}/signup`, user);
  }

  public async signIn(credentials: SignInDTO): Promise<boolean> {
    const { accessToken } = await this.http
      .post<{ accessToken: string }>(`${this.endpoint}/signin`, credentials)
      .toPromise();
    localStorage.setItem(TOKEN_KEY, accessToken);
    return this.router.navigate(['/']);
  }

  public signOut(): Promise<boolean> {
    localStorage.removeItem(TOKEN_KEY);
    return this.router.navigate(['/auth/login']);
  }

  public profile(): Observable<IUser> {
    return this.http
      .get<IUser>(`${this.endpoint}/profile`)
      .pipe(take(1), shareReplay());
  }
}
