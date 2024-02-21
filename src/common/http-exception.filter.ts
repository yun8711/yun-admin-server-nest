/**
 * @file 全局异常过滤器
 */

import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  // exception 当前正在处理的异常对象 host 是上下文对象，即res、req、next的集合
  // catch(exception: HttpException, host: ArgumentsHost) {
  catch(exception: any, host: ArgumentsHost) {
    // console.log('进入全局异常过滤器.....', exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // 如果是自定义的异常，就返回自定义的异常状态码，否则就是内置HTTP 异常类，就返回内置的异常状态码
    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException ? exception.getResponse() : 'Internal server error';

    const msgLog = {
      code: status,
      message,
      timestamp: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      path: request.url,
      method: request.method,
    };

    response.status(status).json(msgLog);
  }
}
