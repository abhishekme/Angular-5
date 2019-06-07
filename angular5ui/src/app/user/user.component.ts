import { Component, OnInit, ViewChild } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { PagerService } from '../services/paging/pager.service';
import { User } from '../models/user/user';
import { Subscription } from 'rxjs';
import { AgGridAngular } from 'ag-grid-angular';
import { HttpClient } from '@angular/common/http';
import { DBOperation } from '../shared/enum';

import { UserFilterPipe } from '../utilities/filter/user.pipe';

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
  public columnDefs:any; public rowData:any;

  @ViewChild('agGrid') agGrid: AgGridAngular;

    msg: string;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    isREADONLY: boolean = false;
    exportFileName: string = "Users_";
    users:any = [];
    //Grid Vars start
    columns: any[] = [
        {
            display: 'First Name',
            variable: 'FirstName',
            filter: 'text',
        },
        {
            display: 'Last Name',
            variable: 'LastName',
            filter: 'text'
        },
        {
            display: 'Gender',
            variable: 'Gender',
            filter: 'text'
        },
        {
            display: 'Date of Birth',
            variable: 'DOB',
            filter: 'date'
        }
    ];
    sorting: any = {
        column: 'FirstName',
        descending: false
    };
    /**/
    hdrbtns: any[] = [];
    gridbtns: any[] = [];
    initGridButton() {

        this.hdrbtns = [
            {
                title: 'Add',
                keys: [''],
                action: DBOperation.create,
                ishide: this.isREADONLY

            }];
        this.gridbtns = [
            {
                title: 'Edit',
                keys: ['Id'],
                action: DBOperation.update,
                ishide: this.isREADONLY
            },
            {
                title: 'X',
                keys: ["Id"],
                action: DBOperation.delete,
                ishide: this.isREADONLY
            }

        ];

    }
    //Grid Vars end

  constructor(private service: DatabaseService, private objPager: PagerService, private http:HttpClient) {
    
    //this.userModel = new User();
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
   ngAfterViewInit(){
     
      this.users = [
        {
          FirstName: 'Abhishek',
          LastName:'Das',
          Gender:'M'
        },
        {
          FirstName: 'Chaitali',
          LastName:'Das',
          Gender:'M'
        },
        {
          FirstName: 'Tamal',
          LastName:'Das',
          Gender:'M'
        },
        {
          FirstName: 'Rupam',
          LastName:'Das',
          Gender:'M'
        },
        {
          FirstName: 'Kaustav',
          LastName:'Das',
          Gender:'M'
        },
      ];
   }
   ngOnDestroy() {
		this.subscriptions.forEach(s => s.unsubscribe());
    }
  ngOnInit() {

    this.getTotalData(this.srchKey);
    this.getListData(this.pageNum, this.limitNum, this.srchKey, '');


    


    /*this.columnDefs = [
      //{headerName: 'Make', field: 'make', width: 90, sortable: true, checkboxSelection: true },
      {headerName: "Make", field: "athlete", width: 150,
        checkboxSelection: function (params) {
            // we put checkbox on the name if we are not doing grouping
            return params.columnApi.getRowGroupColumns().length === 0;
        },
        headerCheckboxSelection: function (params) {
            // we put checkbox on the name if we are not doing grouping
            return params.columnApi.getRowGroupColumns().length === 0;
        }
    },
      {headerName: 'Model', field: 'model' },
      {headerName: 'Price', field: 'price'}
    ];
    this.rowData = [
        { make: 'Toyota', model: 'Celica', price: 35000 },
        { make: 'Ford', model: 'Mondeo', price: 32000 },
        { make: 'Porsche', model: 'Boxter', price: 72000 }
    ];*/
  }

  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map( node => node.data );
    const selectedDataStringPresentation = selectedData.map( node => node.make + ' ' + node.model).join(', ');
    alert(`Selected nodes: ${selectedDataStringPresentation}`);
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
