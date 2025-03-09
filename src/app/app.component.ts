import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LostAndFoundComponent } from './lost-and-found/lost-and-found.component';
import { AdaptionComponent } from './adaption/adaption.component';
import { ContactComponent } from './contact/contact.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomeComponent, AboutComponent, LostAndFoundComponent, AboutComponent, AdaptionComponent, ContactComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'final-aweb';
}
