import { Component, OnInit } from '@angular/core';
import { Leader } from '../shared/Leader';
import { LeaderService } from '../services/leader.service';
import { flyInOut, expand } from '../animations/app-animations';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },  
  animations: [flyInOut(), expand()]
})
export class AboutComponent implements OnInit {

  leaders!: Leader[] ;
  selectedLeader!: Leader;

  constructor( private leaderService: LeaderService) { }

  ngOnInit(): void {
    //before use promise
    //this.leaders = this.leaderService.getLeaders();

    //after use promise
    //this.leaderService.getLeaders().then(leaders => this.leaders=leaders);

    this.leaderService.getLeaders().subscribe(leaders => this.leaders = leaders);
  }

  onSelect(leader:Leader){
    this.selectedLeader = leader;
  }

}
