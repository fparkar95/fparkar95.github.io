
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-color-ball',
  templateUrl: './color-ball.component.html',
  styleUrls: ['./color-ball.component.css'],
  animations: [
    trigger('flip', [
      state('default', style({
        transform: 'none'
      })),
      state('flipped', style({
        transform: 'rotateY(180deg)',
      })),
      transition('default => flipped', [
        animate('400ms')
      ]),
      transition('* => default', [
        animate('200ms')
      ])
    ])
  ]
})
export class ColorBallComponent implements OnInit {

  public flipState:string = 'flipped';
  private _hex: string;
  get hex(): string {
      return this._hex;
  }
  @Input() set hex(value: string) {
      this._hex = value;
      this.flipState = (this.flipState == 'default')?'flipped':'default'; 
  }
  constructor() { }

  ngOnInit():void{};
}
