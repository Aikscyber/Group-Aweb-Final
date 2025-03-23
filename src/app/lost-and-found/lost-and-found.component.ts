import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lost-and-found',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lost-and-found.component.html',
  styleUrl: './lost-and-found.component.css'
})
export class LostAndFoundComponent {
  displayedLost = 6;
  displayedFound = 6;

  lostAnimals = [
    { name: 'Buddy', breed: 'Golden Retriever', age: '3 years', color: 'Golden', gender: 'Male', behavior: 'Friendly', category: 'Lost', image: 'Lost_goat.png', expanded: false },
    { name: 'Luna', breed: 'Siberian Husky', age: '2 years', color: 'Black & White', gender: 'Female', behavior: 'Shy', category: 'Rescued', image: 'Brent_lost_dog.jpg', expanded: false },
    { name: 'Rocky', breed: 'Bulldog', age: '4 years', color: 'Brown', gender: 'Male', behavior: 'Timid', category: 'Donated', image: 'tonton_lost_dog.jpg', expanded: false },
  ];

  foundAnimals = [
    { name: 'Daisy', breed: 'Shih Tzu', age: '2 years', color: 'White & Brown', gender: 'Female', behavior: 'Timid', category: 'Found', image: 'Daisy_found.jpg', expanded: false },
    { name: 'Cooper', breed: 'Boxer', age: '4 years', color: 'Fawn', gender: 'Male', behavior: 'Loyal', category: 'Rescued', image: 'Oreo_found.jpg', expanded: false },
    { name: 'Milo', breed: 'Dachshund', age: '3 years', color: 'Black & Tan', gender: 'Male', behavior: 'Energetic', category: 'Donated', image: 'Susie_found.jpg', expanded: false },
    { name: 'Sadie', breed: 'Chihuahua', age: '2 years', color: 'Tan', gender: 'Female', behavior: 'Shy', category: 'Found', image: 'Tux_found.jpg', expanded: false },
    { name: 'Bailey', breed: 'German Shepherd', age: '5 years', color: 'Black & Brown', gender: 'Male', behavior: 'Protective', category: 'Rescued', image: 'Nami_found.jpg', expanded: false },
    { name: 'Zoe', breed: 'Corgi', age: '4 years', color: 'Golden', gender: 'Female', behavior: 'Playful', category: 'Found', image: 'Zoe_found.png', expanded: false },
    
  ];

  loadMoreLost() {
    this.displayedLost += 6; // Load 6 more animals each time
  }

  loadMoreFound() {
    this.displayedFound += 6; // Load 6 more animals each time
  }

  // Function to toggle expansion
  toggleExpand(animal: any) {
    animal.expanded = !animal.expanded;
    setTimeout(() => {
      if (animal.expanded) {
        document.addEventListener('click', (event: any) => {
          if (!event.target.closest('.card-body')) {
            animal.expanded = false;
          }
        }, { once: true });
      }
    }, 50);
  }
  
}
