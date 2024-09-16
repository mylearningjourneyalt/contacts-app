import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from '../contacts/contacts.service';
import { last, noop } from 'rxjs';
import { addressTypeValues, phoneTypeValues } from '../contacts/contact.model';
import { restrictedWordsValidator } from '../validators/restricted-words.validator';

@Component({
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css'],
})
export class EditContactComponent implements OnInit {
  phoneTypeValues = phoneTypeValues;
  addressTypeValues = addressTypeValues;
  private contactsService = inject(ContactsService);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  contactForm = this.formBuilder.nonNullable.group({
    id: '',
    icon: '',
    personal: false,
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: '',
    dateOfBirth: <Date | null>null,
    favoritesRanking: <number | null>null,

    phone: this.formBuilder.nonNullable.group({
      phoneNumber: '',
      phoneType: '',
    }),

    address: this.formBuilder.nonNullable.group({
      streetAddress: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      postalCode: '',
      addressType: '',
    }),
    notes: ['', restrictedWordsValidator(['foo', 'barr'])],
  });

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const contactId = this.route.snapshot.params['id'];
    if (!contactId) return;

    this.contactsService.getContact(contactId).subscribe((contact) => {
      if (!contact) return;
      // const patchValues = {
      //   firstName: contact.firstName,
      //   lastName: contact.lastName,
      // };
      // this.contactForm.patchValue(patchValues);
      this.contactForm.setValue(contact);
    });
  }


  get firstName() {
    return this.contactForm.controls.firstName;
  }

  get notes(){
    return this.contactForm.controls.notes;
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
