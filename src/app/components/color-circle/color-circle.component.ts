import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-color-circle',
  templateUrl: './color-circle.component.html',
  styleUrls: ['./color-circle.component.css']
})
export class ColorCircleComponent implements OnInit {

  @Input() hex:string; 
  constructor() { }

  ngOnInit(): void {
  }

}
