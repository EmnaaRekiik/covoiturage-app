import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="register-wrapper">

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
              <!-- Sun -->
              <circle cx="340" cy="60" r="42" fill="#9FE1CB" opacity=".5"/>
              <circle cx="340" cy="60" r="28" fill="#5DCAA5" opacity=".7"/>
              <!-- Hills -->
              <ellipse cx="100" cy="280" rx="160" ry="90" fill="#9FE1CB" opacity=".4"/>
              <ellipse cx="340" cy="300" rx="130" ry="70" fill="#5DCAA5" opacity=".3"/>
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
              <rect x="170" y="200" width="76" height="30" rx="8" fill="#0F6E56"/>
              <!-- Car windows -->
              <rect x="175" y="204" width="30" height="22" rx="4" fill="#9FE1CB" opacity=".8"/>
              <rect x="211" y="204" width="30" height="22" rx="4" fill="#9FE1CB" opacity=".8"/>
              <!-- Wheels -->
              <circle cx="182" cy="264" r="16" fill="#04342C"/>
              <circle cx="182" cy="264" r="8"  fill="#1D9E75"/>
              <circle cx="238" cy="264" r="16" fill="#04342C"/>
              <circle cx="238" cy="264" r="8"  fill="#1D9E75"/>
              <!-- Headlights -->
              <rect x="260" y="228" width="12" height="8" rx="3" fill="#FAC775" opacity=".9"/>
              <!-- Trees -->
              <rect x="60"  y="190" width="8"  height="50" rx="3" fill="#085041"/>
              <ellipse cx="64"  cy="182" rx="22" ry="26" fill="#1D9E75"/>
              <rect x="340" y="195" width="8"  height="45" rx="3" fill="#085041"/>
              <ellipse cx="344" cy="188" rx="20" ry="22" fill="#1D9E75"/>
              <rect x="20"  y="200" width="6"  height="38" rx="3" fill="#085041"/>
              <ellipse cx="23"  cy="194" rx="16" ry="18" fill="#5DCAA5"/>
              <!-- Birds -->
              <path d="M80 80 Q86 74 92 80" stroke="#0F6E56" stroke-width="2" stroke-linecap="round" fill="none"/>
              <path d="M106 68 Q112 62 118 68" stroke="#0F6E56" stroke-width="2" stroke-linecap="round" fill="none"/>
            </svg>
          </div>

          <!-- Tagline -->
          <div class="left-tagline">
            <h2>Voyagez ensemble,<br/>dépensez moins.</h2>
            <p>Rejoignez des milliers de conducteurs et passagers qui partagent leurs trajets chaque jour.</p>
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
            <h1>Créer un compte</h1>
            <p>Commencez votre aventure covoiturage</p>
          </div>

          <form class="auth-form" (ngSubmit)="register()" novalidate>

            <div class="form-group">
              <label for="name">Nom complet</label>
              <div class="input-wrap">
                <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
                  <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                </svg>
                <input
                  id="name"
                  type="text"
                  [(ngModel)]="formData.name"
                  name="name"
                  placeholder="Jean Dupont"
                  required
                />
              </div>
            </div>

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
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="password">Mot de passe</label>
                <div class="input-wrap">
                  <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
                    <rect x="3" y="11" width="18" height="11" rx="3"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  <input
                    id="password"
                    type="password"
                    [(ngModel)]="formData.password"
                    name="password"
                    placeholder="6 caractères min."
                    required
                    minlength="6"
                  />
                </div>
              </div>

              <div class="form-group">
                <label for="confirmPassword">Confirmation</label>
                <div class="input-wrap">
                  <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
                    <path d="M9 12l2 2 4-4"/><rect x="3" y="11" width="18" height="11" rx="3"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  <input
                    id="confirmPassword"
                    type="password"
                    [(ngModel)]="formData.confirmPassword"
                    name="confirmPassword"
                    placeholder="Répétez le mot de passe"
                    required
                  />
                </div>
              </div>
            </div>

            <!-- Password match hint -->
            <p class="hint-error"
               *ngIf="formData.confirmPassword && formData.password !== formData.confirmPassword">
              Les mots de passe ne correspondent pas.
            </p>

            <button type="submit" class="btn-submit" [disabled]="!isValid()">
              Créer mon compte
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>

          </form>

          <div class="form-footer">
            <span>Déjà inscrit ?</span>
            <a routerLink="/login">Se connecter</a>
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

      --bg:       #F4FAF7;
      --surface:  #FFFFFF;
      --border:   #C8E6D8;
      --text:     #0D2E22;
      --muted:    #527A68;

      --error: #A32D2D;
      --error-bg: #FCEBEB;

      --ff-display: 'Syne', sans-serif;
      --ff-body:    'DM Sans', sans-serif;

      display: block;
      font-family: var(--ff-body);
    }

    /* ── Wrapper: split layout ── */
    .register-wrapper {
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

    /* subtle dot pattern */
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
      flex: 1;
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

    /* Form groups */
    .form-group {
      margin-bottom: 1.25rem;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

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
      padding: 0.75rem 1rem 0.75rem 2.5rem;
      background: var(--surface);
      border: 0.5px solid var(--border);
      border-radius: 12px;
      font-family: var(--ff-body);
      font-size: 0.9rem;
      color: var(--text);
      transition: border-color 0.2s, box-shadow 0.2s;
      outline: none;
    }

    .input-wrap input::placeholder {
      color: #A8C4B8;
    }

    .input-wrap input:focus {
      border-color: var(--g400);
      box-shadow: 0 0 0 3px rgba(29,158,117,0.12);
    }

    /* Hint */
    .hint-error {
      font-size: 0.78rem;
      color: var(--error);
      margin: -0.75rem 0 1rem;
      padding-left: 0.25rem;
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
      margin-top: 0.5rem;
      transition: background 0.2s, transform 0.15s;
    }

    .btn-submit svg {
      width: 16px;
      height: 16px;
      transition: transform 0.2s;
    }

    .btn-submit:hover:not(:disabled) {
      background: var(--g800);
    }

    .btn-submit:hover:not(:disabled) svg {
      transform: translateX(4px);
    }

    .btn-submit:active:not(:disabled) {
      transform: scale(0.98);
    }

    .btn-submit:disabled {
      opacity: 0.45;
      cursor: not-allowed;
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

    .form-footer a:hover {
      text-decoration: underline;
    }

    /* ── Responsive ── */
    @media (max-width: 768px) {
      .register-wrapper {
        grid-template-columns: 1fr;
      }

      .left-panel {
        min-height: 260px;
      }

      .left-inner {
        padding: 2rem;
        gap: 1.25rem;
      }

      .illustration-wrap { display: none; }

      .left-tagline h2 { font-size: 1.4rem; }

      .right-panel { padding: 2rem 1.25rem; }

      .form-row {
        grid-template-columns: 1fr;
        gap: 0;
      }
    }

    @media (max-width: 400px) {
      .left-panel { display: none; }
    }
  `]
})
export class RegisterComponent {
  formData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  isValid(): boolean {
    return !!this.formData.name &&
           !!this.formData.email &&
           this.formData.password.length >= 6 &&
           this.formData.password === this.formData.confirmPassword;
  }

  register() {
    if (this.isValid()) {
      alert('Compte créé avec succès ! (Mock - redirection vers login)');
      // TODO: Real registration + router.navigate(['/login'])
    }
  }
}