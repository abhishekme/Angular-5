import { Component, OnInit, AfterViewInit } from '@angular/core';


declare var $:any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit(){
  }

  ngAfterViewInit(){
    $(function(){
        // Toggle the side navigation
        $("#sidebarToggle, #sidebarToggleTop").on('click', function(e) {
            $("body").toggleClass("sidebar-toggled");
            $(".sidebar").toggleClass("toggled");
            if ($(".sidebar").hasClass("toggled").length) {
              $('.sidebar .collapse').collapse('hide');
            };
        });

        //Hide menu after chage menu
        $('#accordionSidebar > li').on('click', function(e){
            var collapseAttr  = $(this).attr('aria-expanded');
            console.log($(this), " ==>  ",collapseAttr);  

        });

        /*var sidebarContainer =  $('.sidebar');
        $("body").mouseup(function(e){
            console.log('Click...'," ==>  ", sidebarContainer.has(e.target).length);
            console.log('Open dropdown: ', ' :: ', $('.sidebar .show').length);
            if($('.sidebar .show').length){
              //$('.sidebar .show').hide();
            }
        });*/
    });
  }

}
