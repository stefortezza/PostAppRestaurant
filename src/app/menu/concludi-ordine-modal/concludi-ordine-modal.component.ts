import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-concludi-ordine-modal',
  templateUrl: './concludi-ordine-modal.component.html',
  styleUrls: ['./concludi-ordine-modal.component.scss'],
})
export class ConcludiOrdineModalComponent implements OnInit {
  selectedDeliveryMethod: string | null = null;

  constructor(
    public dialogRef: MatDialogRef<ConcludiOrdineModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {}

  close(): void {
    this.dialogRef.close();
    this.router.navigate(['/checkout'], { state: { deliveryMethod: this.selectedDeliveryMethod } });
  }

  selectDeliveryMethod(method: string): void {
    this.selectedDeliveryMethod = method;
    if (method === 'Consegna a domicilio') {
      setTimeout(() => {
        const domicilioForm = document.getElementById('domicilioForm');
        if (domicilioForm) {
          domicilioForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
      this.data.addDeliveryCharge();
    } else if (method === 'Ordine al tavolo') {
      setTimeout(() => {
        const tavoloForm = document.getElementById('tavoloForm');
        if (tavoloForm) {
          tavoloForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
      this.data.removeDeliveryCharge();
    }
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(
          'Latitude: ' +
            position.coords.latitude +
            ' Longitude: ' +
            position.coords.longitude
        );
        this.getAddressFromCoordinates(
          position.coords.latitude,
          position.coords.longitude
        );
      });
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }

  getAddressFromCoordinates(latitude: number, longitude: number) {
    const apiKey = 'AIzaSyDrPtKHUbUKDvu45bMOk62O2c80iN2-stQ';
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

    this.http.get<any>(apiUrl).subscribe((data) => {
      const addressComponents = data.results[0].address_components;
      const address = addressComponents.find((component: any) =>
        component.types.includes('route')
      ).long_name;
      const streetNumber = addressComponents.find((component: any) =>
        component.types.includes('street_number')
      ).long_name;
      const city = addressComponents.find((component: any) =>
        component.types.includes('locality')
      ).long_name;

      const addressInput = document.getElementById(
        'address'
      ) as HTMLInputElement;
      const streetNumberInput = document.getElementById(
        'streetNumber'
      ) as HTMLInputElement;
      const cityInput = document.getElementById('city') as HTMLInputElement;

      if (addressInput && streetNumberInput && cityInput) {
        addressInput.value = address;
        streetNumberInput.value = streetNumber;
        cityInput.value = city;
      }
    });
  }
}
