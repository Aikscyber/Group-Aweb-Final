import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  readonly APIUrl = "http://localhost:5038/contacts/";

  constructor(private http: HttpClient) {}

  addContacts(event: Event) {
    event.preventDefault();

    let newContact = {
      fullName: (document.getElementById("FullName") as HTMLInputElement).value,
      email: (document.getElementById("Email") as HTMLInputElement).value,
      address: (document.getElementById("Address") as HTMLInputElement).value, 
      number: (document.getElementById("Number") as HTMLInputElement).value,
      message: (document.getElementById("Message") as HTMLTextAreaElement).value
    };

    this.http.post(this.APIUrl + "AddContact", newContact).subscribe(() => {
      alert("✅ Contact added successfully!");
      this.clearForm();
    }, error => {
      console.error("❌ Error adding the contact", error);
    });
  }

  clearForm() {
    (document.getElementById("FullName") as HTMLInputElement).value = "";
    (document.getElementById("Email") as HTMLInputElement).value = "";
    (document.getElementById("Address") as HTMLInputElement).value = "";
    (document.getElementById("Number") as HTMLInputElement).value = "";
    (document.getElementById("Message") as HTMLTextAreaElement).value = "";
  }

  confirmDelete() {
    let fullName = (document.getElementById("FullName") as HTMLInputElement).value.trim();

    if (!fullName) {
      alert("⚠️ Please enter your full name before deleting.");
      return;
    }

    if (confirm(`Are you sure you want to delete all contacts for ${fullName}?`)) {
      this.deleteContact(fullName);
    }
  }

  deleteContact(fullName: string) {
    this.http.delete(this.APIUrl + `DeleteContacts?name=${fullName}`).subscribe(
      (response: any) => {
        alert(`✅ ${response.message}`);
        this.clearForm();
      },
      (error) => {
        console.error("❌ Error deleting contact", error);
        alert("❌ Failed to delete contacts. Make sure the name is correct.");
      }
    );
  }
}
