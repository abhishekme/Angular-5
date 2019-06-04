import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService as AuthServ } from './../services/auth.service.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {

  constructor(private router: Router,private authServ: AuthServ) { }

  ngOnInit() {
  }

}
