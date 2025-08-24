import {
  Inject,
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { Bot, CommandContext, Context, Filter } from 'grammy';
import { MODULE_OPTIONS } from '../constants';
import { SaveMeBotModuleOptions } from '../save-me-bot.module';
import { UrlReaderService } from './url-reader.service';

@Injectable()
export class SaveMeBotService implements OnModuleInit, OnModuleDestroy {
  @Inject(MODULE_OPTIONS) private readonly options: SaveMeBotModuleOptions;
  @Inject() private readonly urlReader: UrlReaderService;

  private readonly logger = new Logger(SaveMeBotService.name);
  private bot: Bot;

  onModuleInit() {
    this.bot = new Bot(this.options.botToken);

    // Register handlers
    this.registerHandlers();

    this.bot.start().catch((error) => {
      this.logger.error('Failed to start Save Me Bot:', error);
    });
  }

  async onModuleDestroy() {
    // Stop the bot gracefully
    if (this.bot) {
      await this.bot.stop();
      this.logger.debug('Save Me Bot stopped.');
    }
  }

  private registerHandlers(): void {
    // Commands
    this.bot.command('start', (ctx) => this.handleStartCommand(ctx));

    // Message handlers
    // this.bot.on('message:entities:url', (ctx) => this.handleUrl(ctx));
    // this.bot.on('message:text', (ctx) => this.handleText(ctx));

    this.bot.on('message', (ctx) => this.handleMessage(ctx));
  }

  private async handleStartCommand(
    ctx: CommandContext<Context>,
  ): Promise<void> {
    await ctx.reply(
      'Welcome! I am Save Me Bot. Send me photos, audio, files, or links and I will save them for you!',
    );
  }

  private async handleMessage(ctx: Filter<Context, 'message'>): Promise<void> {
    const data = ctx.msg;

    console.log(JSON.stringify(data, null, 2));

    await ctx.reply(`Received message`);
  }

  private async handleUrl(
    ctx: Filter<Context, 'message:entities:url'>,
  ): Promise<void> {
    // const text = ctx.msg.text || ctx.msg.caption || '';
    // const entities = ctx.msg.entities || ctx.msg.caption_entities || [];
    // const urls: string[] = [];
    //
    // for (const entity of entities) {
    //   if (entity.type === 'url') {
    //     const url = text.substring(
    //       entity.offset,
    //       entity.offset + entity.length,
    //     );
    //     urls.push(url);
    //   }
    // }

    const url = ctx.msg.link_preview_options?.url;

    await this.urlReader.read(url);

    this.logger.debug(`Received message with URLs: ${url}`);
    await ctx.reply(`Links detected: ${url}`);
  }

  private async handleText(
    ctx: Filter<Context, 'message:text'>,
  ): Promise<void> {
    // This will only trigger for text messages without URLs
    await ctx.reply('Send me photos, audio, files, or links to save them!');
  }
}
