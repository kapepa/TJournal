import { Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { SettingsService } from './settings.service';

@ApiTags('Settings')
@Controller('/api/settings')
export class SettingsController {
  constructor(private settingsService: SettingsService) {}

  @Post('/set')
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  async set(): Promise<any> {
    return this.settingsService.createSettings();
  }
}
