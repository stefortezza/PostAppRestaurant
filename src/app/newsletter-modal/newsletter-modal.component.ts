import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

declare var bootstrap: any;

@Component({
  selector: 'app-newsletter-modal',
  templateUrl: './newsletter-modal.component.html',
  styleUrls: ['./newsletter-modal.component.scss'],
})
export class NewsletterModalComponent implements OnInit{
  @ViewChild('registrationForm') registrationForm!: NgForm;

  ngOnInit() {
    // Controlla se l'utente ha già visto il modal
    const isModalShown = localStorage.getItem('isNewsletterModalShown');
    if (!isModalShown) {
      // Mostra il modal
      const newsletterModalElement = document.getElementById('newsletterModal');
      if (newsletterModalElement) {
        const newsletterModal = new bootstrap.Modal(newsletterModalElement);
        newsletterModal.show();

        // Salva lo stato nel Local Storage
        localStorage.setItem('isNewsletterModalShown', 'true');
      }
    }
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const newsletterModalElement = document.getElementById('newsletterModal');
      if (newsletterModalElement) {
        const newsletterModal = new bootstrap.Modal(newsletterModalElement);
        newsletterModal.hide();
      }
    }
  }

}
