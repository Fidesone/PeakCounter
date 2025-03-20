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

  // Registrar una subida
  registerClimb(climbData: any): void {
    const selectedPeak = this.peaks.find(peak => peak.id === parseInt(climbData.peak));
    if (selectedPeak) {
      const today = new Date().toISOString().split('T')[0]; // Fecha actual
      const climbDetails = {
        id: selectedPeak.id,
        date: climbData.date || today, // Fecha seleccionada o la actual
        climbs: selectedPeak.climbs + 1 // Incrementar las subidas
      };

      // Llamada al servicio para persistir los datos
      this.peaksService.logClimb(climbDetails).subscribe(
        response => {
          console.log('Ascensión registrada:', response);
          this.loadPeaks(); // Recargar datos desde el servidor
          console.log('Datos enviados:', climbDetails);
        },
        error => console.error('Error al registrar la ascensión:', error)
      );
    }
  }
}
