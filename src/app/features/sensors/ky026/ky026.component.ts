import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SensorService } from '../sensor.service';

@Component({
  selector: 'app-ky026',
  standalone: false,
  templateUrl: './ky026.component.html',
  styleUrl: './ky026.component.css'
})
export class Ky026Component {

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

  onSubmit(): void {
    if (this.sensorForm.invalid || this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;
    const estado = this.sensorForm.get('estado')?.value;

    this.sensorService.sendKY026Reading(estado).subscribe({
      next: () => {
        this.message = 'KY026 reading sent successfully';
        this.messageType = 'success';
        this.isSubmitting = false;
      },
      error: (err) => {
        this.message = 'Error sending reading: ' + (err.error?.error || 'Unknown error');
        this.messageType = 'danger';
        this.isSubmitting = false;
      }
    });
  }

}
