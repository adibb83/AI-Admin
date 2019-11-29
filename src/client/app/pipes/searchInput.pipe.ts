import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'searchInputFilter',
    pure: false
})


export class SearchInputFilterPipe implements PipeTransform {
   
     arr: any[] = [];
    transform(val: any[], q: string, key: string): any {
        // ignore pipe if query is empty
        if (q.trim().length < 1) return val;

        const txt = document.createElement("textarea");

        this.arr.length = 0;
        let arr = val.filter((item: any) => {
            txt.innerHTML = item[key];
            return new RegExp(q.toLowerCase()).test(item[key].toLowerCase())
        });
        this.arr.push(...arr);
        return this.arr;
    }

     //  arr: any[] = [];
    // transform(val: any[], q: string): any {
    //     // ignore pipe if query is empty
    //     if (q.trim().length < 1) return val;

    //     const txt = document.createElement("textarea");

    //     this.arr.length = 0;
    //     let arr = val.filter((item: any) => {
    //         const expression = item['ExpressionValues'].reduce((text: string, value: any) => text += value['Text'] + ' ', '');
    //         txt.innerHTML = expression;
    //         return new RegExp(q.toLowerCase()).test(txt.value.toLowerCase());
    //     });
    //     this.arr.push(...arr);
    //     return this.arr;
    // }
}

 