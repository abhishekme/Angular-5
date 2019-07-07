import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  theDate:any;
  
  constructor() { }

  ngOnInit() {
    this.theDate  =  new Date();
  }
}
