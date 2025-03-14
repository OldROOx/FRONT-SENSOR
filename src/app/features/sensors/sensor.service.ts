import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import {
  KY026,
  MQ2,
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
    console.log('SensorService: Sending KY026 reading', { estado });
    const sensorRequest: SensorRequest = { estado };
    return this.apiService.post<SensorRequest, ApiResponse>('ky026', sensorRequest);
  }

  // Get all KY026 readings
  getAllKY026Readings(): Observable<KY026[]> {
    return this.apiService.get<KY026[]>('ky026');
  }

  // MQ2 gas sensor
  sendMQ2Reading(estado: number): Observable<ApiResponse> {
    console.log('SensorService: Sending MQ2 reading', { estado });
    const sensorRequest: SensorRequest = { estado };
    return this.apiService.post<SensorRequest, ApiResponse>('mq2', sensorRequest);
  }

  // Get all MQ2 readings
  getAllMQ2Readings(): Observable<MQ2[]> {
    return this.apiService.get<MQ2[]>('mq2');
  }

  // Status text methods
  getKY026StatusText(estado: number): string {
    return estado === 1 ? 'Flame Detected' : 'No Flame Detected';
  }

  getMQ2StatusText(estado: number): string {
    return estado === 1 ? 'Gas Detected' : 'No Gas Detected';
  }
}
