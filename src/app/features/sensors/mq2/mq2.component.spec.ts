import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mq2Component } from './mq2.component';

describe('Mq2Component', () => {
  let component: Mq2Component;
  let fixture: ComponentFixture<Mq2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Mq2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Mq2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
