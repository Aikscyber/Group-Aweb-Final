import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-adoptform',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './adoptform.component.html',
  styleUrls: ['./adoptform.component.css']
})
export class AdoptformComponent {
  apiUrl = "http://localhost:5038/adoptions"; // Base API URL
  selectedAnimal: string = '';

  adopter = {
    petName: '',
    fullName: '',
    email: '',
    address: '',
    phone: '',
    hasPets: '',
    petList: '',
    hasChildren: '',
    childrenAges: '',
    homeType: '',
    reason: '',
    petLocation: '',
    fencedYard: '',
    aloneHours: '',
    caretaker: '',
    agreement1: false,
    agreement2: false,
    agreement3: false
  };

  availableAnimals = [
    "Buddy", "Whiskers", "Coco", "Rocky", "Mittens", 
    "Max", "Charlie", "Snowball", "Sunny", "Daisy", 
    "Felix", "Leo"
  ];

  constructor(private http: HttpClient) {}

  enableNextCheckbox(step: number) {
    if (step === 1 && this.adopter.agreement1) {
      this.adopter.agreement2 = false;
    } else if (step === 2 && this.adopter.agreement2) {
      this.adopter.agreement3 = false;
    }
  }

  submitForm() {
    if (this.adopter.agreement1 && this.adopter.agreement2 && this.adopter.agreement3) {
      this.adopter.petName = this.selectedAnimal; // Assign pet name
      this.adopter.caretaker = this.adopter.fullName; // Assign caretaker

      this.http.post(`${this.apiUrl}/SubmitAdoption`, this.adopter).subscribe(
        (response: any) => {
          console.log("✅ Adoption submitted:", response);
          alert("Adoption request submitted successfully!");
          this.resetForm(); // Clear form after submission
        },
        (error) => {
          console.error("❌ Error submitting adoption:", error);
          alert("Failed to submit adoption request.");
        }
      );
    } else {
      alert("You must agree to all adoption terms!");
    }
  }

  deleteAdoption() {
    if (!this.adopter.fullName) {
      alert("Please enter the Full Name of the adopter to delete the request.");
      return;
    }
  
    if (!confirm(`Are you sure you want to delete the adoption request for ${this.adopter.fullName}?`)) {
      return;
    }
  
    this.http.delete(`${this.apiUrl}/DeleteAdoption?name=${encodeURIComponent(this.adopter.fullName)}`).subscribe(
      (response: any) => {
        console.log("✅ Adoption request deleted:", response);
        alert(`Adoption request for ${this.adopter.fullName} deleted successfully!`);
        this.resetForm(); // Clear form after deletion
      },
      (error) => {
        console.error("❌ Error deleting adoption:", error);
        alert("Failed to delete adoption request.");
      }
    );
  }

  resetForm() {
    this.adopter = {
      petName: '',
      fullName: '',
      email: '',
      address: '',
      phone: '',
      hasPets: '',
      petList: '',
      hasChildren: '',
      childrenAges: '',
      homeType: '',
      reason: '',
      petLocation: '',
      fencedYard: '',
      aloneHours: '',
      caretaker: '',
      agreement1: false,
      agreement2: false,
      agreement3: false
    };
    this.selectedAnimal = ''; // Reset selected animal
  }
}
