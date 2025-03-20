import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeaksService } from '../peaks.service';

@Component({
  selector: 'app-peak1',
  imports: [CommonModule],
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
  registerClimb(peakId: number) {
    this.peaksService.logClimb(peakId).subscribe(response => {
      alert(`Subida registrada: ${response.peak.name}`);
      this.loadPeaks(); // Recarga la lista de picos
    });
  }
}
