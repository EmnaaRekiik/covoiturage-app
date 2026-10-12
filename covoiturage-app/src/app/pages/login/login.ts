import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="login-wrapper">

      <!-- ── LEFT PANEL : Illustration ── -->
      <aside class="left-panel">
        <div class="left-inner">

          <!-- Logo / Brand -->
          <div class="brand">
            <div class="brand-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"/>
              </svg>
            </div>
            <span class="brand-name">CovoitGo</span>
          </div>

          <!-- Hero illustration (SVG road scene) -->
          <div class="illustration-wrap">
            <svg class="road-svg" viewBox="0 0 420 340" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- Sky -->
              <rect width="420" height="340" fill="#E1F5EE" rx="24"/>
              <!-- Moon -->
              <circle cx="340" cy="60" r="42" fill="#9FE1CB" opacity=".35"/>
              <circle cx="340" cy="60" r="28" fill="#5DCAA5" opacity=".5"/>
              <circle cx="354" cy="50" r="20" fill="#E1F5EE" opacity=".6"/>
              <!-- Stars -->
              <circle cx="60"  cy="40"  r="2.5" fill="#5DCAA5" opacity=".7"/>
              <circle cx="120" cy="25"  r="2"   fill="#5DCAA5" opacity=".5"/>
              <circle cx="200" cy="50"  r="3"   fill="#9FE1CB" opacity=".6"/>
              <circle cx="160" cy="20"  r="1.5" fill="#5DCAA5" opacity=".4"/>
              <circle cx="260" cy="35"  r="2"   fill="#9FE1CB" opacity=".5"/>
              <!-- Hills -->
              <ellipse cx="100" cy="280" rx="160" ry="90" fill="#9FE1CB" opacity=".35"/>
              <ellipse cx="340" cy="300" rx="130" ry="70" fill="#5DCAA5" opacity=".25"/>
              <!-- Road -->
              <path d="M0 260 Q210 200 420 260 L420 340 L0 340Z" fill="#0F6E56"/>
              <path d="M0 272 Q210 214 420 272 L420 340 L0 340Z" fill="#085041"/>
              <!-- Road dashes -->
              <rect x="40"  y="290" width="40" height="6" rx="3" fill="#9FE1CB" opacity=".6"/>
              <rect x="130" y="285" width="40" height="6" rx="3" fill="#9FE1CB" opacity=".6"/>
              <rect x="220" y="280" width="40" height="6" rx="3" fill="#9FE1CB" opacity=".6"/>
              <rect x="310" y="278" width="40" height="6" rx="3" fill="#9FE1CB" opacity=".6"/>
              <!-- Car body -->
              <rect x="155" y="218" width="110" height="44" rx="10" fill="#085041"/>
              <rect x="170" y="200" width="76"  height="30" rx="8"  fill="#0F6E56"/>
              <!-- Car windows (night glow) -->
              <rect x="175" y="204" width="30" height="22" rx="4" fill="#FAC775" opacity=".5"/>
              <rect x="211" y="204" width="30" height="22" rx="4" fill="#FAC775" opacity=".5"/>
              <!-- Wheels -->
              <circle cx="182" cy="264" r="16" fill="#04342C"/>
              <circle cx="182" cy="264" r="8"  fill="#1D9E75"/>
              <circle cx="238" cy="264" r="16" fill="#04342C"/>
              <circle cx="238" cy="264" r="8"  fill="#1D9E75"/>
              <!-- Headlights beam -->
              <path d="M267 232 L310 220 L310 240 L267 238Z" fill="#FAC775" opacity=".18"/>
              <rect x="260" y="228" width="12" height="8" rx="3" fill="#FAC775" opacity=".95"/>
              <!-- Trees (darker, night) -->
              <rect x="60"  y="190" width="8"  height="50" rx="3" fill="#085041"/>
              <ellipse cx="64"  cy="182" rx="22" ry="26" fill="#0F6E56"/>
              <rect x="340" y="195" width="8"  height="45" rx="3" fill="#085041"/>
              <ellipse cx="344" cy="188" rx="20" ry="22" fill="#0F6E56"/>
              <rect x="20"  y="200" width="6"  height="38" rx="3" fill="#085041"/>
              <ellipse cx="23"  cy="194" rx="16" ry="18" fill="#1D9E75" opacity=".7"/>
            </svg>
          </div>

          <!-- Tagline -->
          <div class="left-tagline">
            <h2>Ravi de vous<br/>revoir !</h2>
            <p>Reconnectez-vous et retrouvez vos trajets, vos passagers et vos économies.</p>
          </div>

          <!-- Stats row -->
          <div class="left-stats">
            <div class="left-stat">
              <span class="ls-num">12k+</span>
              <span class="ls-label">Membres</span>
            </div>
            <div class="left-stat-sep"></div>
            <div class="left-stat">
              <span class="ls-num">4.9</span>
              <span class="ls-label">Note moy.</span>
            </div>
            <div class="left-stat-sep"></div>
            <div class="left-stat">
              <span class="ls-num">98%</span>
              <span class="ls-label">Satisfaits</span>
            </div>
          </div>

        </div>
      </aside>

      <!-- ── RIGHT PANEL : Form ── -->
      <main class="right-panel">
        <div class="form-wrap">

          <div class="form-header">
            <h1>Se connecter</h1>
            <p>Bienvenue de retour sur CovoitGo</p>
          </div>

          <!-- Error message -->
          <div class="alert-error" *ngIf="loginError">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>
            </svg>
            {{ loginError }}
          </div>

          <form class="auth-form" (ngSubmit)="login()" novalidate>

            <div class="form-group">
              <label for="email">Adresse email</label>
              <div class="input-wrap">
                <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
                  <rect x="2" y="4" width="20" height="16" rx="3"/><path d="m2 7 10 7 10-7"/>
                </svg>
                <input
                  id="email"
                  type="email"
                  [(ngModel)]="formData.email"
                  name="email"
                  placeholder="votre@email.com"
                  required
                  autocomplete="email"
                />
              </div>
            </div>

            <div class="form-group">
              <div class="label-row">
                <label for="password">Mot de passe</label>
                <a routerLink="/forgot-password" class="forgot-link">Mot de passe oublié ?</a>
              </div>
              <div class="input-wrap">
                <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
                  <rect x="3" y="11" width="18" height="11" rx="3"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <input
                  id="password"
                  [type]="showPassword ? 'text' : 'password'"
                  [(ngModel)]="formData.password"
                  name="password"
                  placeholder="Votre mot de passe"
                  required
                  autocomplete="current-password"
                />
                <button type="button" class="toggle-pw" (click)="showPassword = !showPassword" tabindex="-1">
                  <svg *ngIf="!showPassword" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                  </svg>
                  <svg *ngIf="showPassword" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                </button>
              </div>
            </div>

            <div class="remember-row">
              <label class="checkbox-label">
                <input type="checkbox" [(ngModel)]="rememberMe" name="rememberMe"/>
                <span class="checkbox-custom"></span>
                Se souvenir de moi
              </label>
            </div>

            <button type="submit" class="btn-submit" [disabled]="!isValid()" [class.loading]="isLoading">
              <span *ngIf="!isLoading">
                Se connecter
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
              <span *ngIf="isLoading" class="spinner"></span>
            </button>

          </form>

          <div class="form-footer">
            <span>Pas encore de compte ?</span>
            <a routerLink="/register">Créer un compte</a>
          </div>

        </div>
      </main>

    </div>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@400;500&display=swap');

    /* ── Tokens ── */
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

      --error:    #A32D2D;
      --error-bg: #FCEBEB;
      --error-border: #F7C1C1;

      --ff-display: 'Syne', sans-serif;
      --ff-body:    'DM Sans', sans-serif;

      display: block;
      font-family: var(--ff-body);
    }

    /* ── Wrapper ── */
    .login-wrapper {
      display: grid;
      grid-template-columns: 1fr 1fr;
      min-height: 100vh;
    }

    /* ══════════════════════════════
       LEFT PANEL
    ══════════════════════════════ */
    .left-panel {
      background: var(--g800);
      position: relative;
      overflow: hidden;
      display: flex;
      align-items: stretch;
    }

    .left-panel::before {
      content: '';
      position: absolute;
      inset: 0;
      background-image: radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px);
      background-size: 28px 28px;
      pointer-events: none;
    }

    .left-inner {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      padding: 2.5rem;
      gap: 2rem;
      width: 100%;
    }

    /* Brand */
    .brand {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .brand-icon {
      width: 40px;
      height: 40px;
      background: rgba(255,255,255,0.12);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .brand-icon svg {
      width: 22px;
      height: 22px;
      stroke: var(--g100);
    }

    .brand-name {
      font-family: 'Inter', sans-serif;
      font-size: 1.25rem;
      font-weight: 800;
      color: #fff;
      letter-spacing: -0.03em;
    }

    /* Illustration */
    .illustration-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .road-svg {
      width: 100%;
      max-width: 380px;
      height: auto;
      border-radius: 20px;
      filter: drop-shadow(0 20px 40px rgba(4,52,44,0.4));
    }

    /* Tagline */
    .left-tagline h2 {
      font-family: 'Inter', sans-serif;
      font-size: clamp(1.4rem, 2.5vw, 1.9rem);
      font-weight: 800;
      color: #fff;
      line-height: 1.2;
      letter-spacing: -0.03em;
      
      margin-bottom: 0.75rem;
    }

    .left-tagline p {
      font-size: 0.9rem;
      color: var(--g100);
      line-height: 1.6;
      max-width: 320px;
    }

    /* Stats */
    .left-stats {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      padding: 1.25rem 1.5rem;
      background: rgba(255,255,255,0.07);
      border: 0.5px solid rgba(255,255,255,0.12);
      border-radius: 14px;
    }

    .left-stat {
      display: flex;
      flex-direction: column;
      gap: 0.15rem;
    }

    .ls-num {
      font-family: 'Inter', sans-serif;
      font-size: 1.25rem;
      font-weight: 800;
      color: #fff;
      letter-spacing: -0.03em;
    }

    .ls-label {
      font-size: 0.75rem;
      color: var(--g100);
      font-weight: 500;
    }

    .left-stat-sep {
      width: 0.5px;
      height: 36px;
      background: rgba(255,255,255,0.15);
    }

    /* ══════════════════════════════
       RIGHT PANEL
    ══════════════════════════════ */
    .right-panel {
      background: var(--bg);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem 1.5rem;
    }

    .form-wrap {
      width: 100%;
      max-width: 420px;
      animation: fadeUp 0.4s ease;
    }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(14px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    /* Header */
    .form-header {
      margin-bottom: 2.25rem;
    }

    .form-header h1 {
      font-family: 'Inter', sans-serif;
      font-size: clamp(1.75rem, 3vw, 2.25rem);
      font-weight: 800;
      letter-spacing: -0.04em;
      color: var(--g900);
      margin-bottom: 0.4rem;
    }

    .form-header p {
      font-size: 0.95rem;
      color: var(--muted);
    }

    /* Alert error */
    .alert-error {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      background: var(--error-bg);
      border: 0.5px solid var(--error-border);
      border-radius: 12px;
      padding: 0.75rem 1rem;
      font-size: 0.85rem;
      color: var(--error);
      margin-bottom: 1.5rem;
    }

    .alert-error svg {
      width: 16px;
      height: 16px;
      flex-shrink: 0;
    }

    /* Form groups */
    .form-group {
      margin-bottom: 1.25rem;
    }

    .label-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }

    .label-row label {
      margin-bottom: 0;
    }

    .forgot-link {
      font-size: 0.8rem;
      color: var(--g600);
      font-weight: 500;
      text-decoration: none;
    }

    .forgot-link:hover { text-decoration: underline; }

    label {
      display: block;
      font-size: 0.82rem;
      font-weight: 500;
      color: var(--g800);
      margin-bottom: 0.5rem;
      letter-spacing: 0.01em;
    }

    /* Input */
    .input-wrap {
      position: relative;
    }

    .input-icon {
      position: absolute;
      left: 14px;
      top: 50%;
      transform: translateY(-50%);
      width: 16px;
      height: 16px;
      stroke: var(--muted);
      pointer-events: none;
      transition: stroke 0.2s;
    }

    .input-wrap:focus-within .input-icon {
      stroke: var(--g600);
    }

    .input-wrap input {
      width: 100%;
      padding: 0.75rem 2.75rem 0.75rem 2.5rem;
      background: var(--surface);
      border: 0.5px solid var(--border);
      border-radius: 12px;
      font-family: var(--ff-body);
      font-size: 0.9rem;
      color: var(--text);
      transition: border-color 0.2s, box-shadow 0.2s;
      outline: none;
    }

    .input-wrap input::placeholder { color: #A8C4B8; }

    .input-wrap input:focus {
      border-color: var(--g400);
      box-shadow: 0 0 0 3px rgba(29,158,117,0.12);
    }

    /* Show/hide password toggle */
    .toggle-pw {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      cursor: pointer;
      padding: 4px;
      color: var(--muted);
      display: flex;
      align-items: center;
      transition: color 0.2s;
    }

    .toggle-pw:hover { color: var(--g600); }

    .toggle-pw svg {
      width: 16px;
      height: 16px;
    }

    /* Remember me */
    .remember-row {
      margin-bottom: 1.5rem;
    }

    .checkbox-label {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      font-size: 0.85rem;
      color: var(--muted);
      cursor: pointer;
      user-select: none;
      margin-bottom: 0;
    }

    .checkbox-label input[type="checkbox"] {
      display: none;
    }

    .checkbox-custom {
      width: 18px;
      height: 18px;
      border: 0.5px solid var(--border);
      border-radius: 5px;
      background: var(--surface);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: background 0.2s, border-color 0.2s;
    }

    .checkbox-label input[type="checkbox"]:checked + .checkbox-custom {
      background: var(--g600);
      border-color: var(--g600);
    }

    .checkbox-label input[type="checkbox"]:checked + .checkbox-custom::after {
      content: '';
      display: block;
      width: 5px;
      height: 9px;
      border: 2px solid #fff;
      border-top: none;
      border-left: none;
      transform: rotate(45deg) translateY(-1px);
    }

    /* Submit */
    .btn-submit {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.6rem;
      background: var(--g600);
      color: #fff;
      border: none;
      padding: 0.9rem 1.5rem;
      border-radius: 12px;
      font-family: var(--ff-body);
      font-size: 0.95rem;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.2s, transform 0.15s;
      min-height: 50px;
    }

    .btn-submit span {
      display: flex;
      align-items: center;
      gap: 0.6rem;
    }

    .btn-submit svg {
      width: 16px;
      height: 16px;
      transition: transform 0.2s;
    }

    .btn-submit:hover:not(:disabled) { background: var(--g800); }

    .btn-submit:hover:not(:disabled) svg { transform: translateX(4px); }

    .btn-submit:active:not(:disabled) { transform: scale(0.98); }

    .btn-submit:disabled {
      opacity: 0.45;
      cursor: not-allowed;
    }

    /* Spinner */
    .spinner {
      width: 20px;
      height: 20px;
      border: 2px solid rgba(255,255,255,0.3);
      border-top-color: #fff;
      border-radius: 50%;
      animation: spin 0.7s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    /* Footer */
    .form-footer {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      margin-top: 1.75rem;
      font-size: 0.875rem;
      color: var(--muted);
      padding-top: 1.5rem;
      border-top: 0.5px solid var(--border);
    }

    .form-footer a {
      color: var(--g600);
      font-weight: 500;
      text-decoration: none;
    }

    .form-footer a:hover { text-decoration: underline; }

    /* ── Responsive ── */
    @media (max-width: 768px) {
      .login-wrapper {
        grid-template-columns: 1fr;
      }

      .left-panel { min-height: 260px; }

      .left-inner {
        padding: 2rem;
        gap: 1.25rem;
      }

      .illustration-wrap { display: none; }

      .left-tagline h2 { font-size: 1.4rem; }

      .right-panel { padding: 2rem 1.25rem; }
    }

    @media (max-width: 400px) {
      .left-panel { display: none; }
    }
  `]
})
export class LoginComponent {
  formData = {
    email: '',
    password: ''
  };

  rememberMe = false;
  showPassword = false;
  isLoading = false;
  loginError = '';

  isValid(): boolean {
    return !!this.formData.email && this.formData.password.length >= 6;
  }

  login() {
    if (!this.isValid()) return;

    this.isLoading = true;
    this.loginError = '';

    // Mock async login — replace with real auth service
    setTimeout(() => {
      this.isLoading = false;
      // Simulate a failed login for demo purposes
      // On success: this.router.navigate(['/home'])
      this.loginError = 'Email ou mot de passe incorrect.';
    }, 1500);
  }
}