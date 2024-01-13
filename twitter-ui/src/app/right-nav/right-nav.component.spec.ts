import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightNavComponent } from './right-nav.component';

describe('RightNavComponent', () => {
  let component: RightNavComponent;
  let fixture: ComponentFixture<RightNavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RightNavComponent]
    });
    fixture = TestBed.createComponent(RightNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
