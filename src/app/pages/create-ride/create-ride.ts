import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import type { Ride } from '../../../app/models/ride';

@Component({
  selector: 'app-create-ride',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="create-container container fade-in">
      <div class="create-hero">
        <div class="create-card card">
          <h1 class="gradient-text">✨ Créer un trajet magique</h1>
          <p>Partagez votre voyage avec style</p>
          
          <form class="create-form" (ngSubmit)="submit()">
            <div class="form-grid">
              <div class="form-group">
                <label>Départ</label>
                <input type="text" [(ngModel)]="formData.from" name="from" placeholder="Paris Centre" class="magical-input" required />
              </div>
              
              <div class="form-group">
                <label>Destination</label>
                <input type="text" [(ngModel)]="formData.to" name="to" placeholder="Lyon Part-Dieu" class="magical-input" required />
              </div>

              <div class="form-group">
                <label>Date départ</label>
                <input type="date" [(ngModel)]="formData.date" name="date" class="magical-input" required />
              </div>

              <div class="form-group">
                <label>Heure</label>
                <input type="time" [(ngModel)]="formData.time" name="time" class="magical-input" required />
              </div>

              <div class="form-group span-2">
                <label>Prix par passager (€)</label>
                <input type="number" [(ngModel)]="formData.price" name="price" placeholder="25" class="magical-input" min="1" required />
              </div>

              <div class="form-group">
                <label>Places disponibles</label>
                <input type="number" [(ngModel)]="formData.seats" name="seats" placeholder="3" class="magical-input" min="1" max="5" required />
              </div>

              <div class="form-group span-2">
                <label>Description (optionnel)</label>
                <textarea [(ngModel)]="formData.description" name="description" placeholder="Non-fumeur, musique OK, bagages..." 
                  class="magical-input" rows="4"></textarea>
              </div>
            </div>

            <div class="form-actions">
              <button type="submit" class="btn-magical btn-primary" [disabled]="!isValid()">
                🚀 Publier mon trajet magique
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .create-container {
      padding: 2rem 0 4rem;
    }

    .create-hero {
      display: flex;
      justify-content: center;
      min-height: 80vh;
      padding: 2rem 0;
    }

    .create-card {
      max-width: 700px;
      width: 100%;
      padding: 3rem;
      margin: 0 1rem;
    }

    .create-card h1 {
      font-size: 2.5rem;
      font-weight: 800;
      margin-bottom: 0.5rem;
    }

    .create-card p {
      font-size: 1.2rem;
      opacity: 0.9;
      margin-bottom: 2.5rem;
    }

    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .span-2 {
      grid-column: 1 / -1;
    }

    .form-group {
      position: relative;
    }

    .form-group label {
      display: block;
      font-weight: 500;
      margin-bottom: 0.75rem;
      color: var(--text-secondary);
    }

    .magical-input, .magical-input:focus {
      width: 100%;
      padding: 1.25rem;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: var(--radius);
      color: white;
      font-size: 1rem;
      backdrop-filter: blur(20px);
      transition: var(--transition);
      resize: vertical;
    }

    .magical-input:focus {
      border-color: var(--glass-border);
      box-shadow: var(--shadow-glow);
      transform: translateY(-1px);
    }

    .magical-input::placeholder {
      color: rgba(255, 255, 255, 0.4);
    }

    textarea.magical-input {
      font-family: inherit;
    }

    .form-actions {
      display: flex;
      justify-content: center;
    }

    .btn-primary[disabled] {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none !important;
    }

    @media (max-width: 768px) {
      .form-grid {
        grid-template-columns: 1fr;
      gap: 1.5rem;
    }
    
    .create-card {
      padding: 2rem 1.5rem;
      margin: 0;
    }
    
    .create-card h1 {
      font-size: 2rem;
    }
    
    .magical-input {
      background: rgba(255, 255, 255, 0.12);
      border-color: rgba(255, 255, 255, 0.2);
    }
    
    .magical-input::placeholder {
      color: rgba(255, 255, 255, 0.65);
    }
  }
  `]
})
export class CreateRideComponent {
  formData: Partial<Ride> = {
    from: '',
    to: '',
    date: '',
    time: '',
    price: '',
    seats: '',
    description: ''
  };

  isValid() {
    return !!(this.formData.from && this.formData.to && this.formData.date && 
            this.formData.time && this.formData.price && this.formData.seats);
  }

  submit() {
    if (this.isValid()) {
      alert('Trajet magique créé avec succès ! 🎉');
      this.resetForm();
    }
  }

  private resetForm() {
    this.formData = {
      from: '',
      to: '',
      date: '',
      time: '',
      price: '',
      seats: '',
      description: ''
    };
  }
}
