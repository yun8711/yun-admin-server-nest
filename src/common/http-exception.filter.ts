/**
 * @file 全局异常过滤器
 */

import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  // exception 当前正在处理的异常对象 host 是上下文对象，即res、req、next的集合
  catch(exception: HttpException, host: ArgumentsHost) {
    // console.log('进入全局异常过滤器.....');
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const res = exception.getResponse() as { message: string[] };
    // 如果是自定义的异常，就返回自定义的异常状态码，否则就是内置HTTP 异常类，就返回内置的异常状态码
    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const msgLog = {
      code: status,
      message: exception.message,
      data: res?.message || exception.message,
      timestamp: new Date().toLocaleString(),
      path: request.url,
      method: request.method,
    };

    response.status(status).json(msgLog);
  }
}
