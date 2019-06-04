import { Injectable } from '@angular/core';

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
  	getPagesArray(total_page:number=0, each_side:number=2, curr_page:number=0){
  		//alert('pager :: '+total_page + " ===> " + each_side+ " ====> " +curr_page );
  		//alert((2*each_side)+5);
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

}
