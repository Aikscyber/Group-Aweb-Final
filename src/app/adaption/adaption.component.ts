import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from '../app.routes';

@Component({
  selector: 'app-adaption', 
  templateUrl: './adaption.component.html',
  imports: [CommonModule, RouterModule, ],
  styleUrls: ['./adaption.component.css']
})
export class AdaptionComponent {
  searchQuery: string = '';   
  selectedCategory: string = 'All';   
  pets = [
    { name: "Buddy", image: "assets/dog_in_street.jpg", description: "Friendly golden retriever looking for a home.", category: "Dogs" },
    { name: "Whiskers", image: "assets/lost_cat.jpg", description: "Calm and loving cat in need of a new home.", category: "Cats" },
    { name: "Coco", image: "assets/2nd_lost_cat.jpg", description: "Energetic parrot with a playful attitude.", category: "Birds" },
    { name: "Rocky", image: "assets/dog_in_street2.jpg", description: "Loyal and playful husky mix searching for a family.", category: "Dogs" },
    { name: "Mittens", image: "assets/lost_cat_2.jpg", description: "Affectionate kitten who loves cuddles.", category: "Cats" },
    { name: "Max", image: "assets/reminder_missing_dog.jpg", description: "Missing dog – help bring Max home!", category: "Dogs" },
    { name: "Charlie", image: "assets/dog_in_street.jpg", description: "A happy labrador who loves to play fetch!", category: "Dogs" },
    { name: "Snowball", image: "assets/lost_cat.jpg", description: "A gentle rabbit looking for a cozy home.", category: "Rabbits" },
    { name: "Sunny", image: "assets/2nd_lost_cat.jpg", description: "A colorful parrot who loves to talk!", category: "Birds" },
    { name: "Daisy", image: "assets/dog_in_street2.jpg", description: "An adorable beagle who loves kids.", category: "Dogs" },
    { name: "Felix", image: "assets/lost_cat_2.jpg", description: "A playful kitten who enjoys exploring.", category: "Cats" },
    { name: "Leo", image: "assets/reminder_missing_dog.jpg", description: "A friendly German shepherd with lots of energy.", category: "Dogs" }
  ];

 
  get filteredPets() {
    return this.pets.filter(pet =>
      (this.selectedCategory === 'All' || pet.category === this.selectedCategory) &&
      (this.searchQuery === '' || pet.name.toLowerCase().includes(this.searchQuery.toLowerCase()))
    );
  }
}
