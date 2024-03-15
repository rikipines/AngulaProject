import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCousesComponent } from './all-couses.component';

describe('AllCousesComponent', () => {
  let component: AllCousesComponent;
  let fixture: ComponentFixture<AllCousesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllCousesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllCousesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
