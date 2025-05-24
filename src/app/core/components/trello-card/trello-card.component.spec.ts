import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrelloCardComponent } from './trello-card.component';

describe('TrelloCardComponent', () => {
  let component: TrelloCardComponent;
  let fixture: ComponentFixture<TrelloCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrelloCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrelloCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
