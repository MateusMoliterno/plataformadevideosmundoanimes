import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAuth0 } from '@auth0/auth0-angular';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideHttpClient(), 
    
    provideAuth0({

    domain: 'dev-li34kpbl4i8i4d7e.us.auth0.com',
   
    clientId: 'J2JIQKP7BjnxTozyEOOYDtrzDTeIRPgb',
   
    authorizationParams: {
   
    redirect_uri: window.location.origin,
   
    },
   
    }),
   
    ],
  };