import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHIES } from '../shared/dishes';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }
  
  //return all dishies
  getDishes(): Dish[] {
    return DISHIES;
  }
  
  //return specific dish in array by id
  getDish(id:string): Dish{
    return DISHIES.filter((dish)=>(dish.id===id))[0];
  }
  
  //return specific dish in array by featured
  getFeaturedDish(): Dish{
    return DISHIES.filter((dish) => dish.featured)[0];
  }
}
