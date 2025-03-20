import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeaksService } from '../peaks.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-peak1',
  imports: [CommonModule, FormsModule],
  templateUrl: './peak1.component.html',
  styleUrls: ['./peak1.component.scss']
})
export class Peak1Component implements OnInit {
  peaks: any[] = [];

  constructor(private peaksService: PeaksService) {}

  ngOnInit() {
    this.loadPeaks();
  }

  // Cargar la lista de picos
  loadPeaks() {
    this.peaksService.getPeaks().subscribe(data => {
      this.peaks = data;
    });
  }

  // Registrar una subida
  registerClimb(climbData: any) {
    const selectedPeak = this.peaks.find(peak => peak.id === parseInt(climbData.peak));
    if (selectedPeak) {
      const today = new Date().toISOString().split('T')[0]; // Fecha actual
      selectedPeak.climbs++;
      selectedPeak.lastClimb = climbData.date || today;
      alert(`Ascensión registrada para ${selectedPeak.name} el ${selectedPeak.lastClimb}`);
      
      // Si quieres que esta información sea persistida en el backend
      this.peaksService.logClimb(selectedPeak.id).subscribe(response => {
        this.loadPeaks(); // Recargar los datos actualizados desde el servidor
      });
    }
  }
  
}
