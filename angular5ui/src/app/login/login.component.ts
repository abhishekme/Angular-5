import { Component, OnInit } from '@angular/core';

import { DatabaseService } from '../services/database.service';
import { DictionaryService } from '../services/dictionary.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private database: DatabaseService,
    private dictionary: DictionaryService,private router: Router) { }

  ngOnInit() {

  }
}
