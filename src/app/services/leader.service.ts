import { Injectable } from '@angular/core';
import { Leader } from '../shared/Leader';
import { LEADERS } from '../shared/Leaders';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHttpMsgService } from './process-http-msg.service';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient, private processHttpMsgService: ProcessHttpMsgService) { }

  /*//return all leader without promise
  getLeaders(): Leader[] {
    return LEADERS;
  }*/

  //return all leader with promise
  getLeaders(): Observable<Leader[]> {
    //return Promise.resolve(LEADERS);

    /*return new Promise(resolve=> {
      // Simulate server latency with 2 second delay
        setTimeout(() => resolve(LEADERS), 2000)
      });*/

      //return of(LEADERS).pipe(delay(2000));

      return this.http.get<Leader[]>(baseURL + 'leaders')
             .pipe(catchError(this.processHttpMsgService.handleError));
  }

  /*//return specific leader in array by id without promise
  getLeader(id: string): Leader {
    return LEADERS.filter((lead) => (lead.id === id))[0];
  }*/

  //return specific leader in array by id with promise
  getLeader(id: string): Observable<Leader> {
    //return Promise.resolve(LEADERS.filter((lead) => (lead.id === id))[0]);

    /*return new Promise(resolve=> {
      // Simulate server latency with 2 second delay
        setTimeout(() => resolve(LEADERS.filter((leader) => (leader.id === id))[0]), 2000);
    });*/

    //return of(LEADERS.filter((leader) => (leader.id === id))[0]).pipe(delay(2000));

    return this.http.get<Leader>(baseURL + 'leaders/' + id)
          .pipe(catchError(this.processHttpMsgService.handleError));
  }

  /*//return specific leader in array by featured without promise
  getFeaturedLeader(): Leader {
    return LEADERS.filter((leader) => leader.featured)[0];
  }*/

  //return specific leader in array by featured with promise
  getFeaturedLeader(): Observable<Leader> {
    //return Promise.resolve(LEADERS.filter((leader) => leader.featured)[0]);

    /*return  new Promise(resolve=> {
      // Simulate server latency with 2 second delay
        setTimeout(() => resolve(LEADERS.filter((leader) => leader.featured)[0]), 2000);
    });*/

    //return of(LEADERS.filter((leader) => leader.featured)[0]).pipe(delay(2000));

    return this.http.get<Leader[]>(baseURL + 'leaders?featured=true').pipe(map(leaders => leaders[0]))
          .pipe(catchError(this.processHttpMsgService.handleError));
  }
}
