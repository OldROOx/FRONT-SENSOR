import { Component } from '@angular/core';
import { SensorService } from '../sensors/sensor.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  // For now, we'll use static data since the API doesn't support getting latest readings
  ky026Status: number = 0;
  mq2Status: number = 0;

  constructor(private sensorService: SensorService) {}

  getKY026StatusText(): string {
    return this.sensorService.getKY026StatusText(this.ky026Status);
  }

  getMQ2StatusText(): string {
    return this.sensorService.getMQ2StatusText(this.mq2Status);
  }

  // Methods to simulate sensor readings for demo purposes
  simulateKY026Alarm(): void {
    this.ky026Status = 1;
  }

  simulateKY026Normal(): void {
    this.ky026Status = 0;
  }

  simulateMQ2Alarm(): void {
    this.mq2Status = 1;
  }

  simulateMQ2Normal(): void {
    this.mq2Status = 0;
  }
}
