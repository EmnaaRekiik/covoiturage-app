import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="home-container container fade-in">
      <!-- Floating Hero -->
      <section class="hero-section">
        <div class="hero-content">
          <h1 class="gradient-text hero-title">
            Trouvez votre <span class="magical-word">trajet</span> magique
          </h1>
          <p class="hero-subtitle">Partagez la route avec style, économisez et voyagez éco-responsable</p>
          
          <div class="hero-actions">
            <a routerLink="/search" class="btn-magical btn-primary">🔍 Chercher magique</a>
            <a routerLink="/create" class="btn-magical btn-secondary">✨ Proposer</a>
          </div>
        </div>
        
        <!-- Magical Stats -->
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-number">10K+</div>
            <div class="stat-label">Trajets magiques</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">95%</div>
            <div class="stat-label">Économies</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">50K+</div>
            <div class="stat-label">Voyageurs heureux</div>
          </div>
        </div>
      </section>

      <!-- Particle Background -->
      <div class="hero-particles">
        <div class="particle-big" *ngFor="let p of [].constructor(3); trackBy: trackByFn"></div>
        <div class="particle-small" *ngFor="let p of [].constructor(8); trackBy: trackByFn"></div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .home-container {
      min-height: calc(100vh - 80px);
      position: relative;
      overflow: hidden;
    }

    .hero-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 4rem 2rem;
      min-height: 80vh;
      text-align: center;
      position: relative;
    }

    .hero-content {
      max-width: 800px;
      z-index: 2;
    }

    .hero-title {
      font-size: clamp(2.5rem, 8vw, 5rem);
      font-weight: 800;
      line-height: 1.1;
      margin-bottom: 1.5rem;
    }

    .magical-word {
      position: relative;
      display: inline-block;
    }

    .magical-word::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 0;
      width: 0;
      height: 3px;
      background: var(--accent);
      animation: underlineGrow 2s infinite;
    }

    @keyframes underlineGrow {
      0%, 50% { width: 0; }
      60%, 100% { width: 100%; }
    }

    .hero-subtitle {
      font-size: clamp(1.2rem, 3vw, 1.5rem);
      margin-bottom: 3rem;
      opacity: 0.9;
    }

    .hero-actions {
      display: flex;
      gap: 1.5rem;
      justify-content: center;
      flex-wrap: wrap;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 2rem;
      margin-top: 4rem;
      width: 100%;
    }

    .stat-card {
      background: var(--glass-bg);
      backdrop-filter: blur(20px);
      border: 1px solid var(--glass-border);
      padding: 2rem;
      border-radius: var(--radius);
      text-align: center;
      position: relative;
      overflow: hidden;
    }

    .stat-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: var(--accent);
    }

    .stat-number {
      font-size: 2.5rem;
      font-weight: 800;
      background: var(--accent);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 0.5rem;
      display: block;
    }

    .stat-label {
      font-size: 1rem;
      color: var(--text-secondary);
      font-weight: 600;
    }

    /* Magical Particles */
    .hero-particles {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
    }

    .particle-big {
      position: absolute;
      width: 8px;
      height: 8px;
      background: radial-gradient(circle, var(--accent-glow), transparent);
      border-radius: 50%;
      animation: floatBig 15s infinite linear;
    }

      .particle-small {
      position: absolute;
      width: 2px;
      height: 2px;
      background: var(--accent-glow);
      border-radius: 50%;
      animation: floatSmall 25s infinite linear;
      opacity: 0.5;
    }

    /* Random particle positions with delays */
    .particle-big:nth-child(1) { left: 10%; animation-delay: 0s; }
    .particle-big:nth-child(2) { left: 30%; animation-delay: 3s; }
    .particle-big:nth-child(3) { left: 50%; animation-delay: 6s; }
    .particle-big:nth-child(4) { left: 70%; animation-delay: 9s; }
    .particle-big:nth-child(5) { left: 90%; animation-delay: 12s; }

    @keyframes floatBig {
      0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
      10% { opacity: 1; }
      90% { opacity: 1; }
      100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
    }

    @keyframes floatSmall {
      0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
      10% { opacity: 0.6; }
      90% { opacity: 0.6; }
      100% { transform: translateY(-150vh) rotate(180deg); opacity: 0; }
    }

    @media (max-width: 768px) {
      .hero-actions {
        flex-direction: column;
        align-items: center;
      }
      
      .btn-magical {
        width: 100%;
        max-width: 300px;
      }

      .stats-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }
    }
  `]
})
export class HomeComponent {
  trackByFn = (index: number) => index;
}
