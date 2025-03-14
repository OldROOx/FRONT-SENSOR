import { Component, OnInit, OnDestroy } from '@angular/core';
import { SensorService } from '../sensors/sensor.service';
import { KY026, MQ2 } from '../../core/models/sensor.model';
import { interval, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, OnDestroy {
  // KY026 flame sensor data
  ky026Status: number = 0;
  latestKY026: KY026 | null = null;
  ky026Readings: KY026[] = [];

  // MQ2 gas sensor data
  mq2Status: number = 0;
  latestMQ2: MQ2 | null = null;
  mq2Readings: MQ2[] = [];

  // Error handling
  loadingKY026: boolean = false;
  loadingMQ2: boolean = false;
  errorKY026: string = '';
  errorMQ2: string = '';

  // For auto-refresh
  private refreshSubscription: Subscription | null = null;

  constructor(private sensorService: SensorService) {}

  ngOnInit(): void {
    // Initial data load
    this.loadSensorData();

    // Set up auto-refresh every 10 seconds
    this.refreshSubscription = interval(10000).subscribe(() => {
      this.loadSensorData();
    });
  }

  ngOnDestroy(): void {
    // Clean up subscription when component is destroyed
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  loadSensorData(): void {
    // Load KY026 data
    this.loadingKY026 = true;
    this.errorKY026 = '';
    this.sensorService.getAllKY026Readings().subscribe({
      next: (readings) => {
        this.ky026Readings = readings;
        if (readings.length > 0) {
          this.latestKY026 = readings[0]; // Assuming the API returns sorted readings with newest first
          this.ky026Status = this.latestKY026.estado;
        }
        this.loadingKY026 = false;
      },
      error: (err) => {
        console.error('Error fetching KY026 readings:', err);
        this.errorKY026 = 'Failed to load flame sensor data';
        this.loadingKY026 = false;
      }
    });

    // Load MQ2 data
    this.loadingMQ2 = true;
    this.errorMQ2 = '';
    this.sensorService.getAllMQ2Readings().subscribe({
      next: (readings) => {
        this.mq2Readings = readings;
        if (readings.length > 0) {
          this.latestMQ2 = readings[0]; // Assuming the API returns sorted readings with newest first
          this.mq2Status = this.latestMQ2.estado;
        }
        this.loadingMQ2 = false;
      },
      error: (err) => {
        console.error('Error fetching MQ2 readings:', err);
        this.errorMQ2 = 'Failed to load gas sensor data';
        this.loadingMQ2 = false;
      }
    });
  }

  getKY026StatusText(): string {
    return this.sensorService.getKY026StatusText(this.ky026Status);
  }

  getMQ2StatusText(): string {
    return this.sensorService.getMQ2StatusText(this.mq2Status);
  }

  // Methods to send sensor readings
  simulateKY026Alarm(): void {
    this.sensorService.sendKY026Reading(1).subscribe({
      next: () => this.loadSensorData(),
      error: (err) => console.error('Error sending KY026 alarm:', err)
    });
  }

  simulateKY026Normal(): void {
    this.sensorService.sendKY026Reading(0).subscribe({
      next: () => this.loadSensorData(),
      error: (err) => console.error('Error sending KY026 normal:', err)
    });
  }

  simulateMQ2Alarm(): void {
    this.sensorService.sendMQ2Reading(1).subscribe({
      next: () => this.loadSensorData(),
      error: (err) => console.error('Error sending MQ2 alarm:', err)
    });
  }

  simulateMQ2Normal(): void {
    this.sensorService.sendMQ2Reading(0).subscribe({
      next: () => this.loadSensorData(),
      error: (err) => console.error('Error sending MQ2 normal:', err)
    });
  }
}
