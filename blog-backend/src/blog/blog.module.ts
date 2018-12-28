import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogSchema } from './schemas/blog.schema';
import { AuthenticationMiddleware } from '../common/authentication.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Post', schema: BlogSchema }]),
  ],
  controllers: [BlogController],
  providers: [BlogService]
})
export class BlogModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer.apply(AuthenticationMiddleware).forRoutes(
      { method: RequestMethod.POST, path: '/blog/post' },
      { method: RequestMethod.PUT, path: '/blog/edit' },
      { method: RequestMethod.DELETE, path: '/blog/delete' }
    )
  }
}
