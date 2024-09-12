import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from '../contacts/contacts.service';

@Component({
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css'],
})
export class EditContactComponent implements OnInit {
  private contactsService = inject(ContactsService);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  contactForm = this.formBuilder.nonNullable.group({
    id: '',
    firstName: '',
    lastName: '',
    dateOfBirth: <Date | null> null,
    favoritesRanking: <number | null> null,

    phone: this.formBuilder.nonNullable.group({
      phoneNumber: '',
      phoneType: '',
    }),

    address: this.formBuilder.nonNullable.group({
      streetAddress: '',
      city: '',
      state: '',
      postalCode: '',
      addressType: '',
    }),
  });

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const contactId = this.route.snapshot.params['id'];
    if (!contactId) return;

    this.contactsService.getContact(contactId).subscribe((contact) => {
      if (!contact) return;
      this.contactForm.controls.id.setValue(contact.id);
      this.contactForm.controls.firstName.setValue(contact.firstName);
      this.contactForm.controls.lastName.setValue(contact.lastName);
      this.contactForm.controls.dateOfBirth.setValue(contact.dateOfBirth);
      this.contactForm.controls.favoritesRanking.setValue(
        contact.favoritesRanking
      );

      this.contactForm.controls.phone.controls.phoneNumber.setValue(
        contact.phone.phoneNumber
      );
      this.contactForm.controls.phone.controls.phoneType.setValue(
        contact.phone.phoneType
      );
      this.contactForm.controls.address.controls.streetAddress.setValue(
        contact.address.streetAddress
      );
      this.contactForm.controls.address.controls.city.setValue(
        contact.address.city
      );
      this.contactForm.controls.address.controls.state.setValue(
        contact.address.state
      );
      this.contactForm.controls.address.controls.postalCode.setValue(
        contact.address.postalCode
      );
      this.contactForm.controls.address.controls.addressType.setValue(
        contact.address.addressType
      );
    });
  }

  saveContact() {
    //getRawValue() always returns a value even if a formcontrol is disabled
    //instead of using this.formGroup.value
    this.contactsService.saveContact(this.contactForm.getRawValue()).subscribe({
      next: () => this.router.navigate(['contacts']),
    });
    console.log(this.contactForm.value);
    console.log(this.contactForm.controls.firstName.value);
  }
}
