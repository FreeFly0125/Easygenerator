import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { CustomLoggerService } from '../logging/logging.service';
import { UserResponse } from '../types/index';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/schemas/user.schema';

export interface AuthResponse {
  user: UserResponse;
  token: string;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private logger: CustomLoggerService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<AuthResponse> {
    const { email, password, name } = signUpDto;

    try {
      const existingUser = await this.usersService.findByEmail(email);
      if (existingUser) {
        this.logger.warn(
          `Signup attempt with existing email: ${email}`,
          'AuthService',
        );
        throw new ConflictException('Email already exists');
      }

      const user = await this.usersService.create(email, password, name);
      const token = await this.generateToken(user._id.toString());

      this.logger.log(`User successfully created: ${email}`, 'AuthService');

      return {
        user: this.formatUserResponse(user),
        token,
      };
    } catch (error) {
      this.logger.error(
        `Failed to create user: ${email}`,
        error.stack,
        'AuthService',
      );
      throw error;
    }
  }

  async signIn(signInDto: SignInDto): Promise<AuthResponse> {
    const { email, password } = signInDto;

    try {
      const user = await this.usersService.findByEmail(email);

      if (!user) {
        this.logger.warn(
          `Failed login attempt for non-existent user: ${email}`,
          'AuthService',
        );
        throw new UnauthorizedException('Invalid credentials');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        this.logger.warn(
          `Failed login attempt for user: ${email}`,
          'AuthService',
        );
        throw new UnauthorizedException('Invalid credentials');
      }

      const token = await this.generateToken(user._id.toString());

      this.logger.log(`User successfully logged in: ${email}`, 'AuthService');

      return {
        user: this.formatUserResponse(user),
        token,
      };
    } catch (error) {
      this.logger.error(
        `Login error for user: ${email}`,
        error.stack,
        'AuthService',
      );
      throw error;
    }
  }

  private async generateToken(userId: string): Promise<string> {
    return this.jwtService.signAsync({ sub: userId }, { secret: 'JWT_SECRET' });
  }

  private formatUserResponse(user: User): UserResponse {
    return {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
    };
  }
}
