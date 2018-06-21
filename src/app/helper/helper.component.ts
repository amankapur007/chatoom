import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-helper',
  templateUrl: './helper.component.html',
  styleUrls: ['./helper.component.css']
})
export class HelperComponent implements OnInit {

  customMessage:string
  constructor(private _router:ActivatedRoute) { }

  ngOnInit() {
    this._router.queryParams.subscribe((param)=>{
      this.display(param['customMessage']);
    })
  }

  display(param){
    switch(param){
      case 'EM':
        this.customMessage = 'Please verify your email , we have mailed you the link for verification to your mail id'
    }
  }

}
