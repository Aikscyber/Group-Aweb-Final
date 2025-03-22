import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  readonly APIUrl = "http://localhost:5038/contacts/";

  constructor(private http: HttpClient) {}

  addContacts(event: Event) {
    event.preventDefault();

    let newContact = {
      name: (document.getElementById("FullName") as HTMLInputElement).value,
      email: (document.getElementById("Email") as HTMLInputElement).value,
      subject: (document.getElementById("Address") as HTMLInputElement).value,
      message: (document.getElementById("Number") as HTMLInputElement).value
    };

    this.http.post(this.APIUrl + "AddContact", newContact).subscribe(() => {
      alert("You have been added successfully!");
      this.clearForm();
    }, error => {
      console.error("Error adding the contact", error);
    });
  }

  clearForm() {
    (document.getElementById("FullName") as HTMLInputElement).value = "";
    (document.getElementById("Email") as HTMLInputElement).value = "";
    (document.getElementById("Address") as HTMLInputElement).value = "";
    (document.getElementById("Number") as HTMLInputElement).value = "";
  }
  contact_form_header = "Contact Form";
}
