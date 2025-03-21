import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PeaksService } from '../peaks.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-peak1',
  imports: [CommonModule, FormsModule],
  templateUrl: './peak1.component.html',
  styleUrls: ['./peak1.component.scss'], 
  providers: [DatePipe]
})
export class Peak1Component implements OnInit {
  peaks: any[] = [];

  constructor(private peaksService: PeaksService, private datePipe: DatePipe) {}

  ngOnInit() {
    this.loadPeaks();
  }

  // Cargar la lista de picos
  loadPeaks() {
    this.peaksService.getPeaks().subscribe(data => {
      this.peaks = data.map(peak => {
        if (peak.lastClimb) {
          peak.lastClimb = this.datePipe.transform(peak.lastClimb, 'dd/MM/yyyy'); // Formato español
        }
        return peak;
      });
    });
  }

  registerClimb(climbData: any): void {
    const selectedPeak = this.peaks.find(peak => peak.id === parseInt(climbData.peak));
    if (selectedPeak) {
      const today = new Date().toISOString().split('T')[0]; // Fecha actual
      const climbDetails = {
        peak: selectedPeak.id,             // Cambiar 'id' por 'peak'
        date: climbData.date || today,     // Fecha seleccionada o actual
        altitude: climbData.altitude,      // Desnivel acumulado
        distance: climbData.distance       // Kilómetros recorridos
      };
  
      // Registrar los detalles de la subida
      this.peaksService.logClimbDetails(climbDetails).subscribe(
        response => {
          console.log('Detalles de la subida registrados:', response);
          this.loadPeaks(); // Recargar datos desde el servidor
        },
        error => console.error('Error al registrar detalles de la subida:', error)
      );
  
      // Incrementar las subidas en la tabla 'peaks'
      this.peaksService.logClimb({ id: selectedPeak.id, date: climbDetails.date }).subscribe(
        response => {
          if (response.success) {
            console.log('Subida registrada en peaks:', response);
          } else {
            console.error('Error en la respuesta:', response);
          }
        },
        error => {
          console.error('Error al actualizar peaks:', error);
        }
      );
      
    }
  }
  
  
}
