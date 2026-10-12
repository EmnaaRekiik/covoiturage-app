import { Component, signal, computed } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-rides',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="my-rides-container">

      <!-- HEADER -->
      <header class="page-header">
        <div class="header-inner">
          <div>
            <h1>Mes trajets</h1>
            <p class="subtitle">Vos aventures de covoiturage</p>
          </div>
          <a routerLink="/create" class="btn-primary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
              <path d="M12 5v14M5 12h14"/>
            </svg>
            Créer un trajet
          </a>
        </div>
      </header>

      <!-- STATS -->
      <div class="stats-grid">
        <div class="stat-card stat-accent">
          <div class="stat-num">{{ totalEarnings() }}DT</div>
          <div class="stat-label">Total gagné</div>
        </div>
        <div class="stat-card">
          <div class="stat-num">{{ totalRides() }}</div>
          <div class="stat-label">Trajets total</div>
        </div>
        <div class="stat-card">
          <div class="stat-num">4.9</div>
          <div class="stat-label">Note moyenne</div>
        </div>
      </div>

      <!-- TABS -->
      <div class="tabs-bar">
        <button
          class="tab-btn"
          [class.active]="activeTab() === 'upcoming'"
          (click)="activeTab.set('upcoming')">
          À venir
          <span class="tab-count">{{ upcomingRides().length }}</span>
        </button>
        <button
          class="tab-btn"
          [class.active]="activeTab() === 'past'"
          (click)="activeTab.set('past')">
          Passés
          <span class="tab-count">{{ pastRides().length }}</span>
        </button>
        <button
          class="tab-btn"
          [class.active]="activeTab() === 'booked'"
          (click)="activeTab.set('booked')">
          Réservés
          <span class="tab-count">{{ bookedRides().length }}</span>
        </button>
      </div>

      <!-- UPCOMING -->
      <section class="rides-section" *ngIf="activeTab() === 'upcoming'">
        <div class="empty-state" *ngIf="upcomingRides().length === 0">
          <div class="empty-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="28" height="28">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"/>
            </svg>
          </div>
          <h3>Aucun trajet à venir</h3>
          <p>Proposez votre première aventure !</p>
          <a routerLink="/create" class="btn-primary">Créer un trajet</a>
        </div>

        <div class="rides-list" *ngIf="upcomingRides().length > 0">
          <div class="ride-card" *ngFor="let ride of upcomingRides(); trackBy: trackByFn">
            <div class="ride-top">
              <div class="ride-route">
                <span class="city">{{ ride.from }}</span>
                <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
                <span class="city">{{ ride.to }}</span>
              </div>
              <span class="badge badge-upcoming">À venir</span>
            </div>
            <div class="ride-divider"></div>
            <div class="ride-bottom">
              <div class="ride-meta">
                <span class="amount">{{ ride.earnings }}DT</span>
                <div class="meta-info">
                  <span class="meta-chip">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
                    </svg>
                    {{ ride.date }}
                  </span>
                  <span class="meta-chip">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                    </svg>
                    {{ ride.time }}
                  </span>
                  <span class="meta-chip">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                    {{ ride.seats }}/{{ ride.maxSeats }} places
                  </span>
                </div>
              </div>
              <div class="ride-actions">
                <button class="btn-outline">Voir détails</button>
                <button class="btn-danger">Annuler</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- PAST -->
      <section class="rides-section" *ngIf="activeTab() === 'past'">
        <div class="rides-list">
          <div class="ride-card" *ngFor="let ride of pastRides(); trackBy: trackByFn">
            <div class="ride-top">
              <div class="ride-route">
                <span class="city">{{ ride.from }}</span>
                <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
                <span class="city">{{ ride.to }}</span>
              </div>
              <span class="badge badge-done">Terminé</span>
            </div>
            <div class="ride-divider"></div>
            <div class="ride-bottom">
              <div class="ride-meta">
                <span class="amount">{{ ride.earnings }}DT</span>
                <div class="meta-info">
                  <span class="meta-chip">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
                    </svg>
                    {{ ride.date }}
                  </span>
                  <span class="meta-chip">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                    </svg>
                    {{ ride.passengers }} passagers
                  </span>
                </div>
              </div>
              <div class="ride-rating">
                <span class="star">★</span>
                4.9 &nbsp;<span class="rating-count">({{ ride.reviews }} avis)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- BOOKED -->
      <section class="rides-section" *ngIf="activeTab() === 'booked'">
        <div class="rides-list">
          <div class="ride-card" *ngFor="let ride of bookedRides(); trackBy: trackByFn">
            <div class="ride-top">
              <div class="ride-route">
                <span class="city">{{ ride.from }}</span>
                <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
                <span class="city">{{ ride.to }}</span>
              </div>
              <span class="badge badge-booked">Confirmé</span>
            </div>
            <div class="ride-divider"></div>
            <div class="ride-bottom">
              <div class="ride-meta">
                <span class="amount">{{ ride.price }}DT</span>
                <div class="meta-info">
                  <span class="meta-chip">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
                    </svg>
                    {{ ride.date }}
                  </span>
                  <span class="meta-chip">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                    </svg>
                    {{ ride.time }}
                  </span>
                </div>
              </div>
              <div class="ride-actions">
                <button class="btn-outline">Détails</button>
              </div>
            </div>
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

      --red-bg:    #FCEBEB;
      --red-border:#F7C1C1;
      --red-text:  #A32D2D;

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

    .my-rides-container {
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

    .tabs-bar {
      display: flex;
      gap: 0.25rem;
      margin-bottom: 2rem;
      border-bottom: 1px solid var(--border);
    }

    .tab-btn {
      background: none;
      border: none;
      font-family: var(--font-body);
      font-size: 0.9rem;
      font-weight: 500;
      color: var(--muted);
      padding: 0.75rem 1.25rem;
      cursor: pointer;
      position: relative;
      transition: color 0.2s;
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }

    .tab-btn::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      right: 0;
      height: 2px;
      background: var(--green-600);
      transform: scaleX(0);
      transition: transform 0.25s;
      border-radius: 2px 2px 0 0;
    }

    .tab-btn.active { color: var(--green-800); }
    .tab-btn.active::after { transform: scaleX(1); }
    .tab-btn:hover:not(.active) { color: var(--text); }

    .tab-count {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: var(--green-50);
      border-radius: var(--radius-sm);
      padding: 0.1rem 0.5rem;
      font-size: 0.75rem;
      color: var(--green-600);
    }

    .tab-btn.active .tab-count {
      background: var(--green-600);
      color: #fff;
    }

    .rides-section {
      animation: fadeUp 0.3s ease;
    }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(10px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .rides-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .ride-card {
      background: var(--surface);
      border: 0.5px solid var(--border);
      border-radius: var(--radius-lg);
      padding: 1.5rem;
      transition: border-color 0.2s, transform 0.2s;
    }

    .ride-card:hover {
      border-color: var(--green-200);
      transform: translateY(-2px);
    }

    .ride-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1.25rem;
    }

    .ride-route {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .city {
      font-family: var(--font-display);
      font-size: 1.1rem;
      font-weight: 700;
      letter-spacing: -0.02em;
      color: var(--green-900);
    }

    .arrow-icon {
      width: 18px;
      height: 18px;
      color: var(--muted);
      flex-shrink: 0;
    }

    .badge {
      font-size: 0.75rem;
      font-weight: 500;
      padding: 0.3rem 0.85rem;
      border-radius: var(--radius-sm);
      white-space: nowrap;
    }

    .badge-upcoming {
      background: var(--green-50);
      color: var(--green-600);
      border: 0.5px solid var(--green-100);
    }

    .badge-done {
      background: var(--bg);
      color: var(--muted);
      border: 0.5px solid var(--border);
    }

    .badge-booked {
      background: #E6F1FB;
      color: #185FA5;
      border: 0.5px solid #B5D4F4;
    }

    .ride-divider {
      height: 0.5px;
      background: var(--border);
      margin: 0 0 1.25rem;
    }

    .ride-bottom {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .ride-meta { display: flex; flex-direction: column; gap: 0.3rem; }

    .amount {
      font-family: 'Inter', sans-serif;
      font-size: 1.5rem;
      font-weight: 800;
      letter-spacing: -0.03em;
      color: var(--green-600);
    }

    /* ─── Meta chips with icons ─── */
    .meta-info {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      flex-wrap: wrap;
    }

    .meta-chip {
      display: inline-flex;
      align-items: center;
      gap: 0.28rem;
      font-size: 0.78rem;
      color: var(--muted);
    }

    .meta-chip svg {
      width: 13px;
      height: 13px;
      flex-shrink: 0;
      stroke: var(--muted);
      fill: none;
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    .ride-actions { display: flex; gap: 0.5rem; flex-wrap: wrap; }

    .btn-outline {
      font-family: var(--font-body);
      font-size: 0.825rem;
      font-weight: 500;
      padding: 0.55rem 1.1rem;
      border-radius: var(--radius-sm);
      cursor: pointer;
      border: 0.5px solid var(--border);
      background: var(--bg);
      color: var(--text);
      transition: background 0.2s, color 0.2s, border-color 0.2s;
    }

    .btn-outline:hover {
      background: var(--green-600);
      color: #fff;
      border-color: var(--green-600);
    }

    .btn-danger {
      font-family: var(--font-body);
      font-size: 0.825rem;
      font-weight: 500;
      padding: 0.55rem 1.1rem;
      border-radius: var(--radius-sm);
      cursor: pointer;
      border: 0.5px solid var(--red-border);
      background: var(--red-bg);
      color: var(--red-text);
      transition: background 0.2s, color 0.2s;
    }

    .btn-danger:hover {
      background: var(--red-text);
      color: #fff;
      border-color: var(--red-text);
    }

    .ride-rating {
      font-size: 0.8rem;
      color: var(--muted);
      display: flex;
      align-items: center;
      gap: 0.3rem;
    }

    .star { color: #BA7517; font-size: 0.95rem; }
    .rating-count { color: var(--muted); }

    .empty-state {
      text-align: center;
      padding: 4rem 2rem;
    }

    .empty-icon {
      width: 56px;
      height: 56px;
      background: var(--green-50);
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1.5rem;
      border: 0.5px solid var(--green-100);
      color: var(--green-600);
    }

    .empty-state h3 {
      font-family: var(--font-display);
      font-size: 1.15rem;
      font-weight: 700;
      color: var(--green-900);
      margin-bottom: 0.5rem;
    }

    .empty-state p {
      font-size: 0.875rem;
      color: var(--muted);
      margin-bottom: 1.5rem;
    }

    @media (max-width: 540px) {
      .stats-grid { grid-template-columns: 1fr 1fr; }
      .stats-grid .stat-card:last-child { grid-column: span 2; }
      .ride-actions { flex-wrap: wrap; }
      .tabs-bar { gap: 0; }
      .tab-btn { padding: 0.75rem 0.9rem; font-size: 0.82rem; }
    }
  `]
})
export class MyRidesComponent {

  activeTab = signal<'upcoming' | 'past' | 'booked'>('upcoming');

  totalEarnings = computed(() => {
    let total = 0;
    [...this.pastRides(), ...this.upcomingRides()].forEach(ride => {
      total += Number(ride.earnings || 0);
    });
    return total;
  });

  totalRides = computed(() =>
    this.pastRides().length + this.upcomingRides().length + this.bookedRides().length
  );

  upcomingRides = signal([
    {
      from: 'Paris',
      to: 'Lyon',
      date: 'Demain',
      time: '14h30',
      earnings: '75',
      seats: '3',
      maxSeats: '4'
    }
  ]);

  pastRides = signal([
    {
      from: 'Marseille',
      to: 'Nice',
      date: '18 Mars',
      earnings: '45',
      passengers: '2',
      reviews: '12'
    },
    {
      from: 'Lyon',
      to: 'Grenoble',
      date: '15 Mars',
      earnings: '28',
      passengers: '3',
      reviews: '8'
    }
  ]);

  bookedRides = signal([
    {
      from: 'Bordeaux',
      to: 'Toulouse',
      date: 'Vendredi',
      time: '10h00',
      price: '32',
    }
  ]);

  trackByFn = (i: number) => i;
}