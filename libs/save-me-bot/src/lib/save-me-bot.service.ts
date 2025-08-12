import { Inject, Injectable } from '@nestjs/common';
import { MODULE_OPTIONS } from './constants';
import { SaveMeBotModuleOptions } from './save-me-bot.module';

@Injectable()
export class SaveMeBotService {
  @Inject(MODULE_OPTIONS) private readonly options: SaveMeBotModuleOptions;
}
