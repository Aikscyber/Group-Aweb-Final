import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { LostAndFoundComponent } from './lost-and-found/lost-and-found.component';
import { AdaptionComponent } from './adaption/adaption.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [  // ✅ Ensure routes is exported
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'lost-and-found', component: LostAndFoundComponent },
  { path: 'adaption', component: AdaptionComponent },
];
