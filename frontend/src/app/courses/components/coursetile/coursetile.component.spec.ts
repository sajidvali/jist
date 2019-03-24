import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursetileComponent } from './coursetile.component';

describe('CoursetileComponent', () => {
  let component: CoursetileComponent;
  let fixture: ComponentFixture<CoursetileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursetileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursetileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
