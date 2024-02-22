import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // swagger相关配置
  const swaggerConfig = new DocumentBuilder()
    // 文档标题
    .setTitle('yun-admin')
    // 文档介绍，副标题
    .setDescription('yun-admin后台管理系统')
    // 文档版本
    .setVersion('1.0')
    // 鉴权
    // .addBearerAuth({
    //   type: 'http',
    //   description: '基于 jwt 的认证',
    //   name: 'bearer',
    // })
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('doc', app, document);

  const configService = app.get(ConfigService);
  await app.listen(configService.get('NEST_SERVER_PORT'));
}
bootstrap();
