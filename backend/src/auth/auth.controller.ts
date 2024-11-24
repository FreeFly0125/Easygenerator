import {
  Controller,
  Post,
  Body,
  UseFilters,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthService, AuthResponse } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { GetUser } from '../common/decorators/get-user.decorator';
import { User } from '../users/schemas/user.schema';
import { CustomLoggerService } from '../logging/logging.service';
import { UserResponse } from '../types';

@Controller('auth')
@UseFilters(HttpExceptionFilter)
export class AuthController {
  constructor(
    private authService: AuthService,
    private logger: CustomLoggerService,
  ) {}

  @Post('signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<AuthResponse> {
    return this.authService.signUp(signUpDto);
  }

  @Post('signin')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@GetUser() user: User): UserResponse {
    this.logger.log(
      `Profile accessed by user: ${user.email}`,
      'AuthController',
    );
    return {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
    };
  }

  @Get('email')
  @UseGuards(JwtAuthGuard)
  getUserEmail(@GetUser('email') email: string) {
    this.logger.log(`Email accessed by user: ${email}`, 'AuthController');
    return { email };
  }
}
