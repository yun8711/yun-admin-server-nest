/**
 * 全局响应拦截器，统一返回格式
 */

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  RequestTimeoutException,
} from '@nestjs/common';
import { catchError, Observable, throwError, timeout, TimeoutError } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> {
    // console.log('进入全局响应拦截器.....');
    // 解析ExecutionContext的数据内容获取请求体
    // const request = context.switchToHttp().getRequest();
    // 数据遍历与转变
    return next.handle().pipe(
      timeout(1000),
      // catchError用于处理错误
      catchError((err) => {
        if (err instanceof TimeoutError) {
          return throwError(() => new RequestTimeoutException());
        }
        return throwError(() => err);
      }),
      // 正常返回数据
      map((data) => {
        return {
          code: 200,
          message: 'success',
          data,
        };
      })
    );
  }
}
