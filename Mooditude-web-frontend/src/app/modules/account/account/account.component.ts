import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit, OnDestroy {

  body = document.body;


  constructor() { }

  ngOnInit(): void {
    this.body.classList.add('wave-background');
  }


  ngOnDestroy() {
    this.body.classList.remove('wave-background')
  }

}
