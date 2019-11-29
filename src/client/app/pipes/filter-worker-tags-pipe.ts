import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filterTags' })
export class FilterTags implements PipeTransform {
    transform(val: string): string {
        let newValue = val.replace(/,/g, '\n');
        return newValue;
    }
}