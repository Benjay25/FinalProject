import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellersPageComponent } from './sellers-page.component';

describe('SellersPageComponent', () => {
  let component: SellersPageComponent;
  let fixture: ComponentFixture<SellersPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellersPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
