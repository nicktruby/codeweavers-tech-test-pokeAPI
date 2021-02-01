import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  arrowColour: string = 'black'

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    if(this.route.snapshot.paramMap.get('id')) this.arrowColour = 'white'    
  }

  backClicked() {
    this.location.back();
  }
}
