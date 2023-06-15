import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownTaskComponent } from './dropdown-task.component';

describe('DropdownTaskComponent', () => {
  let component: DropdownTaskComponent;
  let fixture: ComponentFixture<DropdownTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropdownTaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropdownTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
