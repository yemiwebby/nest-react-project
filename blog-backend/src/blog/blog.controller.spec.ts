import { Test, TestingModule } from '@nestjs/testing';
import { BlogController } from './blog.controller';

describe('Blog Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [BlogController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: BlogController = module.get<BlogController>(BlogController);
    expect(controller).toBeDefined();
  });
});
