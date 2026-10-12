import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-rides',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="my-rides-container container fade-in">
      <header class="page-header">
        <h1 class="gradient-text">Mes trajets magiques</h1>
        <p>Vos aventures de covoiturage</p>
      </header>

      <div class="tabs">
        <button class="tab-btn active" (click)="activeTab.set('upcoming')">À venir</button>
        <button class="tab-btn" (click)="activeTab.set('past')">Passés</button>
        <button class="tab-btn" (click)="activeTab.set('booked')">Réservés</button>
      </div>

      <!-- Upcoming Rides -->
      <section class="rides-section" *ngIf="activeTab() === 'upcoming'">
        <div class="empty-state" *ngIf="upcomingRides().length === 0">
          <div class="empty-icon">🚀</div>
          <h3>Aucun trajet à venir</h3>
          <p>Proposez un nouveau trajet magique !</p>
          <a routerLink="/create" class="btn-magical">Créer trajet</a>
        </div>
        <div class="rides-grid" *ngIf="upcomingRides().length > 0">
          <div class="ride-card card" *ngFor="let ride of upcomingRides(); trackBy: trackByFn">
            <div class="ride-top">
              <div class="ride-route">
                <span class="location">{{ride.from}}</span>
                <svg viewBox="0 0 24 24" fill="none" class="route-arrow">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
                <span class="location">{{ride.to}}</span>
              </div>
              <div class="status-badge upcoming">À venir</div>
            </div>
            <div class="ride-info">
              <div class="ride-price">{{ride.earnings}}€ gagnés</div>
              <div class="ride-date">{{ride.date}} • {{ride.time}}</div>
              <div class="ride-seats">{{ride.seats}}/{{ride.maxSeats}} places</div>
            </div>
            <div class="ride-actions">
              <button class="btn-magical btn-small">Voir détails</button>
              <button class="btn-magical btn-cancel">Annuler</button>
            </div>
          </div>
        </div>
      </section>

      <!-- Past Rides -->
      <section class="rides-section" *ngIf="activeTab() === 'past'">
        <div class="rides-grid">
          <div class="ride-card card completed" *ngFor="let ride of pastRides(); trackBy: trackByFn">
            <div class="ride-top">
              <div class="ride-route">
                <span class="location">{{ride.from}}</span>
                <svg viewBox="0 0 24 24" fill="none" class="route-arrow">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
                <span class="location">{{ride.to}}</span>
              </div>
              <div class="status-badge completed">Terminé</div>
            </div>
            <div class="ride-info">
              <div class="ride-price completed-price">{{ride.earnings}}€</div>
              <div class="ride-date">{{ride.date}}</div>
              <span class="passengers">{{ride.passengers}} passagers</span>
            </div>
            <div class="ride-footer">
              <div class="rating">⭐ 4.9 ({{ride.reviews}})</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Booked Rides -->
      <section class="rides-section" *ngIf="activeTab() === 'booked'">
        <div class="rides-grid">
          <div class="ride-card card booked" *ngFor="let ride of bookedRides(); trackBy: trackByFn">
            <div class="ride-top">
              <div class="ride-route">
                <span class="location">{{ride.from}}</span>
                <svg viewBox="0 0 24 24" fill="none" class="route-arrow">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
                <span class="location">{{ride.to}}</span>
              </div>
              <div class="status-badge booked">Confirmé</div>
            </div>
            <div class="ride-info">
              <div class="ride-price">{{ride.price}}€</div>
              <div class="ride-date">{{ride.date}} à {{ride.time}}</div>
            </div>
            <div class="ride-actions">
              <button class="btn-magical btn-small">Détails</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      padding-bottom: 4rem;
    }

    .my-rides-container {
      max-width: 1400px;
      margin: 0 auto;
    }

    .page-header {
      text-align: center;
      margin: 2rem 0 3rem;
    }

    .page-header h1 {
      font-size: clamp(2.5rem, 6vw, 4rem);
      font-weight: 800;
      margin-bottom: 0.5rem;
    }

    .page-header p {
      font-size: 1.3rem;
      opacity: 0.9;
    }

    .tabs {
      display: flex;
      justify-content: center;
      gap: 0.5rem;
      margin-bottom: 3rem;
      flex-wrap: wrap;
    }

    .tab-btn {
      background: rgba(255, 255, 255, 0.08);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: var(--text-secondary);
      padding: 0.75rem 1.75rem;
      border-radius: 50px;
      font-weight: 500;
      cursor: pointer;
      transition: var(--transition);
    }

    .tab-btn.active,
    .tab-btn:hover {
      background: var(--glass-bg);
      color: white;
      box-shadow: var(--shadow-glow);
      transform: translateY(-2px);
    }

    .rides-section {
      animation: slideIn 0.5s ease-out;
    }

    @keyframes slideIn {
      from { opacity: 0; transform: translateX(30px); }
      to { opacity: 1; transform: translateX(0); }
    }

    .rides-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
      gap: 2rem;
      margin-bottom: 2rem;
    }

    .ride-card {
      padding: 2.5rem;
      height: 200px;
      display: flex;
      flex-direction: column;
      position: relative;
      overflow: hidden;
    }

    .ride-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, var(--accent), rgba(118, 75, 162, 0.8));
    }

    .ride-card.completed::before {
      background: linear-gradient(90deg, #10b981, #059669);
    }

    .ride-card.booked::before {
      background: linear-gradient(90deg, #3b82f6, #1d4ed8);
    }

    .ride-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .ride-route {
      display: flex;
      align-items: center;
      gap: 1rem;
      flex: 1;
    }

    .location {
      font-weight: 600;
      font-size: 1.1rem;
      white-space: nowrap;
    }

    .route-arrow {
      width: 2rem;
      height: 2rem;
      color: var(--text-secondary);
      flex-shrink: 0;
    }

    .status-badge {
      padding: 0.25rem 1rem;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 600;
      backdrop-filter: blur(10px);
    }

    .status-badge.upcoming {
      background: rgba(34, 197, 94, 0.2);
      color: #22c55e;
      border: 1px solid rgba(34, 197, 94, 0.3);
    }

    .status-badge.completed {
      background: rgba(16, 185, 129, 0.2);
      color: #10b981;
    }

    .status-badge.booked {
      background: rgba(59, 130, 246, 0.2);
      color: #3b82f6;
    }

    .ride-info {
      flex: 1;
      margin-bottom: 1.5rem;
    }

    .ride-price, .completed-price {
      font-size: 1.8rem;
      font-weight: 800;
      background: var(--accent);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 0.25rem;
    }

    .ride-date {
      color: var(--text-secondary);
      margin-bottom: 0.25rem;
    }

    .ride-seats, .passengers {
      color: var(--text-secondary);
      font-size: 0.95rem;
    }

    .ride-actions {
      display: flex;
      gap: 1rem;
    }

    .ride-footer {
      margin-top: auto;
      padding-top: 1rem;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }

    .btn-small {
      padding: 0.5rem 1.5rem;
      font-size: 0.9rem;
    }

    .btn-cancel {
      background: rgba(239, 68, 68, 0.2);
      border-color: rgba(239, 68, 68, 0.3);
      color: #f87171;
    }

    .btn-cancel:hover {
      background: rgba(239, 68, 68, 0.3);
    }

    .empty-state {
      text-align: center;
      padding: 4rem 2rem;
      max-width: 500px;
      margin: 4rem auto;
    }

    .empty-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
    }

    .empty-state h3 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
      opacity: 0.9;
    }

    @media (max-width: 768px) {
      .rides-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }

      .ride-card {
        height: auto;
        padding: 2rem;
      }

      .tabs {
        gap: 0.25rem;
      }

      .tab-btn {
        padding: 0.5rem 1.25rem;
        font-size: 0.9rem;
      }
    }
  `]
})
export class MyRidesComponent {
  activeTab = signal<'upcoming' | 'past' | 'booked'>('upcoming');

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
