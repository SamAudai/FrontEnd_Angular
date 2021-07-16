import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHIES } from '../shared/dishes';

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
  getDishes(): Promise<Dish[]> {
    return Promise.resolve(DISHIES);
  }
  
  /*//return specific dish in array by id without promise
  getDish(id:string): Dish{
    return DISHIES.filter((dish)=>(dish.id===id))[0];
  }*/

  //return specific dish in array by id with promise
  getDish(id:string): Promise<Dish>{
    return Promise.resolve(DISHIES.filter((dish)=>(dish.id===id))[0]);
  }
  
  /*//return specific dish in array by featured without promise
  getFeaturedDish(): Dish{
    return DISHIES.filter((dish) => dish.featured)[0];
  }*/

  //return specific dish in array by featured with promise
  getFeaturedDish(): Promise<Dish>{
    return Promise.resolve(DISHIES.filter((dish) => dish.featured)[0]);
  }
}
