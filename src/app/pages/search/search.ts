import { Component, signal } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import type { Ride } from '../../../app/models/ride';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="search-container container fade-in">
      <!-- Hero Search -->
      <section class="search-hero">
        <div class="search-card card">
          <h1 class="gradient-text">Rechercher votre trajet magique</h1>
          <p>Destination, date, magie...</p>
          
          <form class="search-form">
            <div class="form-row">
              <div class="form-group">
                <label>Départ</label>
                <input 
                  type="text" 
                  [(ngModel)]="from" name="from"
                  placeholder="Paris..." 
                  class="magical-input"
                  (focus)="isFocused.set('from')"
                  (blur)="isFocused.set('')"
                />
              </div>
              <div class="form-group">
                <label>Destination</label>
                <input 
                  type="text" 
                  [(ngModel)]="to" name="to"
                  placeholder="Lyon..." 
                  class="magical-input"
                  (focus)="isFocused.set('to')"
                  (blur)="isFocused.set('')"
                />
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label>Date</label>
                <input 
                  type="date" 
                  [(ngModel)]="date" name="date"
                  class="magical-input"
                />
              </div>
              <div class="form-group">
                <label>Passagers</label>
                <select [(ngModel)]="passengers" name="passengers" class="magical-input">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4+</option>
                </select>
              </div>
            </div>

            <button type="submit" class="btn-magical btn-primary search-btn" (click)="search()">
              🚀 Trouver des trajets magiques
            </button>
          </form>
        </div>
      </section>

      <!-- Results Placeholder -->
      <section class="results-section" *ngIf="resultsArray.length > 0">
        <h2 class="gradient-text section-title">{{ resultsArray.length }} trajets trouvés</h2>
        <div class="rides-grid">
          <div class="ride-card card" *ngFor="let ride of resultsArray; trackBy: trackByFn">
            <div class="ride-header">
              <span class="from">{{ride.from}}</span>
              <svg class="arrow" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8.22 2.22a.75.75 0 0 1 1.06 0l6.5 6.5a.75.75 0 0 1 0 1.06l-6.5 6.5a.75.75 0 0 1-1.06-1.06L13.94 12l-5.72-5.72a.75.75 0 0 1 0-1.06Z"/>
              </svg>
              <span class="to">{{ride.to}}</span>
            </div>
            <div class="ride-details">
              <div class="price">{{ride.price}}€</div>
              <div class="date-time">{{ride.date}} • {{ride.time}}</div>
              <div class="seats">{{ride.seats}} places</div>
            </div>
            <button class="btn-magical btn-book">Réserver ✨</button>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .search-container {
      padding: 2rem 0 4rem;
    }

    .search-hero {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 60vh;
      padding: 2rem 0;
    }

    .search-card {
      max-width: 800px;
      width: 100%;
      padding: 3rem;
      margin: 0 1rem;
    }

    .search-card h1 {
      font-size: clamp(2rem, 5vw, 3rem);
      font-weight: 800;
      margin-bottom: 0.5rem;
    }

    .search-card p {
      font-size: 1.2rem;
      opacity: 0.9;
      margin-bottom: 2.5rem;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
      margin-bottom: 1.5rem;
    }

    .form-group {
      position: relative;
    }

    .form-group label {
      display: block;
      font-weight: 500;
      margin-bottom: 0.5rem;
      color: var(--text-secondary);
    }

    .magical-input {
      width: 100%;
      padding: 1rem 1.25rem;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: var(--radius);
      color: white;
      font-size: 1rem;
      backdrop-filter: blur(10px);
      transition: var(--transition);
    }

    .magical-input:focus {
      outline: none;
      border-color: var(--accent-glow);
      box-shadow: 0 0 0 3px var(--accent-glow);
      transform: scale(1.02);
    }

    .magical-input::placeholder {
      color: rgba(255, 255, 255, 0.7);
    }

    .search-btn {
      width: 100%;
      padding: 1.25rem;
      font-size: 1.1rem;
      margin-top: 1rem;
    }

    .results-section {
      margin-top: 4rem;
    }

    .section-title {
      font-size: 2rem;
      font-weight: 700;
      text-align: center;
      margin-bottom: 3rem;
    }

    .rides-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
      gap: 2.5rem;
    }

    .ride-card {
      padding: 2rem;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }

    .ride-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .from, .to {
      font-weight: 600;
      font-size: 1.1rem;
    }

    .arrow {
      width: 1.5rem;
      height: 1.5rem;
      color: var(--accent-glow);
      flex-shrink: 0;
    }

    .ride-details {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      margin-bottom: 1.5rem;
    }

    .price {
      font-size: 1.75rem;
      font-weight: 800;
      background: var(--accent);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .date-time, .seats {
      color: var(--text-secondary);
    }

    .btn-book {
      width: 100%;
      margin-top: auto;
    }

    @media (max-width: 768px) {
      .form-row {
        grid-template-columns: 1fr;
        gap: 1rem;
      }

      .rides-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }

      .search-card {
        padding: 2rem 1.5rem;
        margin: 0;
      }
    }
  `]
})
export class SearchComponent {
  from = '';
  to = '';
  date = '';
  passengers = '1';
  results = signal<Ride[]>([]);

  get resultsArray() {
    return this.results();
  }

  isFocused = signal('');

  search() {
    // Mock magical results
    this.results.set([
      { from: this.from || 'Paris', to: this.to || 'Lyon', price: '25', date: this.date || 'Demain', time: '14h30', seats: '3' },
      { from: this.from || 'Paris', to: this.to || 'Marseille', price: '45', date: this.date || 'Vendredi', time: '09h00', seats: '2' },
      { from: this.from || 'Paris', to: this.to || 'Lille', price: '18', date: this.date || 'Samedi', time: '11h15', seats: '4' }
    ]);
  }

  trackByFn = (i: number) => i;
}
