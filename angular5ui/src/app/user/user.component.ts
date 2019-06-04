import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { PagerService } from '../services/paging/pager.service';
import { User } from '../models/user/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [PagerService]
})
export class UserComponent {
  public listData: any = [];
  public totalData: any;
  public adminLimit: number;
  public pageNum: number = 0;
  public totalPages: number;
  public limitNum: number = 5;
  public srchKey: any;
  public totalRec: any;
  public sortByField: string;
  public sortByDir: string;

  public pagedItems: any;
  public pagedGItems: any;
  public messageShow: any;
  userModel: User;
  public tableHeader:any = [];

  private subscriptions: Subscription[] = [];
  public displayedColumns = ['first_name', 'last_name'];

  constructor(private service: DatabaseService, private objPager: PagerService,) {

    this.userModel = new User();
    //this.path   = new Path();
    // this._alertMesg = new AlertMessages();
    //this.imagePath  = this.path.API_IMAGE_PATH;
    this.pageNum = 1;
    this.limitNum = 3;
    //this.sortKey = 'first_name';
    this.sortByField = 'first_name';
    this.sortByDir = 'asc';
    this.pagedItems   = [];
    this.pagedGItems = [];
    //this.messageStatus = false;

   }
   ngOnDestroy() {
		this.subscriptions.forEach(s => s.unsubscribe());
    }
  ngOnInit() {

    this.getTotalData(this.srchKey);
    this.getListData(this.pageNum, this.limitNum, this.srchKey, '');

    this.tableHeader.push('Lession');
    this.tableHeader.push('Lession');
    this.tableHeader.push('Lession');
  }

  getTotalData(srchKey){

      this.subscriptions.push(this.service.adminGetUserData(srchKey,this.limitNum).subscribe(
              data => {
                let totalRec = data;
                if(totalRec != undefined){
                  if(totalRec){
                      let totalData   = totalRec.totalRecord;
                      this.totalRec   = totalData;
                      let totalPage   = Math.ceil(totalData / this.limitNum);
                      this.totalPages = totalPage;

                      this.createPages(this.totalPages);
                      //Get Pager services
                      let pagesItems    = this.objPager.getPagesArray(this.totalPages, 2, 1);
                      this.pagedGItems   = pagesItems;
                      console.log("paged Data: ", this.pagedGItems);
                  }
                }
              }
        ));
  }

  createRange(number){
    var items: number[] = [];
    for(var i = 1; i <= number; i++){
       items.push(i);
    }
    return items;
  }

  createPages(totalPages){
    let items = [];
    for (var i = 1; i <= totalPages; i++) {
       this.pagedItems.push({val:i});
    }
  }

  getListData(pageNum:number=0, limitNum:number=this.limitNum, srchKey:string='', queryType:string){
    //, sortByField:string='', sortByDir=''
    this.pageNum = pageNum;
    //this.sortByDir = (sortByDir == 'asc') ? 'desc' : 'asc';
    let thisDir = this.sortByDir;
    //this.listData = '';
    //alert(pageNum);
        this.subscriptions.push(
          this.service.adminUserList(pageNum, limitNum, srchKey, queryType, this.sortByField, this.sortByDir).subscribe(
              data => {
                this.listData = data.record;

                console.log('#### user list data #######');
                console.log(data);

              //Get Pager services
              let pagesItems    = this.objPager.getPagesArray(this.totalPages, 2, pageNum);
              this.pagedGItems   = pagesItems;
              }
        ));
  }

}
