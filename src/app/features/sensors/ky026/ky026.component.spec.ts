import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ky026Component } from './ky026.component';

describe('Ky026Component', () => {
  let component: Ky026Component;
  let fixture: ComponentFixture<Ky026Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Ky026Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ky026Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
