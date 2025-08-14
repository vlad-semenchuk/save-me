import { Controller, Get } from '@nestjs/common';

@Controller()
export class RootController {
  @Get('/')
  root() {
    return 'SaveMe bot says: Hello World!';
  }
}
