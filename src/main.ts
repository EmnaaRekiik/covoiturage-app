import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => {
    console.error('Failed to bootstrap app:', err);
    document.body.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: center; height: 100vh; font-family: system-ui; color: #666;">
        <div style="text-align: center;">
          <h1 style="font-size: 2rem; margin-bottom: 1rem;">Application failed to start</h1>
          <p>Please refresh the page or check console for details.</p>
        </div>
      </div>
    `;
  });
