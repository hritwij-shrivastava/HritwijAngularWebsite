import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialSingleComponent } from './tutorial-single.component';

describe('TutorialSingleComponent', () => {
  let component: TutorialSingleComponent;
  let fixture: ComponentFixture<TutorialSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TutorialSingleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TutorialSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
