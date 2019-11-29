import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'extractModelErrors' })
export class ExtractModelErrors implements PipeTransform {
  transform(val: any, args?: any): any {
    return Object.keys(val).reduce((previous: any[], key: string) => [...previous, ...val[key]], []);
  }
}