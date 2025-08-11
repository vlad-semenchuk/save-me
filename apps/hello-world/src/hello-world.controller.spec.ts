import { Test, TestingModule } from '@nestjs/testing';
import { HelloWorldController } from './hello-world.controller';
import { HelloWorldService } from './hello-world.service';

describe('HelloWorldController', () => {
  let helloWorldController: HelloWorldController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HelloWorldController],
      providers: [HelloWorldService],
    }).compile();

    helloWorldController = app.get<HelloWorldController>(HelloWorldController);
  });

  describe('root', () => {
    it('should return "Hello World from hello-world app!"', () => {
      expect(helloWorldController.getHello()).toBe('Hello World from hello-world app!');
    });
  });
});