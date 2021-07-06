import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHIES } from '../shared/dishes';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  getDishes(): Dish[] {
    return DISHIES;
  }
}