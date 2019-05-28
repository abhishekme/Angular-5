import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart, NavigationEnd, NavigationCancel } from '@angular/router';
import { AuthService as AuthServ } from '../../services/auth.service.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  showHead: boolean = false;
  pageLoding: boolean = false;
  navigationSubscription:any = [];
  constructor(private router: Router, private route: ActivatedRoute) {
      router.events.forEach((event) => {
        if (event instanceof NavigationStart) {
          console.log(event);
          if (event['url'] == '/Login') {
            this.showHead = false;
          }else if(event['url'] == '/'){
            top.location.href = '/Login';
          } else {
            this.showHead = true;
          }
        }
      });
      //this.pageLoding = true;
      this.router.events
        .subscribe((event) => {
            if(event instanceof NavigationStart) {
               /*setTimeout(function(){
                this.pageLoding = true;
               },1500);*/           
               this.pageLoding = true;
            }
            else if (
                event instanceof NavigationEnd || 
                event instanceof NavigationCancel
                ) {
                  this.pageLoding = false;
                  /*setTimeout(function(){
                    this.pageLoding = false;
                   },500); */
                
            }
      });

      //Route Subscriptions
      /*this.navigationSubscription = this.router.events.subscribe((e: any) => {
        // If it is a NavigationEnd event re-initalise the component
        if (e instanceof NavigationEnd) {
          alert('navigation end calling...');
          this.initialiseInvites(e);
        }
      });*/
      this.route.params.subscribe(params => {
        //this.param = params['yourParam'];
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    });

  }
  initialiseInvites(event){
     console.log('Nav Event:: ',event); 
     if(event){
       if(event.urlAfterRedirects != null){
        alert('redirecting...' + event.urlAfterRedirects);
       this.router.navigate(event.urlAfterRedirects);
       }
       
     }
  }
  ngOnDestroy() {
    // avoid memory leaks here by cleaning up after ourselves. If we  
    // don't then we will continue to run our initialiseInvites()   
    // method on every navigationEnd event.
    if (this.navigationSubscription) {  
       this.navigationSubscription.unsubscribe();
    }
  }
  ngAfterViewInit() {
      //Router change application loader
      
  }
  public userData:any;
  private logData:any = [];
  private loginSec:boolean = false;
  ngOnInit(){
    
    this.userData   = sessionStorage.getItem('currentUser');
    console.log(this.userData);
    if(this.userData === null){
      this.loginSec  = true;
    }
  }
}
