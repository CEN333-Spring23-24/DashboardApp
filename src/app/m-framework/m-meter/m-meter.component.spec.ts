import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MMeterComponent } from './m-meter.component';

describe('MMeterComponent', () => {
  let component: MMeterComponent;
  let fixture: ComponentFixture<MMeterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MMeterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MMeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
