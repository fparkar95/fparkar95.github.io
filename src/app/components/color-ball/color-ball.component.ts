import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-color-ball',
  templateUrl: './color-ball.component.html',
  styleUrls: ['./color-ball.component.css']
})
export class ColorBallComponent implements OnInit {

  @Input() hex:string; 
  constructor() { }

  ngOnInit(): void {
  }

}
