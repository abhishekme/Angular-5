import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  show: boolean = false;
  show1: boolean = false;
  constructor(private router: Router) { }

  ngOnInit() {
  }
  logOut(){
    sessionStorage.removeItem('currentUser');
    this.router.navigateByUrl('/Login');
  }
  pageLink(linkRef:any){
    if(linkRef){
      this.router.navigateByUrl(linkRef);
      setTimeout(() => {
        this.show = false;
      },1)      
    }
  }
}
