import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrelloBoardComponent } from './trello-board.component';

describe('TrelloBoardComponent', () => {
  let component: TrelloBoardComponent;
  let fixture: ComponentFixture<TrelloBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrelloBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrelloBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
