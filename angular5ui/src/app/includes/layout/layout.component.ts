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
        let currentUser;
        currentUser  = JSON.parse(sessionStorage.getItem('currentUser'));
        if (event instanceof NavigationStart) {
          if (event['url'] == '/Login') {
            this.showHead = false;
            this.loginSec  = true;
          }else if(event['url'] == '/'){
            if(currentUser != null)
            {
              this.router.navigate(['/Home']);
            }else{
              this.router.navigate(['/Login']);
            }
          } else {
            this.showHead = true;
          }
        }else{
          //Do the needful
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
    let currentUser = sessionStorage.getItem('currentUser');
    if(currentUser != null)
    {
      this.router.navigate(['/Home']);
    }else{
      this.loginSec  = true;
      this.router.navigate(['/Login']);
    }
  }
}
