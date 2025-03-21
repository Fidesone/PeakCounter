import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core'; // Necesario para HttpClientModule
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';


bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), // Proporciona las rutas
    importProvidersFrom(HttpClientModule) // Proporciona el módulo HttpClient
  ]
}).catch(err => console.error(err));
