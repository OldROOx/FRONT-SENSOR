import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SensorService } from '../sensor.service';
import { KY026 } from '../../../core/models/sensor.model';

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

  // Readings history
  readings: KY026[] = [];
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private sensorService: SensorService
  ) {
    this.sensorForm = this.fb.group({
      estado: [0, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadReadings();
  }

  loadReadings(): void {
    this.loading = true;
    this.error = '';

    this.sensorService.getAllKY026Readings().subscribe({
      next: (data) => {
        this.readings = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading KY026 readings:', err);
        this.error = 'Failed to load sensor history';
        this.loading = false;
      }
    });
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

        // Reload readings after successfully sending new data
        this.loadReadings();
      },
      error: (err) => {
        console.error('Error sending KY026 reading:', err);
        this.message = 'Error sending reading: ' + (err.error?.error || err.message || 'Unknown error');
        this.messageType = 'danger';
        this.isSubmitting = false;
      }
    });
  }

  getStatusText(estado: number): string {
    return this.sensorService.getKY026StatusText(estado);
  }
}
