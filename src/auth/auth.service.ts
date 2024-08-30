import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/app/users/users.service';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(private usersService: UsersService, private readonly jwtService: JwtService) {}

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };

    return {
      tojken: this.jwtService.sign(payload),
    }
  }
  async validateUser(email: string, password: string) {
    let user: any;
    try {
      user = await this.usersService.findOneOrThrow(email);
    } catch (error) {
      return null;
    }

    const isMatch = compareSync(password, user.password);
    if (!isMatch) return null;
    return user
  }

}
