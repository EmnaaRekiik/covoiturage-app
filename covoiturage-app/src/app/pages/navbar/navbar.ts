import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar" [class.scrolled]="isScrolled">
      <div class="nav-container">

        <!-- Logo -->
        <a routerLink="/home" class="nav-logo">
          <div class="logo-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                 stroke-linecap="round" stroke-linejoin="round" width="18" height="18">
              <path d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"/>
            </svg>
          </div>
          <span class="logo-name">CovoitGo</span>
          <span class="logo-badge">🌿</span>
        </a>

        <!-- Desktop Nav Links -->
        <ul class="nav-links">
          <li>
            <a routerLink="/home" routerLinkActive="active" class="nav-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
                   stroke-linecap="round" width="15" height="15">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
              Accueil
            </a>
          </li>
          <li>
            <a routerLink="/search" routerLinkActive="active" class="nav-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
                   stroke-linecap="round" width="15" height="15">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
              Rechercher
            </a>
          </li>
          <li>
            <a routerLink="/create" routerLinkActive="active" class="nav-link nav-link-create">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                   stroke-linecap="round" width="15" height="15">
                <path d="M12 5v14M5 12h14"/>
              </svg>
              Proposer
            </a>
          </li>
          <li>
            <a routerLink="/my-rides" routerLinkActive="active" class="nav-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
                   stroke-linecap="round" width="15" height="15">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              Mes trajets
            </a>
          </li>
        </ul>

        <!-- Desktop Auth & Profile -->
        <div class="nav-auth">
          <a routerLink="/login" class="btn-login">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" width="14" height="14">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
              <polyline points="10 17 15 12 10 7"/>
              <line x1="15" y1="12" x2="3" y2="12"/>
            </svg>
            Connexion
          </a>
          <a routerLink="/profile" class="profile-btn">
            <div class="profile-avatar">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                <circle cx="12" cy="7" r="4"/>
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              </svg>
            </div>
          </a>
        </div>

        <!-- Mobile toggle -->
        <button class="mobile-toggle" (click)="toggleMobileMenu()" [attr.aria-expanded]="isMobileMenuOpen">
          <span class="hamburger" [class.open]="isMobileMenuOpen">
            <span></span><span></span><span></span>
          </span>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div class="mobile-menu" *ngIf="isMobileMenuOpen">
        <div class="mobile-menu-inner">
          <a routerLink="/home"     routerLinkActive="mobile-active" class="mobile-link" (click)="closeMobileMenu()">
            <span class="mobile-link-icon">🏠</span> Accueil
          </a>
          <a routerLink="/search"   routerLinkActive="mobile-active" class="mobile-link" (click)="closeMobileMenu()">
            <span class="mobile-link-icon">🔍</span> Rechercher
          </a>
          <a routerLink="/create"   routerLinkActive="mobile-active" class="mobile-link" (click)="closeMobileMenu()">
            <span class="mobile-link-icon">➕</span> Proposer un trajet
          </a>
          <a routerLink="/my-rides" routerLinkActive="mobile-active" class="mobile-link" (click)="closeMobileMenu()">
            <span class="mobile-link-icon">🚗</span> Mes trajets
          </a>
          <a routerLink="/profile" class="mobile-link mobile-profile" (click)="closeMobileMenu()">
            <span class="mobile-link-icon">👤</span> Mon profil
          </a>
          <div class="mobile-divider"></div>
          <a routerLink="/login" class="mobile-cta" *ngIf="!isLoggedIn" (click)="closeMobileMenu()">
            Se connecter
          </a>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap');

    :host {
      --g50:  #E1F5EE;
      --g100: #9FE1CB;
      --g200: #5DCAA5;
      --g400: #1D9E75;
      --g600: #0F6E56;
      --g800: #085041;
      --g900: #04342C;

      --bg:      #F4FAF7;
      --surface: #FFFFFF;
      --border:  #C8E6D8;
      --text:    #0D2E22;
      --muted:   #527A68;

      --ff-d: 'Syne', sans-serif;
      --ff-b: 'DM Sans', sans-serif;

      display: block;
    }

    /* ─── NAVBAR SHELL ─── */
    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      height: 72px;
      background: rgba(244, 250, 247, 0.82);
      backdrop-filter: blur(18px);
      -webkit-backdrop-filter: blur(18px);
      border-bottom: 0.5px solid var(--border);
      transition: background 0.3s, box-shadow 0.3s;
    }

    .navbar.scrolled {
      background: rgba(255, 255, 255, 0.95);
      box-shadow: 0 2px 24px rgba(15, 110, 86, 0.08);
    }

    /* ─── CONTAINER ─── */
    .nav-container {
      max-width: 1100px;
      margin: 0 auto;
      height: 100%;
      padding: 0 5vw;
      display: flex;
      align-items: center;
      gap: 2rem;
      
    }

    /* ─── LOGO ─── */
    .nav-logo {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      text-decoration: none;
      flex-shrink: 0;
      margin-right: auto;
      margin-left: -80px;
    }

    .logo-icon {
      width: 36px;
      height: 36px;
      background: var(--g600);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      flex-shrink: 0;
      transition: background 0.2s;
    }

    .nav-logo:hover .logo-icon { background: var(--g800); }

    .logo-name {
      font-family: 'Inter', sans-serif;
      font-size: 1.15rem;
      font-weight: 800;
      color: var(--g900);
      letter-spacing: -0.03em;
    }

    .logo-badge {
      font-size: 0.85rem;
      opacity: 0.8;
    }

    /* ─── NAV LINKS ─── */
    .nav-links {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
      gap: 0.25rem;
    }

    .nav-link {
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      padding: 0.5rem 0.9rem;
      border-radius: 100px;
      font-family: 'DM Sans', sans-serif;
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--muted);
      text-decoration: none;
      white-space: nowrap;
      transition: color 0.2s, background 0.2s;
    }

    .nav-link:hover {
      color: var(--g600);
      background: var(--g50);
    }

    .nav-link.active {
      color: var(--g600);
      background: rgba(15, 110, 86, 0.08);
      font-weight: 600;
    }

    /* "Proposer" link — slightly more prominent */
    .nav-link-create {
      color: var(--g600);
      background: var(--g50);
      border: 0.5px solid var(--border);
    }

    .nav-link-create:hover {
      background: var(--g600);
      color: #fff;
      border-color: var(--g600);
    }

    .nav-link-create.active {
      background: var(--g600);
      color: #fff;
      border-color: var(--g600);
    }

    /* ─── LOGIN CTA ─── */
    .btn-login {
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      padding: 0.55rem 1.25rem;
      border-radius: 100px;
      background: var(--g600);
      color: #fff;
      font-family: 'DM Sans', sans-serif;
      font-size: 0.875rem;
      font-weight: 500;
      text-decoration: none;
      flex-shrink: 0;
      transition: background 0.2s, transform 0.15s;
    }

    .nav-auth {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .profile-btn {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: var(--g600);
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      color: #fff;
      transition: all 0.2s;
      box-shadow: 0 4px 12px rgba(15,110,86,0.3);
    }

    .profile-btn:hover {
      background: var(--g800);
      transform: scale(1.05);
      box-shadow: 0 6px 20px rgba(15,110,86,0.4);
    }

    .profile-avatar {
      width: 20px;
      height: 20px;
    }

    .profile-avatar svg {
      stroke-width: 2.5;
    }

    .mobile-profile {
      background: var(--g50);
      border: 1px solid var(--g200);
    }

    .btn-login:hover {
      background: var(--g800);
      transform: translateY(-1px);
    }

    /* ─── MOBILE TOGGLE ─── */
    .mobile-toggle {
      display: none;
      background: none;
      border: none;
      padding: 0.4rem;
      cursor: pointer;
      margin-left: auto;
    }

    .hamburger {
      display: flex;
      flex-direction: column;
      gap: 5px;
      width: 22px;
    }

    .hamburger span {
      display: block;
      height: 2px;
      width: 100%;
      background: var(--g600);
      border-radius: 2px;
      transform-origin: center;
      transition: transform 0.25s, opacity 0.25s, width 0.25s;
    }

    .hamburger.open span:nth-child(1) {
      transform: translateY(7px) rotate(45deg);
    }

    .hamburger.open span:nth-child(2) {
      opacity: 0;
      width: 0;
    }

    .hamburger.open span:nth-child(3) {
      transform: translateY(-7px) rotate(-45deg);
    }

    /* ─── MOBILE MENU ─── */
    .mobile-menu {
      position: fixed;
      top: 72px;
      left: 0;
      right: 0;
      background: rgba(255, 255, 255, 0.98);
      backdrop-filter: blur(20px);
      border-bottom: 0.5px solid var(--border);
      box-shadow: 0 8px 32px rgba(15, 110, 86, 0.08);
      animation: slideDown 0.2s ease both;
    }

    @keyframes slideDown {
      from { opacity: 0; transform: translateY(-8px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .mobile-menu-inner {
      max-width: 1100px;
      margin: 0 auto;
      padding: 1rem 5vw 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .mobile-link {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.85rem 1rem;
      border-radius: 12px;
      font-family: 'DM Sans', sans-serif;
      font-size: 0.95rem;
      font-weight: 500;
      color: var(--text);
      text-decoration: none;
      transition: background 0.15s, color 0.15s;
    }

    .mobile-link:hover,
    .mobile-link.mobile-active {
      background: var(--g50);
      color: var(--g600);
    }

    .mobile-link-icon { font-size: 1rem; }

    .mobile-divider {
      height: 0.5px;
      background: var(--border);
      margin: 0.75rem 0;
    }

    .mobile-cta {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.85rem;
      border-radius: 100px;
      background: var(--g600);
      color: #fff;
      font-family: 'DM Sans', sans-serif;
      font-size: 0.95rem;
      font-weight: 500;
      text-decoration: none;
      transition: background 0.2s;
    }

    .mobile-cta:hover { background: var(--g800); }

    /* ─── RESPONSIVE ─── */
    @media (max-width: 768px) {
      .nav-links,
      .btn-login {
        display: none;
      }

      .mobile-toggle {
        display: block;
      }

      .nav-logo {
        margin-right: 0;
      }
    }

    @media (min-width: 769px) {
      .mobile-toggle {
        display: none;
      }
    }
  `]
})
export class NavbarComponent {
  isMobileMenuOpen = false;
  isScrolled = false;
  isLoggedIn = true; // Static logged in state

  constructor(private router: Router) {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () => {
        this.isScrolled = window.scrollY > 20;
      });
    }
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }
}