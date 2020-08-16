import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../../repositories/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtPayload, SignInDTO, SignUpDTO } from '@screenshot-hall/models';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService
  ) {}

  async signUp(signUpDTO: SignUpDTO) {
    return this.userRepository.signUp(signUpDTO);
  }

  async signIn(signInDTO: SignInDTO): Promise<{ accessToken: string }> {
    const payload: JwtPayload = await this.userRepository.validateUserPassword(
      signInDTO
    );
    if (!payload) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const accessToken = await this.jwtService.sign(payload);
    return { accessToken };
  }
}
