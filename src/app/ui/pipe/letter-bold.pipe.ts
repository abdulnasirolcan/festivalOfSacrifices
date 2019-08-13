import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'letterBold'})
export class LetterBoldPipe implements PipeTransform {
    transform(value: any, search: any): any {
        if (!search) { return value; }
        const searchLength = search.length;
        let holder = value.split('');
        let indexAdder = 0;
        let indexs = this.locations(search.toLowerCase(), value.toLowerCase() );
        indexs = indexs.map( (x) => {
          const solution =  x + indexAdder;
          indexAdder += 2;
          return solution;
       });
        indexs.forEach( (i) => {
            holder.splice(i, 0 , '<span class = \'bold\'>');
            holder.splice(i + searchLength + 1, 0,  '</span>');
       });
        return holder.join('');
    }

    locations(substring, searchValue) {
        // tslint:disable-next-line: one-variable-per-declaration
        let indexs = [], i = -1;
        // tslint:disable-next-line: no-conditional-assignment
        while ((i = searchValue.indexOf(substring, i + 1 )) >= 0) {
             indexs.push(i);
        }
        return indexs;
    }
}
