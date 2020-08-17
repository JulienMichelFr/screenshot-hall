import { UserEntity } from '../entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { SignInDTO, SignUpDTO } from '@screenshot-hall/models';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  private static async hashPassword(
    password: string,
    salt: string
  ): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async validateUserPassword(
    loginDTO: SignInDTO
  ): Promise<{ email: string; username: string; id: string }> {
    const user = await this.findOne({ email: loginDTO.email });
    if (user && (await user.validatePassword(loginDTO.password))) {
      return { email: user.email, username: user.username, id: user.id };
    }
    return null;
  }

  async signUp(signUpDTO: SignUpDTO): Promise<void> {
    const user = new UserEntity();

    user.username = signUpDTO.username;
    user.salt = await bcrypt.genSalt();
    user.password = await UserRepository.hashPassword(
      signUpDTO.password,
      user.salt
    );
    user.email = signUpDTO.email;
    try {
      await user.save();
    } catch (e) {
      switch (e.code) {
        // Duplicate key
        case '23505':
        case 23505:
          throw new ConflictException('Username or Email is already used');
        default:
          throw new InternalServerErrorException();
      }
    }
  }
}
