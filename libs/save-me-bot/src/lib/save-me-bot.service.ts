import { LlmService } from '@libs/shared/langgraph';
import {
  Inject,
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { Bot, CommandContext, Context, Filter } from 'grammy';
import { MODULE_OPTIONS } from './constants';
import { SaveMeBotModuleOptions } from './save-me-bot.module';

@Injectable()
export class SaveMeBotService implements OnModuleInit, OnModuleDestroy {
  @Inject(MODULE_OPTIONS) private readonly options: SaveMeBotModuleOptions;
  @Inject() private readonly llm: LlmService;

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
    this.bot.on('message:photo', (ctx) => this.handlePhoto(ctx));
    this.bot.on('message:voice', (ctx) => this.handleVoice(ctx));
    this.bot.on('message:audio', (ctx) => this.handleAudio(ctx));
    this.bot.on('message:document', (ctx) => this.handleDocument(ctx));
    this.bot.on('message:video', (ctx) => this.handleVideo(ctx));
    this.bot.on('message:entities:url', (ctx) => this.handleUrl(ctx));
    this.bot.on('message:entities:text_link', (ctx) =>
      this.handleTextLink(ctx),
    );
    this.bot.on('message:text', (ctx) => this.handleText(ctx));
  }

  private async handleStartCommand(
    ctx: CommandContext<Context>,
  ): Promise<void> {
    await ctx.reply(
      'Welcome! I am Save Me Bot. Send me photos, audio, files, or links and I will save them for you!',
    );
  }

  private async handlePhoto(
    ctx: Filter<Context, 'message:photo'>,
  ): Promise<void> {
    const photo = ctx.msg.photo;

    // Get the highest resolution photo (last in the array)
    const highestResPhoto = photo[photo.length - 1];
    const fileId = highestResPhoto.file_id;

    this.logger.debug(`Received photo with file_id: ${fileId}`);
    await ctx.reply(`Photo received! File ID: ${fileId}`);
  }

  private async handleVoice(
    ctx: Filter<Context, 'message:voice'>,
  ): Promise<void> {
    const voice = ctx.msg.voice;

    const fileId = voice.file_id;
    const duration = voice.duration;

    this.logger.debug(
      `Received voice message with file_id: ${fileId}, duration: ${duration}s`,
    );
    await ctx.reply(`Voice message received! Duration: ${duration} seconds`);
  }

  private async handleAudio(
    ctx: Filter<Context, 'message:audio'>,
  ): Promise<void> {
    const audio = ctx.msg.audio;

    const title = audio.title || 'Untitled';
    const performer = audio.performer || 'Unknown';

    this.logger.debug(
      `Received audio file: ${title} by ${performer}, file_id: ${audio.file_id}`,
    );
    await ctx.reply(`Audio received: ${title} by ${performer}`);
  }

  private async handleDocument(
    ctx: Filter<Context, 'message:document'>,
  ): Promise<void> {
    const document = ctx.msg.document;

    const fileName = document.file_name || 'Unknown file';
    const fileSize = document.file_size;

    this.logger.debug(
      `Received document: ${fileName}, size: ${fileSize} bytes, file_id: ${document.file_id}`,
    );
    await ctx.reply(`Document received: ${fileName}`);
  }

  private async handleVideo(
    ctx: Filter<Context, 'message:video'>,
  ): Promise<void> {
    const video = ctx.msg.video;

    const duration = video.duration;
    const width = video.width;
    const height = video.height;

    this.logger.debug(
      `Received video: ${width}x${height}, duration: ${duration}s, file_id: ${video.file_id}`,
    );
    await ctx.reply(
      `Video received! Resolution: ${width}x${height}, Duration: ${duration}s`,
    );
  }

  private async handleUrl(
    ctx: Filter<Context, 'message:entities:url'>,
  ): Promise<void> {
    const text = ctx.msg.text || ctx.msg.caption || '';
    const entities = ctx.msg.entities || ctx.msg.caption_entities || [];
    const urls: string[] = [];

    for (const entity of entities) {
      if (entity.type === 'url') {
        const url = text.substring(
          entity.offset,
          entity.offset + entity.length,
        );
        urls.push(url);
      }
    }

    this.logger.debug(`Received message with URLs: ${urls.join(', ')}`);

    const response = await this.llm.invoke('Hi there');
    console.log(response);

    await ctx.reply(`Links detected: ${urls.join(', ')}`);
  }

  private async handleTextLink(
    ctx: Filter<Context, 'message:entities:text_link'>,
  ): Promise<void> {
    const entities = ctx.msg.entities || ctx.msg.caption_entities || [];
    const urls: string[] = [];

    for (const entity of entities) {
      if (entity.type === 'text_link' && entity.url) {
        urls.push(entity.url);
      }
    }

    this.logger.debug(`Received message with text links: ${urls.join(', ')}`);
    await ctx.reply(`Text links detected: ${urls.join(', ')}`);
  }

  private async handleText(
    ctx: Filter<Context, 'message:text'>,
  ): Promise<void> {
    // This will only trigger for text messages without URLs
    await ctx.reply('Send me photos, audio, files, or links to save them!');
  }
}
