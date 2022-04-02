import { Injectable } from '@nestjs/common';
import {UserService} from "../user/user.service";
import {DtoUser} from "../dto/dto.user";

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async JwtToken (user: DtoUser): Promise<string> {

    return 'atoken';
  }

  async AuthCreate () {
    return "asdas"
  }

  async validateUser(name: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(name);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
