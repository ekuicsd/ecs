import { Pipe, PipeTransform } from '@angular/core';
import { Books } from '../models/books.model';

@Pipe({
    name: 'search'
})

export class SearchPipe implements PipeTransform {
    transform(value: Books[], search: string): any {
        if (search == '') {
            return value;
        }
        return value.filter(ele => {
            if ((ele.title).toString().toLowerCase().includes(search.toLowerCase())  || (ele.authors).toString().toLowerCase().includes(search.toLowerCase())) {
                return ele;
            }
        })
    }
}