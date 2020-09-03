import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { New.AdvertComponent } from './new.advert.component';

describe('New.AdvertComponent', () => {
  let component: New.AdvertComponent;
  let fixture: ComponentFixture<New.AdvertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ New.AdvertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(New.AdvertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
