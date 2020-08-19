import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from '../../services/auth/auth.service';
import { IUser, SignInDTO, SignUpDTO } from '@screenshot-hall/models';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../../decorators/get-user.decorator';

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

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(AuthGuard())
  @Get('/profile')
  async profile(@GetUser() user: IUser): Promise<IUser> {
    return user;
  }
}
