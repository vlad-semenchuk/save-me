import { Injectable } from '@nestjs/common';

@Injectable()
export class HelloWorldService {
  getHello(): string {
    return 'Hello World from hello-world app!';
  }

  getGreeting(): string {
    return 'Welcome to the hello-world NestJS application!';
  }
}