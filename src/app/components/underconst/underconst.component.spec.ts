import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderconstComponent } from './underconst.component';

describe('UnderconstComponent', () => {
  let component: UnderconstComponent;
  let fixture: ComponentFixture<UnderconstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnderconstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnderconstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
