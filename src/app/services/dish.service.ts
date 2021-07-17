import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHIES } from '../shared/dishes';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }
  
  /*//return all dishies without promise
  getDishes(): Dish[] {
    return DISHIES;
  }*/

  //return all dishies with promise
  getDishes(): Observable<Dish[]> {
    //return Promise.resolve(DISHIES);
    
    /*return new Promise(resolve=> {
      // Simulate server latency with 2 second delay
        setTimeout(() => resolve(DISHIES), 2000)
      });*/

      return of(DISHIES).pipe(delay(2000));
  }
  
  /*//return specific dish in array by id without promise
  getDish(id:string): Dish{
    return DISHIES.filter((dish)=>(dish.id===id))[0];
  }*/

  //return specific dish in array by id with promise
  getDish(id:string): Observable<Dish>{
    //return Promise.resolve(DISHIES.filter((dish)=>(dish.id===id))[0]);

    /*return new Promise(resolve=> {
      // Simulate server latency with 2 second delay
        setTimeout(() => resolve(DISHIES.filter((dish) => (dish.id === id))[0]), 2000);
    });*/

    return of(DISHIES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000));
  }
  
  /*//return specific dish in array by featured without promise
  getFeaturedDish(): Dish{
    return DISHIES.filter((dish) => dish.featured)[0];
  }*/

  //return specific dish in array by featured with promise
  getFeaturedDish(): Observable<Dish>{
    //return Promise.resolve(DISHIES.filter((dish) => dish.featured)[0]);

    /*return  new Promise(resolve=> {
      // Simulate server latency with 2 second delay
        setTimeout(() => resolve(DISHIES.filter((dish) => dish.featured)[0]), 2000);
    });*/

    return of(DISHIES.filter((dish) => dish.featured)[0]).pipe(delay(2000));
  }

  getDishIds(): Observable<string[] | any> {
    return of(DISHIES.map(dish => dish.id ));
  }

}
