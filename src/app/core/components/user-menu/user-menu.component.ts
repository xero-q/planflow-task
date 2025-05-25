import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { TrelloService } from '../../services/trello.service';
import { NgIf } from '@angular/common';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-user-menu',
  imports: [NgIf],
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
})
export class UserMenuComponent {
  isMenuOpen = false;

  constructor(
    private router: Router,
    private trelloService: TrelloService,
    public stateService: StateService
  ) {}

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  navigateToDashboard(): void {
    this.router.navigate(['/dashboard']);
    this.closeMenu();
  }

  logout(): void {
    this.trelloService.logout();
    this.router.navigate(['/login']);
    this.closeMenu();
  }

  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.user-menu')) {
      this.closeMenu();
    }
  }
}
