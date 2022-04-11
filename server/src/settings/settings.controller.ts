import { Body, Controller, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { SettingsService } from './settings.service';
import { DtoList } from '../dto/dto.list';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {DtoMessage} from "../dto/dto.message";

@ApiTags('Settings')
@Controller('/api/settings')
export class SettingsController {
  constructor(private settingsService: SettingsService) {}

  @Put('/change')
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  async change(@Body() body, @Query('id') query): Promise<any> {
    return await this.settingsService.updateSettings('id', query, body);
  }

  @Put('/message')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  async message(@Body() body): Promise<any> {
    const obj = {} as { list?: DtoList, message?: DtoMessage };
    if (body.hasOwnProperty('list'))
      obj.list = await this.settingsService.updateList(
        'id',
        body.list.id,
        body.list,
      );
    if (body.hasOwnProperty('message'))
      obj.message = await this.settingsService.updateMessage(
        'id',
        body.message.id,
        body.message,
      );

    return obj;
  }
}
