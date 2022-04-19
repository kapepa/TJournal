import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';
import { SubscribeService } from './subscribe.service';

@ApiTags('Subscribe')
@Controller('/api/subscribe')
export class SubscribeController {
  constructor(private subscribeService: SubscribeService) {}
}
