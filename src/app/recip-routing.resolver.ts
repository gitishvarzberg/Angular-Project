import { ResolveFn } from '@angular/router';

export const recipRoutingResolver: ResolveFn<boolean> = (route, state) => {
  return true;
};
