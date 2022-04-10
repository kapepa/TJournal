import {Body, Controller, Post, Put, Query} from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { SettingsService } from './settings.service';

@ApiTags('Settings')
@Controller('/api/settings')
export class SettingsController {
  constructor(private settingsService: SettingsService) {}

  @Put('/set')
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  async set(@Body() body, @Query('id') query): Promise<any> {
    return await this.settingsService.updateSettings('id', query, body);
  }
}
