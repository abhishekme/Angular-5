import { Injectable } from '@angular/core';
import * as _ from 'underscore';

@Injectable()
export class PagerService {
  	
	
	private start_page;
	private end_page;

  	constructor() { 
  		this.start_page 	=	0;
  		this.end_page 		=	0;
  	}

  	/*************************************
	*
	*	Pagination System
	*
  	**************************************/

  	//getPagesArray(total_page, each_side, curr_page){
  	getPagesArray(total_page:number=0, each_side:number=2, curr_page=1){
  		let outputPages = [];

  		if (total_page <= (2*each_side)+5){
	        // in this case, too few pages, so display them all
	        this.start_page = 1;
	        this.end_page = total_page;
	    }
	    else if (curr_page <= (each_side+3)){
	        // in this case, curr_page is too close to the beginning
	        this.start_page = 1;
	        this.end_page = ((2*each_side)+3);
	    }
	    else if (curr_page >= total_page - (each_side+2)){
	        // in this case, curr_page is too close to the end
	        this.start_page = total_page - (2*each_side) - 2;
	        this.end_page = total_page;
	    }
	    else{
	        // regular case
	        this.start_page = curr_page - each_side;
	        this.end_page = curr_page + each_side;
	    }

	    if (this.start_page> 1)
        	outputPages.push({val:"1"});
	    if (this.start_page>2)
	        outputPages.push({val:"..."});

	    for (var i = this.start_page; i <= this.end_page; i++) {
	    	outputPages.push({val:i});
	    }
	    if (this.end_page<total_page-1)
	        outputPages.push({val:"..."});
	    if (this.end_page<total_page)
			outputPages.push({val:total_page});
			
	    return outputPages;
	}
	  
	getPager1(totalItems: number, currentPage: number = 1, pageSize: number = 10) {
        // calculate total pages
        let totalPages = Math.ceil(totalItems / pageSize);

        let startPage: number, endPage: number;
        // if (totalPages <= 10) {
        //     // less than 10 total pages so show all
        //     startPage = 1;
        //     endPage = totalPages;
        // } else {
        //     // more than 10 total pages so calculate start and end pages
        //     if (currentPage <= 6) {
        //         startPage = 1;
        //         endPage = 10;
        //     } else if (currentPage + 4 >= totalPages) {
        //         startPage = totalPages - 9;
        //         endPage = totalPages;
        //     } else {
        //         startPage = currentPage - 5;
        //         endPage = currentPage + 4;
        //     }
        // }
        
        if (totalPages <= 5) {
            startPage = 1;
            endPage = totalPages;
        } else {
            if (currentPage <= 3) {
                startPage = 1;
                endPage = 5;
            } else if (currentPage + 1 >= totalPages) {
                startPage = totalPages - 4;
                endPage = totalPages;
            } else {
                startPage = currentPage - 2;
                endPage = currentPage+2;
            }
        }

        // calculate start and end item indexes
        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        let pages = _.range(startPage, endPage + 1);


		return pages;

        // return object with all pager properties required by the view
        /*return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
		};*/
	}
	
	getPager(totalItems: number, currentPage: number = 1, pageSize: number = 2) {
        // calculate total pages
        let totalPages = Math.ceil(totalItems / pageSize);
        // ensure current page isn't out of range
        if (currentPage < 1) { 
            currentPage = 1; 
        } else if (currentPage > totalPages) { 
            currentPage = totalPages; 
        }
        
        let startPage: number, endPage: number;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 3;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        // calculate start and end item indexes
        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);
		return pages;
        // return object with all pager properties required by the view
        /*return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
		};*/
    }

}
