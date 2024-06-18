import { Component, OnInit } from '@angular/core';
declare var bootstrap: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'PostAppRestaurant';

  ngOnInit(): void {
    const newsletterModal = new bootstrap.Modal(document.getElementById('newsletterModal'));
    newsletterModal.show();
  }
}
