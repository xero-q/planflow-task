import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrelloListComponent } from './trello-list.component';

describe('TrelloListComponent', () => {
  let component: TrelloListComponent;
  let fixture: ComponentFixture<TrelloListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrelloListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrelloListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
