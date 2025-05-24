import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrelloAccountComponent } from './trello-account.component';

describe('TrelloAccountComponent', () => {
  let component: TrelloAccountComponent;
  let fixture: ComponentFixture<TrelloAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrelloAccountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrelloAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
