import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, forwardRef, Inject, Put, Req, UseGuards} from '@nestjs/common';
import { SubscribeService } from './subscribe.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DtoSubscribe } from '../dto/dto.subscribe';

@ApiTags('Subscribe')
@Controller('/api/subscribe')
export class SubscribeController {
  constructor(private subscribeService: SubscribeService) {}

  @Put('/append')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({
    description: 'append new subscribers',
    type: DtoSubscribe,
  })
  async append(@Req() req, @Body() body): Promise<DtoSubscribe> {
    return await this.subscribeService.appendSubscribe(req.user.id, body);
  }
}
