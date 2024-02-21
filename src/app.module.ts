import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
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
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        return {
          type: 'mysql',
          host: configService.get('MYSQL_HOST'),
          port: configService.get('MYSQL_PORT'),
          username: configService.get('MYSQL_USERNAME'),
          password: configService.get('MYSQL_PASSWORD'),
          database: configService.get('MYSQL_DATABASE'),
          // 是否自动创建数据库表结构
          synchronize: true,
          // 打印日志级别
          logging: ['error', 'warn'],
          // 线程池大小
          poolSize: 10,
          // 数据库连接驱动程序
          connectorPackage: 'mysql2',
          // 自动加载实体类
          autoLoadEntities: true,
        };
      },
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
