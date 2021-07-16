import { Injectable } from '@angular/core';
import { Leader } from '../shared/Leader';
import { LEADERS } from '../shared/Leaders';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  /*//return all leader without promise
  getLeaders(): Leader[] {
    return LEADERS;
  }*/

  //return all leader with promise
  getLeaders(): Promise<Leader[]> {
    //return Promise.resolve(LEADERS);

    return new Promise(resolve=> {
      // Simulate server latency with 2 second delay
        setTimeout(() => resolve(LEADERS), 2000)
      });
  }

  /*//return specific leader in array by id without promise
  getLeader(id: string): Leader {
    return LEADERS.filter((lead) => (lead.id === id))[0];
  }*/

  //return specific leader in array by id with promise
  getLeader(id: string): Promise<Leader> {
    //return Promise.resolve(LEADERS.filter((lead) => (lead.id === id))[0]);

    return new Promise(resolve=> {
      // Simulate server latency with 2 second delay
        setTimeout(() => resolve(LEADERS.filter((leader) => (leader.id === id))[0]), 2000);
    });
  }

  /*//return specific leader in array by featured without promise
  getFeaturedLeader(): Leader {
    return LEADERS.filter((leader) => leader.featured)[0];
  }*/

  //return specific leader in array by featured with promise
  getFeaturedLeader(): Promise<Leader> {
    //return Promise.resolve(LEADERS.filter((leader) => leader.featured)[0]);

    return  new Promise(resolve=> {
      // Simulate server latency with 2 second delay
        setTimeout(() => resolve(LEADERS.filter((leader) => leader.featured)[0]), 2000);
    });
  }
}
