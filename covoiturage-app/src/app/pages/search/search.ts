import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import type { Ride } from '../../../app/models/ride';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrl: './search.css',
  template: `
    <div class="search-container">

      <!-- Search Card -->
      <div class="search-card">

        <div class="card-header">
          <div class="header-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
          </div>
          <div>
            <h1>Rechercher un trajet</h1>
            <p class="subtitle">Trouvez le trajet qui vous convient</p>
          </div>
        </div>

        <form class="search-form" (ngSubmit)="search()" autocomplete="off">

          <!-- Route -->
          <div class="section-label">Itinéraire</div>
          <div class="route-row">
            <div class="form-group" [class.focused]="fromFocused" [class.filled]="!!from">
              <label>Ville de départ</label>
              <div class="input-wrapper">
                <span class="input-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="10" r="3"/><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"/>
                  </svg>
                </span>
                <input
                  type="text"
                  [(ngModel)]="from"
                  name="from"
                  placeholder="Ex: Tunis, Sfax..."
                  class="field-input"
                  (focus)="fromFocused = true"
                  (blur)="fromFocused = false"
                />
              </div>
            </div>

            <div class="route-arrow">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>

            <div class="form-group" [class.focused]="toFocused" [class.filled]="!!to">
              <label>Destination</label>
              <div class="input-wrapper">
                <span class="input-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                </span>
                <input
                  type="text"
                  [(ngModel)]="to"
                  name="to"
                  placeholder="Ex: Sousse, Monastir..."
                  class="field-input"
                  (focus)="toFocused = true"
                  (blur)="toFocused = false"
                />
              </div>
            </div>
          </div>

          <!-- Date & Passengers -->
          <div class="section-label">Date & passagers</div>
          <div class="datetime-row">
            <div class="form-group" [class.focused]="dateFocused" [class.filled]="!!date">
              <label>Date de départ</label>
              <div class="input-wrapper">
                <span class="input-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                </span>
                <input
                  type="date"
                  [(ngModel)]="date"
                  name="date"
                  class="field-input"
                  (focus)="dateFocused = true"
                  (blur)="dateFocused = false"
                />
              </div>
            </div>

            <div class="form-group" [class.focused]="passFocused" [class.filled]="!!passengers">
              <label>Passagers</label>
              <div class="input-wrapper">
                <span class="input-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </span>
                <select
                  [(ngModel)]="passengers"
                  name="passengers"
                  class="field-input field-select"
                  (focus)="passFocused = true"
                  (blur)="passFocused = false"
                >
                  <option value="1">1 passager</option>
                  <option value="2">2 passagers</option>
                  <option value="3">3 passagers</option>
                  <option value="4">4 passagers</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Submit -->
          <button type="submit" class="submit-btn btn-ready">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            Rechercher des trajets
          </button>

        </form>
      </div>

      <!-- Results -->
      <section class="results-section" *ngIf="resultsArray.length > 0">
        <div class="results-header">
          <span class="section-label" style="margin-top:0">
            {{ resultsArray.length }} trajet{{ resultsArray.length > 1 ? 's' : '' }} trouvé{{ resultsArray.length > 1 ? 's' : '' }}
          </span>
        </div>

        <div class="rides-grid">
          <div class="ride-card" *ngFor="let ride of resultsArray; trackBy: trackByFn">

            <div class="ride-route">
              <div class="ride-city">
                <span class="city-dot city-dot--from"></span>
                <span class="city-name">{{ ride.from }}</span>
              </div>
              <div class="ride-line"></div>
              <div class="ride-city">
                <span class="city-dot city-dot--to"></span>
                <span class="city-name">{{ ride.to }}</span>
              </div>
            </div>

            <div class="ride-meta">
              <div class="meta-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                {{ ride.date }}
              </div>
              <div class="meta-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
                {{ ride.time }}
              </div>
              <div class="meta-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                </svg>
                {{ ride.seats }} place
              </div>
            </div>

            <div class="ride-footer">
              <div class="ride-price">
                <span class="price-amount">{{ ride.price }}</span>
                <span class="price-currency">TND</span>
              </div>
              <button class="book-btn">
                Réserver
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>

          </div>
        </div>
      </section>

    </div>
  `
})
export class SearchComponent {
  from = '';
  to = '';
  date = '';
  passengers = '1';
  results = signal<Ride[]>([]);

  fromFocused = false;
  toFocused = false;
  dateFocused = false;
  passFocused = false;

  get resultsArray() {
    return this.results();
  }

  search() {
    this.results.set([
      { from: this.from || 'Tunis', to: this.to || 'Sousse', price: '25', date: this.date || 'Demain', time: '14h30', seats: '3' },
      { from: this.from || 'Tunis', to: this.to || 'Sfax',   price: '45', date: this.date || 'Vendredi', time: '09h00', seats: '2' },
      { from: this.from || 'Tunis', to: this.to || 'Monastir', price: '18', date: this.date || 'Samedi', time: '11h15', seats: '4' }
    ]);
  }

  trackByFn = (i: number) => i;
}