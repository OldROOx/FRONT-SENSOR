import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SensorService } from '../sensor.service';

@Component({
  selector: 'app-ky026',
  standalone: false,
  templateUrl: './ky026.component.html',
  styleUrl: './ky026.component.css'
})
export class Ky026Component implements OnInit {

  sensorForm: FormGroup;
  isSubmitting = false;
  message = '';
  messageType = '';

  constructor(
    private fb: FormBuilder,
    private sensorService: SensorService
  ) {
    this.sensorForm = this.fb.group({
      estado: [0, Validators.required]
    });
  }

  ngOnInit(): void {
    // Component initialization logic
  }

  onSubmit(): void {
    if (this.sensorForm.invalid || this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;
    this.message = '';

    const estado = parseInt(this.sensorForm.get('estado')?.value);

    console.log('Sending KY026 reading:', estado);

    this.sensorService.sendKY026Reading(estado).subscribe({
      next: (response) => {
        console.log('KY026 response:', response);
        this.message = 'KY026 reading sent successfully';
        this.messageType = 'success';
        this.isSubmitting = false;
      },
      error: (err) => {
        console.error('Error sending KY026 reading:', err);
        this.message = 'Error sending reading: ' + (err.error?.error || err.message || 'Unknown error');
        this.messageType = 'danger';
        this.isSubmitting = false;
      }
    });
  }
}
