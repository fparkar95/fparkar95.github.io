import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorBallComponent } from './color-ball.component';

describe('ColorBallComponent', () => {
  let component: ColorBallComponent;
  let fixture: ComponentFixture<ColorBallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorBallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorBallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
