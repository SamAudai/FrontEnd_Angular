import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';


@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }

  /*//return all promotion without promise
  getPromotions(): Promotion[] {
    return PROMOTIONS;
  }*/

  //return all promotion with promise
  getPromotions(): Promise<Promotion[]> {
    //return Promise.resolve(PROMOTIONS);

    return new Promise(resolve=> {
      // Simulate server latency with 2 second delay
        setTimeout(() => resolve(PROMOTIONS), 2000)
      });
  }
  

  /*//return specific promotion in array by id without promise
  getPromotion(id: string): Promotion {
    return PROMOTIONS.filter((promo) => (promo.id === id))[0];
  }*/

  //return specific promotion in array by id with promise
  getPromotion(id: string): Promise<Promotion> {
    //return Promise.resolve(PROMOTIONS.filter((promo) => (promo.id === id))[0]);

    return new Promise(resolve=> {
      // Simulate server latency with 2 second delay
        setTimeout(() => resolve(PROMOTIONS.filter((promotion) => (promotion.id === id))[0]), 2000);
    });
  }

  /*//return specific leader in array by featured without promise
  getFeaturedPromotion(): Promotion {
    return PROMOTIONS.filter((promotion) => promotion.featured)[0];
  }*/

  //return specific leader in array by featured with promise
  getFeaturedPromotion(): Promise<Promotion> {
    //return Promise.resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]);

    return  new Promise(resolve=> {
      // Simulate server latency with 2 second delay
        setTimeout(() => resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]), 2000);
    });
  }

}
