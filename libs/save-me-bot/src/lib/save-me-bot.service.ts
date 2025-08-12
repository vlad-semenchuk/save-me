import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { Bot } from 'grammy';
import { MODULE_OPTIONS } from './constants';
import { SaveMeBotModuleOptions } from './save-me-bot.module';

@Injectable()
export class SaveMeBotService implements OnModuleInit, OnModuleDestroy {
  @Inject(MODULE_OPTIONS) private readonly options: SaveMeBotModuleOptions;

  private bot: Bot;

  onModuleInit() {
    this.bot = new Bot(this.options.botToken);

    this.bot.command('start', (ctx) => {
      return ctx.reply('Welcome! I am Save Me Bot. I am up and running!');
    });

    this.bot.on('message', (ctx) => {
      return ctx.reply(`You said: ${ctx.message.text}`);
    });

    console.log('Starting Save Me Bot...');
    void this.bot.start();
    console.log('Save Me Bot is running!');
  }

  async onModuleDestroy() {
    // Stop the bot gracefully
    if (this.bot) {
      console.log('Stopping Save Me Bot...');
      await this.bot.stop();
      console.log('Save Me Bot stopped.');
    }
  }
}
