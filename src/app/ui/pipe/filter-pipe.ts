import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'searchFilter'})
export class SearchFilterPipe implements PipeTransform {
    transform(value: any, search: string): any {
         if  (!search) {return value; }
         const solution = value.filter(v => {
            if ( !v ) {return; }
            return  v.relatedPerson.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        });
         return solution;
    }
}
