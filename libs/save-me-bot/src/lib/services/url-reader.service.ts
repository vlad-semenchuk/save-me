import * as ytdl from '@distube/ytdl-core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UrlReaderService {
  async read(link?: string) {
    if (!link) {
      throw new Error('No link provided');
    }

    try {
      if (ytdl.validateURL(link)) {
        console.log('Link: ', link);
        const info = await ytdl.getInfo(link);
        const videoDetails = info.videoDetails;

        const result = {
          title: videoDetails.title,
          channel: videoDetails.author.name,
          duration: `${videoDetails.lengthSeconds}s`,
          views: videoDetails.viewCount,
          description: videoDetails.description?.substring(0, 200) + '...',
        };

        console.log('YouTube video details:', JSON.stringify(result, null, 2));
        return result;
      } else {
        throw new Error('Invalid YouTube URL');
      }
    } catch (error) {
      console.error('YouTube fetch error:', error);
      throw new Error(
        `Error reading YouTube video: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  }
}
