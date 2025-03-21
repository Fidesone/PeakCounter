import { Routes } from '@angular/router';
import { Peak1Component } from './peak1/peak1.component';
import { MainComponent } from './main/main.component';
import { Peak2Component } from './peak2/peak2.component';
import { Peak3Component } from './peak3/peak3.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
   { path: '', component: MainComponent },
   { path: 'peak1', component: Peak1Component }, 
   { path: 'peak2', component: Peak2Component },
   { path: 'peak3', component: Peak3Component }, 
   { path: 'register', component: RegisterComponent },
   { path: 'login', component: LoginComponent },

];
