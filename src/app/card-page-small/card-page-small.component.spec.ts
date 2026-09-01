import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPageSmallComponent } from './card-page-small.component';

describe('CardPageSmallComponent', () => {
  let component: CardPageSmallComponent;
  let fixture: ComponentFixture<CardPageSmallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardPageSmallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardPageSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
