import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SensorService } from '../sensor.service';
import { MQ2 } from '../../../core/models/sensor.model';

@Component({
  selector: 'app-mq2',
  standalone: false,
  templateUrl: './mq2.component.html',
  styleUrl: './mq2.component.css'
})
export class Mq2Component implements OnInit {
  sensorForm: FormGroup;
  isSubmitting = false;
  message = '';
  messageType = '';

  // Readings history
  readings: MQ2[] = [];
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

    this.sensorService.getAllMQ2Readings().subscribe({
      next: (data) => {
        this.readings = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading MQ2 readings:', err);
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

    console.log('Sending MQ2 reading:', estado);

    this.sensorService.sendMQ2Reading(estado).subscribe({
      next: (response) => {
        console.log('MQ2 response:', response);
        this.message = 'MQ2 reading sent successfully';
        this.messageType = 'success';
        this.isSubmitting = false;

        // Reload readings after successfully sending new data
        this.loadReadings();
      },
      error: (err) => {
        console.error('Error sending MQ2 reading:', err);
        this.message = 'Error sending reading: ' + (err.error?.error || err.message || 'Unknown error');
        this.messageType = 'danger';
        this.isSubmitting = false;
      }
    });
  }

  getStatusText(estado: number): string {
    return this.sensorService.getMQ2StatusText(estado);
  }
}
