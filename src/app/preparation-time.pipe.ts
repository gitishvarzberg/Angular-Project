import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'preparationTime',
  standalone: true
})
export class PreparationTimePipe implements PipeTransform {

  transform(durationInMinutes: number): string {
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;
  
    if (hours === 0) {
      return ` דקות ${minutes}`;
    } else if (minutes === 0) {
      return `${hours} שעות`;
    } else {
      return `${hours} שעות ו-${minutes} דקות`;
    }

}


}
