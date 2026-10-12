import { Component, OnInit, OnDestroy, ElementRef, ViewChild, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import type { Ride } from '../../../app/models/ride';

declare var google: any;

@Component({
  selector: 'app-create-ride',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrl: './create-ride.css',
  template: `
    <div class="create-container">
      <div class="create-card">

        <div class="card-header">
          <div class="header-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
            </svg>
          </div>
          <div>
            <h1>Créer un trajet</h1>
            <p class="subtitle">Partagez votre voyage avec style</p>
          </div>
        </div>

        <form class="create-form" (ngSubmit)="submit()" autocomplete="off">

          <!-- Route Section -->
          <div class="section-label">Itinéraire</div>
          <div class="route-row">
            <div class="form-group" [class.focused]="fromFocused" [class.filled]="!!formData.from">
              <label>Ville de départ</label>
              <div class="input-wrapper">
                <span class="input-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="10" r="3"/><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"/>
                  </svg>
                </span>
                <input
                  #fromInput
                  type="text"
                  [(ngModel)]="formData.from"
                  name="from"
                  placeholder="Ex: Tunis, Sfax..."
                  class="field-input"
                  (focus)="fromFocused = true"
                  (blur)="fromFocused = false"
                  required
                />
              </div>
            </div>

            <div class="route-arrow">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>

            <div class="form-group" [class.focused]="toFocused" [class.filled]="!!formData.to">
              <label>Destination</label>
              <div class="input-wrapper">
                <span class="input-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                </span>
                <input
                  #toInput
                  type="text"
                  [(ngModel)]="formData.to"
                  name="to"
                  placeholder="Ex: Sousse, Monastir..."
                  class="field-input"
                  (focus)="toFocused = true"
                  (blur)="toFocused = false"
                  required
                />
              </div>
            </div>
          </div>

          <!-- Date & Time -->
          <div class="section-label">Date & heure</div>
          <div class="datetime-row">
            <div class="form-group" [class.focused]="dateFocused" [class.filled]="!!formData.date">
              <label>Date de départ</label>
              <div class="input-wrapper">
                <span class="input-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                </span>
                <input
                  type="date"
                  [(ngModel)]="formData.date"
                  name="date"
                  class="field-input"
                  (focus)="dateFocused = true"
                  (blur)="dateFocused = false"
                  required
                />
              </div>
            </div>

            <div class="form-group" [class.focused]="timeFocused" [class.filled]="!!formData.time">
              <label>Heure</label>
              <div class="input-wrapper">
                <span class="input-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                </span>
                <input
                  type="time"
                  [(ngModel)]="formData.time"
                  name="time"
                  class="field-input"
                  (focus)="timeFocused = true"
                  (blur)="timeFocused = false"
                  required
                />
              </div>
            </div>
          </div>

          <!-- Price & Seats — side by side for visual balance -->
          <div class="section-label">Tarif & places</div>
          <div class="price-seats-row">

            <!-- Price -->
            <div class="price-col">
              <div class="form-group price-group" [class.focused]="priceFocused" [class.filled]="!!formData.price">
                <label>Prix par passager</label>
                <div class="input-wrapper">
                  <input
                    type="number"
                    [(ngModel)]="formData.price"
                    name="price"
                    placeholder="25"
                    class="field-input"
                    min="1"
                    (focus)="priceFocused = true"
                    (blur)="priceFocused = false"
                    required
                  />
                  <span class="input-suffix">TND</span>
                </div>
              </div>
            </div>

            <!-- Seats Visual Picker -->
            <div class="seats-col">
              <label class="seats-label">Places disponibles</label>
              <div class="seats-section">
                <div class="car-visual">
                  <div class="car-top-row">
                    <div class="seat driver-seat" title="Conducteur">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="12" cy="7" r="4"/><path d="M5.5 20a6.5 6.5 0 0 1 13 0"/>
                      </svg>
                      <span class="seat-label">Vous</span>
                    </div>
                    <div class="seat-spacer"></div>
                    <div
                      class="seat passenger-seat"
                      [class.selected]="formData.seats >= 1"
                      (click)="selectSeats(1)"
                      title="Place 1"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="12" cy="7" r="4"/><path d="M5.5 20a6.5 6.5 0 0 1 13 0"/>
                      </svg>
                      <span class="seat-label">1</span>
                    </div>
                  </div>
                  <div class="car-divider"></div>
                  <div class="car-bottom-row">
                    <div
                      *ngFor="let s of [2, 3, 4]"
                      class="seat passenger-seat"
                      [class.selected]="formData.seats >= s"
                      (click)="selectSeats(s)"
                      [title]="'Place ' + s"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="12" cy="7" r="4"/><path d="M5.5 20a6.5 6.5 0 0 1 13 0"/>
                      </svg>
                      <span class="seat-label">{{ s }}</span>
                    </div>
                  </div>
                </div>
                <div class="seats-info">
                  <span class="seats-count">{{ formData.seats || 0 }}</span>
                  <span class="seats-text">place{{ formData.seats > 1 ? 's' : '' }} disponible{{ formData.seats > 1 ? 's' : '' }}</span>
                </div>
              </div>
            </div>

          </div>

          <!-- Description -->
          <div class="section-label">Infos supplémentaires <span class="optional-tag">optionnel</span></div>
          <div class="form-group" [class.focused]="descFocused">
            <div class="input-wrapper textarea-wrapper">
              <textarea
                [(ngModel)]="formData.description"
                name="description"
                placeholder="Non-fumeur, musique OK, climatisation, bagages acceptés..."
                class="field-input field-textarea"
                rows="3"
                (focus)="descFocused = true"
                (blur)="descFocused = false"
              ></textarea>
            </div>
          </div>

          <!-- Submit -->
          <button
            type="submit"
            class="submit-btn"
            [class.btn-ready]="isValid()"
            [disabled]="!isValid()"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 2L11 13"/><path d="M22 2L15 22 11 13 2 9l20-7z"/>
            </svg>
            Publier mon trajet
          </button>

        </form>
      </div>
    </div>
  `
})
export class CreateRideComponent implements OnInit, OnDestroy {

  @ViewChild('fromInput', { static: true }) fromInputRef!: ElementRef;
  @ViewChild('toInput', { static: true }) toInputRef!: ElementRef;

  formData: Omit<Partial<Ride>, 'seats'> & { seats: number } = {
    from: '', to: '', date: '', time: '', price: '', seats: 0, description: ''
  };

  fromFocused = false;
  toFocused = false;
  dateFocused = false;
  timeFocused = false;
  priceFocused = false;
  descFocused = false;

  private fromAutocomplete: any;
  private toAutocomplete: any;

  // ─── REPLACE WITH YOUR ACTUAL GOOGLE MAPS API KEY ───────────────────
  private readonly GOOGLE_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY';
  // ────────────────────────────────────────────────────────────────────

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
    this.loadGoogleMapsScript().then(() => this.initAutocomplete());
  }

  ngOnDestroy(): void {
    if (this.fromAutocomplete) google.maps.event.clearInstanceListeners(this.fromAutocomplete);
    if (this.toAutocomplete) google.maps.event.clearInstanceListeners(this.toAutocomplete);
  }

  private loadGoogleMapsScript(): Promise<void> {
    return new Promise((resolve) => {
      if (typeof google !== 'undefined' && google.maps?.places) {
        resolve(); return;
      }
      const existing = document.getElementById('google-maps-script');
      if (existing) { existing.addEventListener('load', () => resolve()); return; }
      const script = document.createElement('script');
      script.id = 'google-maps-script';
      script.src = `https://maps.googleapis.com/maps/api/js?key=${this.GOOGLE_API_KEY}&libraries=places&language=fr`;
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      document.head.appendChild(script);
    });
  }

  private initAutocomplete(): void {
    const options = {
      componentRestrictions: { country: 'tn' },  // Tunisia only
      types: ['(cities)'],
      fields: ['name', 'formatted_address', 'geometry']
    };

    this.fromAutocomplete = new google.maps.places.Autocomplete(
      this.fromInputRef.nativeElement, options
    );
    this.toAutocomplete = new google.maps.places.Autocomplete(
      this.toInputRef.nativeElement, options
    );

    this.fromAutocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        const place = this.fromAutocomplete.getPlace();
        this.formData.from = place.name || place.formatted_address || '';
      });
    });

    this.toAutocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        const place = this.toAutocomplete.getPlace();
        this.formData.to = place.name || place.formatted_address || '';
      });
    });
  }

  selectSeats(n: number): void {
    this.formData.seats = this.formData.seats === n ? 0 : n;
  }

  isValid(): boolean {
    return !!(
      this.formData.from && this.formData.to &&
      this.formData.date && this.formData.time &&
      this.formData.price && (this.formData.seats ?? 0) > 0
    );
  }

  submit(): void {
    if (this.isValid()) {
      alert('Trajet publié avec succès ! 🎉');
      this.resetForm();
    }
  }

  private resetForm(): void {
    this.formData = { from: '', to: '', date: '', time: '', price: '', seats: 0, description: '' };
  }
}