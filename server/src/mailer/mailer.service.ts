import { Injectable } from '@nestjs/common';
import { config } from 'dotenv';
import * as nodemailer from 'nodemailer';

config();

@Injectable()
export class MailerService {
  async Transporter () {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.MAILER_GMAIL, pass: process.env.MAILER_PASSWORD},
    })
    return transporter;
  }

  async SendEmailRegistration (email: string) {
    const transporter = await this.Transporter();

    await transporter.sendMail({
      from: 'TJournal',
      to: email,
      subject: 'Registration',
      text: 'You have successfully registered .',
      html:'<div><strong>You have successfully registered.</strong></div>',
    })
  }
};
