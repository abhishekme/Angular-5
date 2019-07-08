import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import {DataGridUtil} from './datagrid.util'
import { Format } from './format';
import { PagerService } from '../../services/paging/pager.service';
import { GridDataResult, RowArgs, RowClassArgs, SelectAllCheckboxState, PageChangeEvent } from '@progress/kendo-angular-grid';
import { DictionaryService } from '../../services/dictionary.service';

export interface GridAction {
    action: string,
    values: {
        key: string,
        value: string
    }[]
}

@Component({
    selector: 'data-grid',
    styleUrls: ['./datagrid.style.scss'],
    templateUrl: './datagrid.component.html'
})

export class DataGrid {

    //Input Variables
    @Input() columns: any[];
    @Input() data:any;
    @Input() order;
    @Input() sort: any;
    @Input() gridbtns: any[];
    @Input() hdrbtns: any[];
    @Input() isshowfilter: boolean;
    @Input() isExporttoCSV: boolean;
    @Input() exportFileName: string;
    @Input() filter: any;
    @Input() formStyle: boolean;
    @Input() mainIcons;

    @Input() totalRec;

    //Output Variable
    @Output()
    btnclick: EventEmitter<GridAction> = new EventEmitter<GridAction>();
    @Output() pageNav = new EventEmitter();

    @ViewChild('kendoGrid') kendoGrid;

    public pageSize = 3;
    public skip = 0;

    public listData:any = [];;
    public allData      =   this.data;
    //public totalRec = 0;
    public pageTotal:any = [];
    public pagedGItems:any = [];
    public pagedItems:any =[];
    public curPage = 1;

    //Local Variable
    pdata: any[] = this.data;
    listFilter: string;
    searchTitle: string = "Search:";

    constructor(private dictionary:DictionaryService, private objPager: PagerService) {
    }

    ngOnInit(){
        this.mainIcons = [
            {class: this.dictionary.insertIcon, tooltip: 'Insert', color: this.dictionary.insertIconColor, click: () => {}},
            //{class: this.dictionary.editIcon,   tooltip: this.dictionary.edit,   color: this.dictionary.editIconColor,   click: () => {this.edit();}},
            //{class: this.dictionary.deleteIcon, tooltip: this.dictionary.delete, color: this.dictionary.deleteIconColor, click: () => {this.delete();}},
        ];
    }

    ngOnChanges(changes: any) {
        
        // if(this.data == undefined || this.data.length === 0){
        //     alert('No Data Found, Grid Not Loaded...');
        //     return false;
        // }
        /*if (JSON.stringify(changes).indexOf("data") != -1)
            this.pdata = this.data;
        this.criteriaChange(this.listFilter);
        console.log(this.gridbtns);
        */
        console.log(changes.data);
            console.log('##PData...',this.data);
        if(this.data){
            this.listData = this.data.record;
            let totalData   = this.data.totalRecord;
            //this.totalRec   = totalData;
            console.log(this.listData, " ::> ",this.totalRec);
            let totalPage   = Math.ceil(this.totalRec / this.dictionary.gridDataLimit);
            this.pageTotal = totalPage;
            //this.totalRec = 8;

            this.createPages(this.totalRec);
            //alert(totalData); 
            //Get Pager services
            //let pagesItems      = this.objPager.getPagesArray( this.pageTotal);
            //this.pagedGItems    = pagesItems;  

            let pagesItems      =   this.objPager.getPager(totalData,1,3);
            this.pagedGItems    =   pagesItems; 
            console.log("paged Data: ", this.pagedGItems);

            this.initTable();

        }
    }
    initTable(){
        console.log(this.columns);
        var key;
        for(key in this.listData){
            let findField = this.columns.find((row) => row.field === this.listData[key]);
            console.log(this.listData[key]," :CheckItem: ",findField);
        }
        //this.listData.forEach((row) => {});
    }
    //, limitNum, srchKey, queryType
    getListData(pageNum){
        this.curPage = pageNum;
        this.pageNav.emit(pageNum);
        //Get Pager services
        //let totalPage       = Math.ceil(this.totalRec / this.dictionary.gridDataLimit);
        //let pagesItems      = this.objPager.getPagesArray(25, 2, pageNum);
        //this.pagedGItems    = pagesItems;

        let pagesItems      =   this.objPager.getPager(this.totalRec, pageNum);
        this.pagedGItems    =   pagesItems;
        console.log("Updated Pages Array: ", this.pagedGItems);
    }

    createPages(totalRec){
        let items = [];
        for (var i = 1; i <= totalRec; i++) {
           this.pagedItems.push({val:i});
        }
      }

    public pageChange(event: PageChangeEvent): void {
        console.log('page change: ',event);
        this.skip = event.skip;
        //this.loadItems();
    }

    selectedClass(columnName: string): any {
        return columnName == this.sort.column ? 'sort-' + this.sort.descending : false;
    }

    changeSorting(columnName: string): void {
        var sort = this.sort;
        if (sort.column == columnName) {
            sort.descending = !sort.descending;
        } else {
            sort.column = columnName;
            sort.descending = false;
        }
    }

    convertSorting(): string {
        return this.sort.descending ? '-' + this.sort.column : this.sort.column;
    }
    gridRowSelected(row:any){
        console.log(row);
    }
    cellClickHandler(row:any){
        console.log('##Cel  click: ',row);
    }
    click(btn: any, row: any): void {
        let keyds = <GridAction>{};
        console.log(row);
        /*keyds.action = btn.action;

        if (row != null) {
            keyds.values = [];
            btn.keys.forEach((key: any) => {
                keyds.values.push({ key: key, value: row[key] });
            });
        }*/
        this.btnclick.emit(keyds);
    }

    criteriaChange(value: any) {
        if (this.filter != null) {
            if (value != '[object Event]') {
                this.listFilter = value;
                this.pdata = this.filter.transform(this.data, this.listFilter);
            }
        }
    }

    exporttoCSV() {
        let exprtcsv: any[] = [];
        (<any[]>JSON.parse(JSON.stringify(this.data))).forEach(x => {
            var obj = new Object();
            var frmt = new Format();
            for (var i = 0; i < this.columns.length; i++) {
                let transfrmVal = frmt.transform(x[this.columns[i].variable], this.columns[i].filter);
                obj[this.columns[i].display] = transfrmVal;
            }
            exprtcsv.push(obj);
        }
        );
        DataGridUtil.downloadcsv(exprtcsv, this.exportFileName);
    }

}
