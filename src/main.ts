import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 全局管道：参数校验
  // app.useGlobalPipes(new ValidationPipe());
  // 全局异常过滤器
  // app.useGlobalFilters(new HttpExceptionFilter());
  // 全局响应拦截器：返回数据格式化
  // app.useGlobalInterceptors(new ResponseInterceptor());

  const configService = app.get(ConfigService);
  await app.listen(configService.get('NEST_SERVER_PORT'));
}
bootstrap();
