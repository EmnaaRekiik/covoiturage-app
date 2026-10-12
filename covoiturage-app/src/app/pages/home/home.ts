import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `

    <div class="home-wrap">

      <!-- ══════════════════════════════
           HERO
      ══════════════════════════════ -->
      
      <section class="hero">
        <div class="hero-bg">
          <svg class="hero-svg" viewBox="0 0 1440 420" fill="none" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            <rect width="1440" height="520" fill="#E1F5EE"/>
            <circle cx="1240" cy="90" r="110" fill="#9FE1CB" opacity=".4"/>
            <circle cx="1240" cy="90" r="65"  fill="#5DCAA5" opacity=".5"/>
            <ellipse cx="180"  cy="460" rx="340" ry="160" fill="#9FE1CB" opacity=".3"/>
            <ellipse cx="900"  cy="490" rx="560" ry="130" fill="#5DCAA5" opacity=".2"/>
            <ellipse cx="1420" cy="490" rx="300" ry="110" fill="#1D9E75" opacity=".2"/>
           <!-- waves -->
<path d="M0 270 Q720 190 1440 270 L1440 420 L0 420Z" fill="#0F6E56"/>
<path d="M0 292 Q720 214 1440 292 L1440 420 L0 420Z" fill="#085041"/>

<!-- grass stripes -->
<rect x="60"   y="308" width="90" height="9" rx="4" fill="#9FE1CB" opacity=".5"/>
<rect x="270"  y="298" width="90" height="9" rx="4" fill="#9FE1CB" opacity=".5"/>
<rect x="480"  y="290" width="90" height="9" rx="4" fill="#9FE1CB" opacity=".5"/>
<rect x="690"  y="286" width="90" height="9" rx="4" fill="#9FE1CB" opacity=".5"/>
<rect x="900"  y="290" width="90" height="9" rx="4" fill="#9FE1CB" opacity=".5"/>
<rect x="1110" y="298" width="90" height="9" rx="4" fill="#9FE1CB" opacity=".5"/>
<rect x="1310" y="306" width="90" height="9" rx="4" fill="#9FE1CB" opacity=".5"/>

<!-- car -->
<rect x="620" y="190" width="148" height="58" rx="13" fill="#085041"/>
<rect x="640" y="166" width="104" height="38" rx="11" fill="#0F6E56"/>
<rect x="648" y="170" width="40"  height="30" rx="5" fill="#9FE1CB" opacity=".8"/>
<rect x="698" y="170" width="40"  height="30" rx="5" fill="#9FE1CB" opacity=".8"/>
<circle cx="650" cy="252" r="22" fill="#04342C"/>
<circle cx="650" cy="252" r="11" fill="#1D9E75"/>
<circle cx="736" cy="252" r="22" fill="#04342C"/>
<circle cx="736" cy="252" r="11" fill="#1D9E75"/>
<rect x="763" y="202" width="18" height="12" rx="4" fill="#FAC775" opacity=".9"/>

<!-- trees left -->
<rect x="130" y="172" width="11" height="68" rx="4" fill="#085041"/>
<ellipse cx="136" cy="160" rx="30" ry="36" fill="#1D9E75"/>
<rect x="390" y="184" width="11" height="58" rx="4" fill="#085041"/>
<ellipse cx="396" cy="174" rx="26" ry="30" fill="#5DCAA5"/>

<!-- trees right -->
<rect x="1060" y="178" width="11" height="62" rx="4" fill="#085041"/>
<ellipse cx="1066" cy="166" rx="28" ry="32" fill="#1D9E75"/>
<rect x="1280" y="186" width="11" height="55" rx="4" fill="#085041"/>
<ellipse cx="1286" cy="176" rx="24" ry="28" fill="#5DCAA5"/>
            <rect x="1060" y="278" width="11" height="62" rx="4" fill="#0e7964"/>
            <ellipse cx="1066" cy="266" rx="28" ry="32" fill="#1D9E75"/>
            <rect x="1280" y="286" width="11" height="55" rx="4" fill="#085041"/>
            <ellipse cx="1286" cy="276" rx="24" ry="28" fill="#5DCAA5"/>
            <path d="M300 130 Q310 120 320 130" stroke="#0F6E56" stroke-width="2.5" stroke-linecap="round" fill="none"/>
            <path d="M336 108 Q346 98  356 108" stroke="#0F6E56" stroke-width="2.5" stroke-linecap="round" fill="none"/>
            <path d="M920 80  Q930 70  940 80"  stroke="#0F6E56" stroke-width="2.5" stroke-linecap="round" fill="none"/>
          </svg>
        </div>

        <div class="hero-content">
  <div class="hero-badge">🌿 Covoiturage éco-responsable</div>
  <h1>Trouvez votre<br/><span class="accent-word">trajet idéal</span></h1>
  <p class="hero-sub">Partagez la route, économisez et voyagez ensemble vers un avenir plus vert.</p>
</div>

<div class="hero-road-search">
  <div class="search-card">
    <div class="search-fields">

      <div class="search-field">
        <label class="search-label">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" width="13" height="13">
            <circle cx="12" cy="12" r="3"/>
            <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>
          </svg>
          Départ
        </label>
        <input class="search-input" type="text" placeholder="Ville de départ" [(ngModel)]="search.from"/>
      </div>

      <button class="swap-btn" (click)="swapCities()" title="Inverser">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" width="15" height="15">
          <path d="M7 16V4m0 0L3 8m4-4 4 4M17 8v12m0 0 4-4m-4 4-4-4"/>
        </svg>
      </button>

      <div class="search-field">
        <label class="search-label">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" width="13" height="13">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          Destination
        </label>
        <input class="search-input" type="text" placeholder="Ville d'arrivée" [(ngModel)]="search.to"/>
      </div>

      <div class="search-divider"></div>

      <div class="search-field search-field-date">
        <label class="search-label">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" width="13" height="13">
            <rect x="3" y="4" width="18" height="18" rx="2"/>
            <path d="M16 2v4M8 2v4M3 10h18"/>
          </svg>
          Date
        </label>
        <input class="search-input" type="date" [(ngModel)]="search.date"/>
      </div>

      <div class="search-divider"></div>

      <div class="search-field search-field-seats">
        <label class="search-label">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" width="13" height="13">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
          Passagers
        </label>
        <div class="seats-control">
          <button class="seats-btn" (click)="changeSeats(-1)">−</button>
          <span class="seats-val">{{ search.seats }}</span>
          <button class="seats-btn" (click)="changeSeats(1)">+</button>
        </div>
      </div>

    </div>
    <div class="search-divider"></div>
    <button class="search-submit" (click)="doSearch()">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" width="17" height="17">
        <circle cx="11" cy="11" r="8"/>
        <path d="m21 21-4.35-4.35"/>
      </svg>
      Rechercher
    </button>
  </div>

  <a routerLink="/create" class="btn-outline-hero">Proposer un trajet</a>
</div>
      </section>



      <!-- ══════════════════════════════
           HOW IT WORKS
      ══════════════════════════════ -->
      <section class="section how-section">
        <div class="section-inner">
          <div class="section-label">Comment ça marche</div>
          <h2 class="section-title">Simple comme bonjour</h2>
          <p class="section-sub">En 3 étapes, trouvez ou proposez un trajet partagé.</p>

          <div class="steps-grid">
            <div class="step-card">
              <div class="step-num">01</div>
              <div class="step-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" width="26" height="26">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
              </div>
              <h3>Recherchez</h3>
              <p>Indiquez départ, destination et date. Trouvez les trajets disponibles en quelques secondes.</p>
            </div>
            <div class="step-connector">
              <svg viewBox="0 0 40 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 6 H34" stroke="#C8E6D8" stroke-width="1"/>
                <path d="M30 2 L38 6 L30 10" stroke="#C8E6D8" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="step-card">
              <div class="step-num">02</div>
              <div class="step-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" width="26" height="26">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <h3>Choisissez</h3>
              <p>Consultez les profils, les avis et réservez le trajet qui vous convient le mieux.</p>
            </div>
            <div class="step-connector">
              <svg viewBox="0 0 40 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 6 H34" stroke="#C8E6D8" stroke-width="1"/>
                <path d="M30 2 L38 6 L30 10" stroke="#C8E6D8" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="step-card">
              <div class="step-num">03</div>
              <div class="step-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" width="26" height="26">
                  <path d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"/>
                </svg>
              </div>
              <h3>Voyagez</h3>
              <p>Rencontrez votre conducteur, partagez la route et arrivez à destination ensemble.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ══════════════════════════════
           POPULAR ROUTES
      ══════════════════════════════ -->
      <section class="section routes-section">
        <div class="section-inner">
          <div class="section-label">Trajets populaires</div>
          <h2 class="section-title">Les routes les plus empruntées</h2>

          <div class="routes-grid">
            <div class="route-card" *ngFor="let route of popularRoutes">
              <div class="route-top">
                <div class="route-cities">
                  <span class="route-city">{{ route.from }}</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" width="13" height="13" style="color:var(--muted)">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                  <span class="route-city">{{ route.to }}</span>
                </div>
                <span class="route-price">dès {{ route.price }}€</span>
              </div>
              <div class="route-meta">
                <span class="route-tag">{{ route.duration }}</span>
                <span class="route-tag">{{ route.rides }} trajets / sem.</span>
              </div>
              <a routerLink="/search" class="route-link">
                Voir les trajets
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" width="13" height="13">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- ══════════════════════════════
           TESTIMONIALS
      ══════════════════════════════ -->
      <section class="section testi-section">
        <div class="section-inner">
          <div class="section-label">Témoignages</div>
          <h2 class="section-title">Ils nous font confiance</h2>

          <div class="testi-grid">
            <div class="testi-card" *ngFor="let t of testimonials">
              <div class="testi-stars">
                <span class="star" *ngFor="let s of [1,2,3,4,5]">★</span>
              </div>
              <p class="testi-text">{{ t.text }}</p>
              <div class="testi-author">
                <div class="testi-avatar">{{ t.initials }}</div>
                <div>
                  <div class="testi-name">{{ t.name }}</div>
                  <div class="testi-role">{{ t.role }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ══════════════════════════════
           CTA BANNER
      ══════════════════════════════ -->
      <section class="cta-banner">
        <div class="cta-inner">
          <h2>Prêt à partager la route ?</h2>
          <p>Rejoignez 50 000 voyageurs qui font confiance à CovoitGo chaque semaine.</p>
          <div class="cta-actions">
            <a routerLink="/register" class="btn-cta-primary">Créer un compte gratuit</a>
            <a routerLink="/search"   class="btn-cta-ghost">Voir les trajets</a>
          </div>
        </div>
      </section>

      <!-- ══════════════════════════════
           FOOTER
      ══════════════════════════════ -->
      <footer class="footer">
        <div class="footer-inner">

          <div class="footer-brand">
            <div class="footer-logo">
              <div class="footer-logo-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="20" height="20">
                  <path d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"/>
                </svg>
              </div>
              <span class="footer-logo-name">CovoitGo</span>
            </div>
            <p class="footer-desc">Le covoiturage simple, économique et éco-responsable pour tous vos trajets en France.</p>
            <div class="footer-socials">
              <a href="#" class="social-btn" aria-label="Twitter">
                <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.844L1.254 2.25H8.08l4.26 5.632L18.244 2.25Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z"/></svg>
              </a>
              <a href="#" class="social-btn" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" width="15" height="15"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".5" fill="currentColor"/></svg>
              </a>
              <a href="#" class="social-btn" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            </div>
          </div>

          <div class="footer-col">
            <div class="footer-col-title">Produit</div>
            <a routerLink="/search"   class="footer-link">Chercher un trajet</a>
            <a routerLink="/create"   class="footer-link">Proposer un trajet</a>
            <a routerLink="/my-rides" class="footer-link">Mes trajets</a>
            <a routerLink="/profile"  class="footer-link">Mon profil</a>
          </div>

          <div class="footer-col">
            <div class="footer-col-title">Entreprise</div>
            <a href="#" class="footer-link">À propos</a>
            <a href="#" class="footer-link">Blog</a>
            <a href="#" class="footer-link">Presse</a>
            <a href="#" class="footer-link">Carrières</a>
          </div>

          <div class="footer-col">
            <div class="footer-col-title">Support</div>
            <a href="#" class="footer-link">Centre d'aide</a>
            <a href="#" class="footer-link">Contact</a>
            <a href="#" class="footer-link">Conditions d'utilisation</a>
            <a href="#" class="footer-link">Confidentialité</a>
          </div>

        </div>

        <div class="footer-bottom">
          <span>© 2025 CovoitGo. Tous droits réservés.</span>
          <span class="footer-eco">🌿 Ensemble, réduisons notre empreinte carbone</span>
        </div>
      </footer>

    </div>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@400;500&display=swap');

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

      --ff-d: 'Syne', sans-serif;
      --ff-b: 'DM Sans', sans-serif;

      display: block;
      font-family: var(--ff-b);
      background: var(--bg);
      color: var(--text);
    }

    .home-wrap { overflow: hidden; }
.hero-road-search {
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 900px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}
    /* ── HERO ── */
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
}

    .hero-bg {
      position: absolute;
      inset: 0;
      z-index: 0;
    }

    .hero-svg {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 900px;
  padding: 2rem 5vw 0rem;
  text-align: center;
  margin: 0 auto;
  animation: fadeUp 0.6s ease both;
}

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      background: rgba(255,255,255,0.7);
      backdrop-filter: blur(8px);
      border: 0.5px solid var(--g100);
      color: var(--g600);
      font-size: 0.8rem;
      font-weight: 500;
      padding: 0.35rem 0.85rem;
      border-radius: 100px;
      margin-bottom: 1.5rem;
    }

    .hero-content h1 {
      font-family: 'Inter', sans-serif;
      font-size: clamp(2.8rem, 6vw, 4.5rem);
      font-weight: 800;
      line-height: 1.05;
      letter-spacing: -0.04em;
      color: var(--g900);
      margin-bottom: 1.25rem;
    }

    .accent-word { color: var(--g600); }

.hero-sub {
  margin: 0 auto 2rem; /* 🔥 centre horizontalement */
}

    /* ── SEARCH CARD ── */
    .search-card {
      background: rgba(255,255,255,0.85);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid #000; /* 🔥 contour noir */
      border-radius: 20px;
      padding: 1.25rem;
      box-shadow: 0 8px 40px rgba(15, 110, 86, 0.12);
      margin-bottom: 1.5rem;
      display: flex;
      gap: 0.75rem;
      align-items: stretch;
      animation: fadeUp 0.6s 0.15s ease both;
    }

    .search-fields {
      display: flex;
      align-items: center;
      flex: 1;
      gap: 0;
      min-width: 0;
      color: #1a1a1a;
    }

    .search-field {
      color: #1a1a1a;
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
      padding: 0 1rem;
      flex: 1;
      min-width: 0;
    }

    .search-field-date  { flex: 0.8; }
    .search-field-seats { flex: 0.65; }

    .search-label {
      display: flex;
      align-items: center;
      gap: 0.3rem;
      font-size: 0.7rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #1a1a1a;
      white-space: nowrap;
    }

    .search-input {
      border: none;
      outline: none;
      background: transparent;
      font-family: var(--ff-b);
      font-size: 0.9rem;
      font-weight: 500;
      color: #1a1a1a;
      width: 100%;
      padding: 0;
    }

    .search-input::placeholder { color: #1a1a1a; }

    /* date input styling */
    .search-input[type="date"] {
      color: #1a1a1a;
      cursor: pointer;
    }
    .search-input[type="date"]::-webkit-calendar-picker-indicator {
      opacity: 0.4;
      cursor: pointer;
      color: #1a1a1a;
    }

    /* swap button */
    .swap-btn {
      flex-shrink: 0;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: 0.5px solid var(--border);
      background: var(--g50);
      color: var(--g600);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background 0.2s, transform 0.2s;
      align-self: center;
    }

    .swap-btn:hover {
      background: var(--g600);
      color: #fff;
      transform: rotate(180deg);
    }

    /* vertical dividers */
    .search-divider {
      width: 0.5px;
      background: black;
      align-self: stretch;
      flex-shrink: 0;
      
    }

    /* seats stepper */
    .seats-control {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .seats-btn {
      width: 22px;
      height: 22px;
      border-radius: 50%;
      border: 0.5px solid var(--border);
      background: var(--g50);
      color: var(--g600);
      font-size: 1rem;
      line-height: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background 0.15s, color 0.15s;
      padding: 0;
    }

    .seats-btn:hover { background: var(--g600); color: #fff; }

    .seats-val {
      font-size: 0.9rem;
      font-weight: 600;
      color: var(--g900);
      min-width: 16px;
      text-align: center;
    }

    /* search submit */
    .search-submit {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: var(--g600);
      color: #fff;
      border: none;
      padding: 0 1.5rem;
      border-radius: 14px;
      font-family: var(--ff-b);
      font-size: 0.9rem;
      font-weight: 500;
      cursor: pointer;
      white-space: nowrap;
      flex-shrink: 0;
      transition: background 0.2s, transform 0.15s;
    }

    .search-submit:hover { background: var(--g800); transform: translateY(-1px); }

    /* ── HERO CTAs ── */
.hero-ctas { 
  display: flex;
  justify-content: center; /* 🔥 centre horizontalement */
  gap: 1rem;
  flex-wrap: wrap;
}

    .btn-outline-hero {
      display: inline-flex;
      align-items: center;
      padding: 0.85rem 1.75rem;
      border-radius: 100px;
      border: 1px solid var(--g600);
      color: var(--g600);
      font-size: 0.95rem;
      font-weight: 500;
      text-decoration: none;
      background: rgba(255,255,255,0.8);
      backdrop-filter: blur(6px);
      transition: background 0.2s, color 0.2s;
    }

    .btn-outline-hero:hover { background:#fff; color:  var(--g600); }

    /* ── STATS BAR ── */
    .stats-bar { background: var(--g800); padding: 2rem 5vw; }

    .stats-inner {
      max-width: 1100px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 3rem;
      flex-wrap: wrap;
    }

    .stat-item { display: flex; flex-direction: column; align-items: center; gap: 0.2rem; }

    .stat-n {
      font-family: 'Inter', sans-serif;
      font-size: 1.55rem;
      font-weight: 800;
      color: #fff;
      letter-spacing: -0.03em;
    }

    .stat-l { font-size: 0.78rem; color: var(--g100); font-weight: 500; }

    .stat-sep { width: 0.5px; height: 38px; background: rgba(255,255,255,0.15); }

    /* ── SHARED SECTION STYLES ── */
    .section { padding: 5rem 5vw; }

    .section-inner { max-width: 1100px; margin: 0 auto; }

    .section-label {
      display: inline-block;
      font-size: 0.75rem;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--g600);
      background: var(--g50);
      border: 0.5px solid var(--g100);
      padding: 0.3rem 0.85rem;
      border-radius: 100px;
      margin-bottom: 1rem;
    }

    .section-title {
      font-family: 'Inter', sans-serif;
      font-size: clamp(1.75rem, 3.5vw, 2.4rem);
      font-weight: 800;
      letter-spacing: -0.04em;
      color: var(--g900);
      margin-bottom: 0.6rem;
    }

    .section-sub {
      font-size: 0.975rem;
      color: var(--muted);
      margin-bottom: 3rem;
      max-width: 500px;
    }

    /* ── HOW IT WORKS ── */
    .how-section { background: var(--surface); }

    .steps-grid { display: flex; align-items: center; gap: 0; }

    .step-card {
      flex: 1;
      background: var(--bg);
      border: 0.5px solid var(--border);
      border-radius: 20px;
      padding: 2rem 1.75rem;
      transition: transform 0.2s, border-color 0.2s;
    }

    .step-card:hover { transform: translateY(-4px); border-color: var(--g200); }

    .step-num {
      font-family: 'Inter', sans-serif;
      font-size: 0.75rem;
      font-weight: 800;
      color: var(--g200);
      letter-spacing: 0.1em;
      margin-bottom: 1rem;
    }

    .step-icon {
      width: 50px;
      height: 50px;
      background: var(--g50);
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--g600);
      margin-bottom: 1.25rem;
      border: 0.5px solid var(--g100);
    }

    .step-card h3 {
      font-family: 'Inter', sans-serif;
      font-size: 1.05rem;
      font-weight: 700;
      color: var(--g900);
      margin-bottom: 0.5rem;
    }

    .step-card p { font-size: 0.875rem; color: var(--muted); line-height: 1.65; }

    .step-connector {
      width: 48px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* ── POPULAR ROUTES ── */
    .routes-section { background: var(--bg); }

    .routes-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.25rem;
    }

    .route-card {
      background: var(--surface);
      border: 0.5px solid var(--border);
      border-radius: 18px;
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      transition: border-color 0.2s, transform 0.2s;
    }

    .route-card:hover { border-color: var(--g200); transform: translateY(-3px); }

    .route-top { display: flex; justify-content: space-between; align-items: center; }
    .route-cities { display: flex; align-items: center; gap: 0.5rem; }

    .route-city {
      font-family: 'Inter', sans-serif;
      font-size: 1rem;
      font-weight: 700;
      color: var(--g900);
    }

    .route-price {
      font-family: 'Inter', sans-serif;
      font-size: 0.95rem;
      font-weight: 800;
      color: var(--g600);
    }

    .route-meta { display: flex; gap: 0.5rem; flex-wrap: wrap; }

    .route-tag {
      font-size: 0.78rem;
      color: var(--muted);
      background: var(--bg);
      border: 0.5px solid var(--border);
      padding: 0.25rem 0.7rem;
      border-radius: 100px;
    }

    .route-link {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      font-size: 0.85rem;
      font-weight: 500;
      color: var(--g600);
      text-decoration: none;
      margin-top: auto;
      transition: gap 0.2s;
    }

    .route-link:hover { gap: 0.7rem; }

    /* ── TESTIMONIALS ── */
    .testi-section { background: var(--surface); }

    .testi-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.25rem;
    }

    .testi-card {
      background: var(--bg);
      border: 0.5px solid var(--border);
      border-radius: 18px;
      padding: 1.75rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      transition: border-color 0.2s;
    }

    .testi-card:hover { border-color: var(--g200); }

    .testi-stars { display: flex; gap: 2px; }
    .star { color: #BA7517; font-size: 0.9rem; }
    .testi-text { font-size: 0.9rem; color: var(--text); line-height: 1.7; flex: 1; }

    .testi-author {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding-top: 1rem;
      border-top: 0.5px solid var(--border);
    }

    .testi-avatar {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: var(--g50);
      border: 0.5px solid var(--g100);
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: var(--ff-d);
      font-size: 0.72rem;
      font-weight: 700;
      color: var(--g600);
      flex-shrink: 0;
    }

    .testi-name { font-size: 0.875rem; font-weight: 500; color: var(--g900); }
    .testi-role { font-size: 0.78rem; color: var(--muted); }

    /* ── CTA BANNER ── */
    .cta-banner {
      background: var(--g800);
      padding: 5rem 5vw;
      position: relative;
      overflow: hidden;
    }

    .cta-banner::before {
      content: '';
      position: absolute;
      inset: 0;
      background-image: radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px);
      background-size: 28px 28px;
      pointer-events: none;
    }

    .cta-inner {
      max-width: 620px;
      margin: 0 auto;
      text-align: center;
      position: relative;
      z-index: 1;
    }

    .cta-inner h2 {
      font-family: 'Inter', sans-serif;
      font-size: clamp(1.75rem, 4vw, 2.75rem);
      font-weight: 800;
      color: #fff;
      letter-spacing: -0.04em;
      margin-bottom: 1rem;
    }

    .cta-inner p { font-size: 1rem; color: var(--g100); line-height: 1.6; margin-bottom: 2.5rem; }

    .cta-actions { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }

    .btn-cta-primary {
      display: inline-flex;
      align-items: center;
      background: #fff;
      color: var(--g800);
      padding: 0.9rem 2rem;
      border-radius: 100px;
      font-family: var(--ff-b);
      font-size: 0.95rem;
      font-weight: 500;
      text-decoration: none;
      transition: opacity 0.2s;
    }

    .btn-cta-primary:hover { opacity: 0.88; }

    .btn-cta-ghost {
      display: inline-flex;
      align-items: center;
      padding: 0.9rem 2rem;
      border-radius: 100px;
      border: 1px solid rgba(255,255,255,0.3);
      color: #fff;
      font-size: 0.95rem;
      font-weight: 500;
      text-decoration: none;
      transition: background 0.2s;
    }

    .btn-cta-ghost:hover { background: rgba(255,255,255,0.1); }

    /* ── FOOTER ── */
    .footer { background: var(--g900); padding: 4rem 5vw 0; }

    .footer-inner {
      max-width: 1100px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1fr;
      gap: 3rem;
      padding-bottom: 3rem;
      border-bottom: 0.5px solid rgba(255,255,255,0.08);
    }

    .footer-logo { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; }

    .footer-logo-icon {
      width: 36px;
      height: 36px;
      background: rgba(255,255,255,0.1);
      border-radius: 9px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--g100);
    }

    .footer-logo-name {
      font-family: 'Inter', sans-serif;
      font-size: 1.1rem;
      font-weight: 800;
      color: #fff;
      letter-spacing: -0.03em;
    }

    .footer-desc {
      font-size: 0.875rem;
      color: rgba(255,255,255,0.4);
      line-height: 1.65;
      margin-bottom: 1.5rem;
      max-width: 280px;
    }

    .footer-socials { display: flex; gap: 0.5rem; }

    .social-btn {
      width: 34px;
      height: 34px;
      border-radius: 8px;
      background: rgba(255,255,255,0.07);
      border: 0.5px solid rgba(255,255,255,0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgba(255,255,255,0.5);
      text-decoration: none;
      transition: background 0.2s, color 0.2s, border-color 0.2s;
    }

    .social-btn:hover { background: var(--g600); color: #fff; border-color: var(--g600); }

    .footer-col { display: flex; flex-direction: column; gap: 0.75rem; }

    .footer-col-title {
      font-family: 'Inter', sans-serif;
      font-size: 0.78rem;
      font-weight: 700;
      color: #fff;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin-bottom: 0.25rem;
    }

    .footer-link {
      font-size: 0.875rem;
      color: rgba(255,255,255,0.42);
      text-decoration: none;
      transition: color 0.2s;
    }

    .footer-link:hover { color: var(--g100); }

    .footer-bottom {
      max-width: 1100px;
      margin: 0 auto;
      padding: 1.5rem 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.5rem;
      font-size: 0.78rem;
      color: rgba(255,255,255,0.28);
    }

    /* ── RESPONSIVE ── */
    @media (max-width: 900px) {
      .steps-grid { flex-direction: column; gap: 0.5rem; }
      .step-connector { transform: rotate(90deg); }
      .footer-inner { grid-template-columns: 1fr 1fr; }
      .footer-brand { grid-column: span 2; }
    }

    @media (max-width: 768px) {
      .search-card {
        flex-direction: column;
        gap: 1rem;
      }

      .search-fields {
        flex-direction: column;
        align-items: stretch;
        gap: 0.75rem;
      }

      .search-field {
        padding: 0.75rem 1rem;
        background: var(--g50);
        border: 0.5px solid var(--border);
        border-radius: 12px;
        flex: unset;
      }

      .search-field-date,
      .search-field-seats { flex: unset; }

      .search-divider { display: none; }

      .swap-btn { display: none; }

      .search-submit {
        padding: 0.9rem;
        justify-content: center;
        border-radius: 12px;
      }
    }

    @media (max-width: 600px) {
      .stats-inner { gap: 1.5rem; }
      .stat-sep { display: none; }
      .footer-inner { grid-template-columns: 1fr; gap: 2rem; }
      .footer-brand { grid-column: span 1; }
      .hero-content { padding: 3rem 1.25rem 8rem; }
      .section { padding: 3.5rem 1.25rem; }
      .cta-banner { padding: 3.5rem 1.25rem; }
    }
  `]
})
export class HomeComponent {

