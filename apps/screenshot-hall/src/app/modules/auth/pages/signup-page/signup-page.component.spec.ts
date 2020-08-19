import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupPageComponent } from './signup-page.component';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { APP_CONFIG } from '../../../shared/providers/app-config.provider';
import { AuthService } from '../../services/auth/auth.service';
import { Observable, of } from 'rxjs';
import { User } from 'firebase';
import { CreateUserDto } from '../../../../interfaces/dto/create-user.dto';
import { RouterTestingModule } from '@angular/router/testing';

const mockAuthService: AuthService = {
  signUp(value: CreateUserDto): Observable<User> {
    return of({
      displayName: value.displayName,
      email: value.email,
    } as User);
  },
} as AuthService;

describe('SignupPageComponent', () => {
  let component: SignupPageComponent;
  let fixture: ComponentFixture<SignupPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignupPageComponent],
      providers: [
        {
          provide: APP_CONFIG,
          useValue: {},
        },
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
      imports: [
        MatCardModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule,
        MatButtonModule,
        RouterTestingModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
