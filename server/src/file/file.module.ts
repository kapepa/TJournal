import {forwardRef, Module} from '@nestjs/common';
import { FileService } from './file.service';
import {UserModule} from "../user/user.module";

@Module({
  imports: [ forwardRef(() => UserModule),],
  exports: [FileService],
  providers: [FileService],
})
export class FileModule {}
