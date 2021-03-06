import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../shared/Leader';
import { LeaderService } from '../services/leader.service';
import { flyInOut, expand } from '../animations/app-animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },  
  animations: [flyInOut(), expand()]
})
export class HomeComponent implements OnInit {

  dish!: Dish;
  promotion!: Promotion;
  leader!: Leader;
  errMess!:string;

  constructor(private dishservice: DishService, 
    private promotionservice: PromotionService,
    private leaderservice: LeaderService, 
    @Inject('BaseURL') public BaseURL: any) { }

  ngOnInit(): void {
    //before use promise
    //this.dish = this.dishservice.getFeaturedDish();
    //this.promotion = this.promotionservice.getFeaturedPromotion();
    //this.leader = this.leaderservice.getFeaturedLeader();

    //after use promise
    //this.dishservice.getFeaturedDish().then(dish => this.dish=dish);
    //this.promotionservice.getFeaturedPromotion().then(promotion => this.promotion=promotion);
    //this.leaderservice.getFeaturedLeader().then(leader => this.leader=leader);

    this.dishservice.getFeaturedDish().subscribe(dish => this.dish=dish, 
      errMess => this.errMess = <any>errMess);
    this.promotionservice.getFeaturedPromotion().subscribe(promotion => this.promotion=promotion,
      errMess => this.errMess = <any>errMess);
    this.leaderservice.getFeaturedLeader().subscribe(leader => this.leader=leader,
      errMess => this.errMess = <any>errMess);
  }

}
