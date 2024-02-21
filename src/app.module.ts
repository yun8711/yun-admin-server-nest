import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpExceptionFilter } from './common/http-exception.filter';
import { ResponseInterceptor } from './common/response.interceptor';
import { RedisModule } from './redis/redis.module';
import { TestModule } from './test/test.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'src/.env',
    }),
    RedisModule,
    TestModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // 全局管道：参数校验
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    // 全局响应拦截器：返回数据格式化
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    // 全局异常过滤器
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
