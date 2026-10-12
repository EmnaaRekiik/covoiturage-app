import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface ProfileStats {
  ridesGiven: number;
  ridesTaken: number;
  totalSavings: number;
  rating: number;
  joinedDate: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="profile-container">

      <!-- HEADER -->
      <header class="page-header">
        <div class="header-inner">
          <div>
            <h1>Mon profil</h1>
            <p class="subtitle">Gérez vos informations et préférences</p>
          </div>
          <a routerLink="/profile/edit" class="btn-primary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
            Modifier
          </a>
        </div>
      </header>

      <!-- STATS -->
      <div class="stats-grid">
        <div class="stat-card stat-accent">
          <div class="stat-num">{{ stats().totalSavings }}DT</div>
          <div class="stat-label">Économies totales</div>
        </div>
        <div class="stat-card">
          <div class="stat-num">{{ stats().ridesGiven }}</div>
          <div class="stat-label">Trajets publiés</div>
        </div>
        <div class="stat-card">
          <div class="stat-num">{{ stats().rating }}/5</div>
          <div class="stat-label">Note moyenne</div>
        </div>
      </div>

      <!-- PROFILE HERO -->
      <section class="profile-hero">
        <div class="hero-bg"></div>
        <div class="hero-content">
          <div class="avatar-wrap">
            <div class="avatar" [style.background-color]="userColor()">
              <svg viewBox="0 0 64 64" fill="currentColor">
                <path d="M32 2C15.43 2 2 15.43 2 32s13.43 30 30 30 30-13.43 30-30S48.57 2 32 2zm0 56c-14.34 0-26-11.66-26-26S17.66 6 32 6s26 11.66 26 26-11.66 26-26 26z"/>
                <circle cx="32" cy="24" r="8"/>
                <path d="M22 42c0-6.6 5.4-12 12-12s12 5.4 12 12v2H22v-2z"/>
              </svg>
            </div>
          </div>
          <div class="user-info">
            <h2>{{ userName() }}</h2>
            <div class="user-badge">Membre vérifié</div>
          </div>
        </div>
      </section>

      <!-- INFO CARDS -->
      <section class="info-section">
        <div class="section-header">
          <h3>Mes informations</h3>
        </div>
        <div class="info-grid">
          <div class="info-item">
            <label>Email</label>
            <div class="info-value">{{ profileData().email }}</div>
          </div>
          <div class="info-item">
            <label>Téléphone</label>
            <div class="info-value">{{ profileData().phone }}</div>
          </div>
          <div class="info-item">
            <label>Inscrit depuis</label>
            <div class="info-value">{{ stats().joinedDate }}</div>
          </div>
          <div class="info-item">
            <label>Véhicule principal</label>
            <div class="info-value">{{ profileData().car }}</div>
          </div>
          <div class="info-item">
            <label>Trajets pris</label>
            <div class="info-value">{{ stats().ridesTaken }}</div>
          </div>
          <div class="info-item">
            <label>Trajets effectués</label>
            <div class="info-value">{{ stats().ridesGiven }}</div>
          </div>
        </div>
      </section>

    </div>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500&display=swap');

    :host {
      --green-50:  #E1F5EE;
      --green-100: #9FE1CB;
      --green-200: #5DCAA5;
      --green-400: #1D9E75;
      --green-600: #0F6E56;
      --green-800: #085041;
      --green-900: #04342C;

      --bg:        #F4FAF7;
      --surface:   #FFFFFF;
      --border:    #D2EBE2;
      --text:      #0D2E22;
      --muted:     #5A8070;

      --radius-sm: 100px;
      --radius-md: 16px;
      --radius-lg: 20px;

      --font-display: 'Syne', sans-serif;
      --font-body:    'DM Sans', sans-serif;

      display: block;
      font-family: var(--font-body);
      background: var(--bg);
      color: var(--text);
      min-height: 100vh;
      padding-bottom: 4rem;
    }

    .profile-container {
      max-width: 860px;
      margin: 0 auto;
      padding: 2rem 1.5rem;
    }

    .page-header { margin-bottom: 2.5rem; }

    .header-inner {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .page-header h1 {
      font-family: 'Inter', sans-serif;
      font-size: clamp(2rem, 5vw, 3rem);
      font-weight: 800;
      letter-spacing: -0.04em;
      line-height: 1;
      color: var(--green-900);
    }

    .subtitle {
      font-size: 0.95rem;
      color: var(--muted);
      margin-top: 0.4rem;
    }

    .btn-primary {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: var(--green-600);
      color: #fff;
      border: none;
      padding: 0.65rem 1.25rem;
      border-radius: var(--radius-sm);
      font-family: var(--font-body);
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      text-decoration: none;
      transition: background 0.2s;
    }

    .btn-primary:hover { background: var(--green-800); }
    .btn-primary svg { width: 16px; height: 16px; }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
      margin-bottom: 2.5rem;
    }

    .stat-card {
      background: var(--surface);
      border: 0.5px solid var(--border);
      border-radius: var(--radius-md);
      padding: 1.25rem 1.5rem;
      transition: transform 0.2s;
    }

    .stat-card:hover { transform: translateY(-2px); }

    .stat-card.stat-accent {
      background: var(--green-600);
      border-color: var(--green-600);
    }

    .stat-num {
      font-family: 'Inter', sans-serif;
      font-size: 1.9rem;
      font-weight: 800;
      letter-spacing: -0.01em;
      color: var(--green-900);
    }

    .stat-accent .stat-num { color: #fff; }

    .stat-label {
      font-size: 0.78rem;
      color: var(--muted);
      margin-top: 0.2rem;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .stat-accent .stat-label { color: rgba(255,255,255,0.65); }

    /* ── PROFILE HERO ── */
    .profile-hero {
      position: relative;
      background: linear-gradient(135deg, var(--green-600) 0%, var(--green-800) 100%);
      border-radius: var(--radius-lg);
      overflow: hidden;
      margin-bottom: 2rem;
      height: 180px;
    }

    .hero-bg {
      position: absolute;
      inset: 0;
      background-image:
        radial-gradient(circle at 20% 80%, rgba(255,255,255,0.15) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%);
      opacity: 0.7;
    }

    .hero-content {
      position: relative;
      z-index: 1;
      display: flex;
      align-items: center;
      gap: 1.5rem;
      padding: 2rem;
      height: 100%;
    }

    .avatar-wrap {
      flex-shrink: 0;
    }

    .avatar {
      width: 90px;
      height: 90px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 10px 30px rgba(4,52,44,0.3), inset 0 2px 8px rgba(255,255,255,0.2);
      color: white;
    }

    .avatar svg {
      width: 32px;
      height: 32px;
    }

    .user-info h2 {
      font-family: var(--font-display);
      font-size: clamp(1.5rem, 4vw, 2rem);
      font-weight: 700;
      color: white;
      margin: 0 0 0.5rem 0;
      letter-spacing: -0.02em;
    }

    .user-badge {
      background: rgba(255,255,255,0.2);
      backdrop-filter: blur(10px);
      color: white;
      padding: 0.35rem 0.9rem;
      border-radius: var(--radius-sm);
      font-size: 0.8rem;
      font-weight: 500;
      border: 1px solid rgba(255,255,255,0.3);
      display: inline-block;
    }

    /* ── INFO SECTION ── */
    .info-section {
      background: var(--surface);
      border: 0.5px solid var(--border);
      border-radius: var(--radius-lg);
      padding: 2rem;
      animation: fadeUp 0.3s ease;
    }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(10px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .section-header {
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 0.5px solid var(--border);
    }

    .section-header h3 {
      font-family: var(--font-display);
      font-size: 1.15rem;
      font-weight: 700;
      color: var(--green-900);
      margin: 0;
    }

    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 1.25rem;
    }

    .info-item {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
    }

    .info-item label {
      font-size: 0.75rem;
      font-weight: 500;
      color: var(--muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .info-value {
      font-size: 1rem;
      font-weight: 600;
      color: var(--green-900);
    }

    /* ── RESPONSIVE ── */
    @media (max-width: 540px) {
      .stats-grid { grid-template-columns: 1fr 1fr; }
      .stats-grid .stat-card:last-child { grid-column: span 2; }
      .hero-content {
        flex-direction: column;
        text-align: center;
        padding: 1.5rem;
      }
      .info-section { padding: 1.5rem; }
    }
  `]
})
export class ProfileComponent {
  userName = signal('Jean Dupont');
  userColor = signal('hsl(160, 60%, 40%)');

  profileData = signal({
    email: 'jean.dupont@email.com',
    phone: '+33 6 12 34 56 78',
    car: 'Peugeot 208 (4 places)'
  });

  stats = signal<ProfileStats>({
    ridesGiven: 47,
    ridesTaken: 23,
    totalSavings: 847,
    rating: 4.8,
    joinedDate: 'Mars 2023'
  });
}

