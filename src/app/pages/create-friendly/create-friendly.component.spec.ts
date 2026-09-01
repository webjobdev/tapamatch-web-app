import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFriendlyComponent } from './create-friendly.component';

describe('CreateFriendlyComponent', () => {
  let component: CreateFriendlyComponent;
  let fixture: ComponentFixture<CreateFriendlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateFriendlyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFriendlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
