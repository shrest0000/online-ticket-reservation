import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OmtrComponent } from './omtr.component';

describe('OmtrComponent', () => {
  let component: OmtrComponent;
  let fixture: ComponentFixture<OmtrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OmtrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OmtrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
