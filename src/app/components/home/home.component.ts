import { Component, OnInit } from '@angular/core';
import { trigger } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.scss' ],
  animations:[
    trigger('fade',[
      
    ]),
  ]
})
export class HomeComponent implements OnInit {

  constructor() { }
  loggedIn = false;
  
  ngOnInit() {
  }

}
