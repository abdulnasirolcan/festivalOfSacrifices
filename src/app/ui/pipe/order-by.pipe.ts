import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'orderBy', pure: false })
export class OrderBy implements PipeTransform {
  static _orderByComparator(a: any, b: any): number {
    if (isNaN(parseFloat(a)) || !isFinite(a) || (isNaN(parseFloat(b)) || !isFinite(b))) {
      // Isn't a number so lowercase the string to properly compare
      if (a.toLowerCase() < b.toLowerCase()) {
        return -1;
      }
      if (a.toLowerCase() > b.toLowerCase()) {
        return 1;
      }
    } else {
      // Parse strings as numbers to compare properly
      if (parseFloat(a) < parseFloat(b)) {
        return -1;
      }
      if (parseFloat(a) > parseFloat(b)) {
        return 1;
      }
    }

    return 0; // equal each other
  }

  transform(input: any, [config = '+']): any {
    if (!Array.isArray(input)) {
      return input;
    }

    if (!Array.isArray(config) || (Array.isArray(config) && config.length == 1)) {
      // tslint:disable-next-line: prefer-const
      let propertyToCheck: string = !Array.isArray(config) ? config : config[0];
      // tslint:disable-next-line: triple-equals
      const desc = propertyToCheck.substr(0, 1) == '-';

      // Basic array
      // tslint:disable-next-line: triple-equals
      if (!propertyToCheck || propertyToCheck == '-' || propertyToCheck == '+') {
        return !desc ? input.sort() : input.sort().reverse();
      } else {
        // tslint:disable-next-line: prefer-const
        let property: string =
          // tslint:disable-next-line: triple-equals
          propertyToCheck.substr(0, 1) == '+' || propertyToCheck.substr(0, 1) == '-'
            ? propertyToCheck.substr(1)
            : propertyToCheck;

        // tslint:disable-next-line: only-arrow-functions
        return input.sort(function(a: any, b: any) {
          return !desc
            ? OrderBy._orderByComparator(a[property], b[property])
            : -OrderBy._orderByComparator(a[property], b[property]);
        });
      }
    } else {
      // Loop over property of the array in order and sort
      // tslint:disable-next-line: only-arrow-functions
      return input.sort(function(a: any, b: any) {
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < config.length; i++) {
          // tslint:disable-next-line: triple-equals
          const desc = config[i].substr(0, 1) == '-';
          const property =
            // tslint:disable-next-line: triple-equals
            config[i].substr(0, 1) == '+' || config[i].substr(0, 1) == '-' ? config[i].substr(1) : config[i];

          // tslint:disable-next-line: prefer-const
          let comparison = !desc
            ? OrderBy._orderByComparator(a[property], b[property])
            : -OrderBy._orderByComparator(a[property], b[property]);

          // Don't return 0 yet in case of needing to sort by next property
          // tslint:disable-next-line: triple-equals
          if (comparison != 0) {
            return comparison;
          }
        }

        return 0; // equal each other
      });
    }
  }
}
