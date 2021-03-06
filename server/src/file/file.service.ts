import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { UserService } from '../user/user.service';
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class FileService {
  constructor(readonly userService: UserService) {}

  async DeleteFile(file: string) {
    const basic = join(__dirname, '..', '..', 'static');
    const fullPath = `${basic}/${file}`;
    if (fs.existsSync(fullPath)) await fs.unlinkSync(fullPath);
  }

  async LoadFile(file: Express.Multer.File): Promise<string> {
    const newName = uuidv4();
    const prefix = file.originalname.split('.').pop();
    const createName = `${newName}.${prefix}`;
    const basic = join(__dirname, '..', '..', 'static');

    if (!fs.existsSync(basic)) await fs.mkdirSync(basic);
    await fs.writeFileSync(`${basic}/${createName}`, Buffer.from(file.buffer));
    return createName;
  }

  async LoadUser(id: string, name: string, file: Express.Multer.File): Promise<string> {
    const user = await this.userService.findUser('id', id);
    if (user[name]) await this.DeleteFile(user[name]);

    const loadFile = await this.LoadFile(file);
    await this.userService.updateUser('id', id, { [name]: loadFile });
    return loadFile;
  }
}
