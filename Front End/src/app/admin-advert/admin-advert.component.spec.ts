import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAdvertComponent } from './admin-advert.component';

describe('AdminAdvertComponent', () => {
  let component: AdminAdvertComponent;
  let fixture: ComponentFixture<AdminAdvertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAdvertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAdvertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
