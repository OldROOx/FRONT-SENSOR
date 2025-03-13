import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import {
  SensorRequest,
  ApiResponse
} from '../../core/models/sensor.model';

@Injectable({
  providedIn: 'root'
})
export class SensorService {
  constructor(private apiService: ApiService) { }

  // KY026 flame sensor
  sendKY026Reading(estado: number): Observable<ApiResponse> {
    const sensorRequest: SensorRequest = { estado };
    return this.apiService.post<SensorRequest, ApiResponse>('ky026', sensorRequest);
  }

  // MQ2 gas sensor
  sendMQ2Reading(estado: number): Observable<ApiResponse> {
    const sensorRequest: SensorRequest = { estado };
    return this.apiService.post<SensorRequest, ApiResponse>('mq2', sensorRequest);
  }

  // Textos de estado
  getKY026StatusText(estado: number): string {
    return estado === 1 ? 'Flame Detected' : 'No Flame Detected';
  }

  getMQ2StatusText(estado: number): string {
    return estado === 1 ? 'Gas Detected' : 'No Gas Detected';
  }
}
