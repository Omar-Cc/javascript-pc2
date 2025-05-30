import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfraccionesComponent } from './infracciones.component';

describe('InfraccionesComponent', () => {
  let component: InfraccionesComponent;
  let fixture: ComponentFixture<InfraccionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfraccionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfraccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
