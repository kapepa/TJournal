import { Injectable } from '@nestjs/common';

@Injectable()
export class MailerService {
  async SendEmailRegistration (email: string) {
    console.log(email)
  }
}
