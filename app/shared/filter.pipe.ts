import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: any[], filterstr: string, propertyName: string): any {
    const result: any = [];
    if (!value || filterstr == '' || propertyName == '') {
      return value;
    }
    value.forEach((el: any) => {
      if (el[propertyName].trim().toLowerCase.include(filterstr.toLowerCase()))
        result.push(el);
    });
    return result;
  }
}
