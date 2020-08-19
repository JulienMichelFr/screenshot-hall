import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'authError',
})
export class AuthErrorPipe implements PipeTransform {
  public transform(
    error: Error & { statusCode: number; message: string | string[] }
  ): string {
    if (error.statusCode >= 500) {
      return 'Something went wrong on our side. Retry later.';
    }
    if (Array.isArray(error.message)) {
      return error.message.join('\n');
    }
    return error.message;
  }
}
