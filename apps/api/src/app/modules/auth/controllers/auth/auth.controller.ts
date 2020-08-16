import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from '../../services/auth/auth.service';
import { SignInDTO, SignUpDTO } from '@screenshot-hall/models';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body(ValidationPipe) signUpDTO: SignUpDTO): Promise<void> {
    return this.authService.signUp(signUpDTO);
  }

  @Post('/signin')
  async login(
    @Body(ValidationPipe) loginDTO: SignInDTO
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(loginDTO);
  }
}
