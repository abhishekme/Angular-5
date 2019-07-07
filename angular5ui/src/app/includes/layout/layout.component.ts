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
        console.log(event, " ==> ",currentUser);
        if (event['url'] == '/Login' && currentUser == null) {
            this.loginSec  = true;
            this.showHead = false;
        }else if (event['url'] !== '/Login' && currentUser != null) {
            this.showHead = true;
            this.loginSec  = false;
        }
        /*else if(event['url'] == '/' || (event['urlAfterRedirects'] != undefined && event['urlAfterRedirects']=='/Login')){
          //this.router.navigate(['/Login']);
        }*/
      });
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
    /*if(currentUser != null)
    {
      this.router.navigate(['/Home']);
    }else{
      this.loginSec  = true;
      this.router.navigate(['/Login']);
    }*/
  }
}
