import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAdvertComponent } from './new.advert.component';

describe('New.AdvertComponent', () => {
  let component: NewAdvertComponent;
  let fixture: ComponentFixture<NewAdvertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAdvertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAdvertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