  search = {
    from: '',
    to: '',
    date: '',
    seats: 1
  };

  popularRoutes = [
    { from: 'Paris',    to: 'Lyon',         price: 18, duration: '2h',    rides: 42 },
    { from: 'Lyon',     to: 'Marseille',    price: 22, duration: '1h45',  rides: 35 },
    { from: 'Paris',    to: 'Bordeaux',     price: 25, duration: '3h30',  rides: 28 },
    { from: 'Toulouse', to: 'Montpellier',  price: 12, duration: '1h30',  rides: 24 },
    { from: 'Nice',     to: 'Cannes',       price: 8,  duration: '45min', rides: 31 },
    { from: 'Nantes',   to: 'Rennes',       price: 10, duration: '1h15',  rides: 19 },
  ];

  testimonials = [
    {
      text: 'Grâce à CovoitGo, je fais Paris-Lyon deux fois par semaine pour presque rien. Les conducteurs sont toujours sympas et ponctuels.',
      name: 'Sophie M.',
      initials: 'SM',
      role: 'Consultante, Paris'
    },
    {
      text: "En tant que conducteur, j'amortis facilement mes frais d'autoroute. L'appli est bien pensée et les paiements sont rapides.",
      name: 'Karim B.',
      initials: 'KB',
      role: 'Conducteur régulier, Lyon'
    },
    {
      text: 'Interface claire, profils vérifiés, avis fiables. Enfin une appli de covoiturage qui inspire vraiment confiance.',
      name: 'Marie-Claire T.',
      initials: 'MT',
      role: 'Enseignante, Bordeaux'
    },
  ];

  swapCities() {
    const tmp = this.search.from;
    this.search.from = this.search.to;
    this.search.to = tmp;
  }

  changeSeats(delta: number) {
    const next = this.search.seats + delta;
    if (next >= 1 && next <= 8) this.search.seats = next;
  }

  doSearch() {
    // Navigate to /search with query params
    console.log('Search:', this.search);
  }
}