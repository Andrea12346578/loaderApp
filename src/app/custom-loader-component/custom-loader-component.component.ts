// src/app/custom-loader/custom-loader.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-custom-loader',
  template: `
    <div class="custom-loader">
      <img [src]="images[currentIndex]!.src" alt="Loader Image">
      <p>{{ images[currentIndex]!.text }}</p>
    </div>
  `,
  styles: [`
    .custom-loader {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
    .custom-loader img {
      width: 50px;
      height: 50px;
      margin: 5px;
    }
    .custom-loader p {
      font-size: 14px;
      color: #000;
      margin-top: 10px;
    }
  `]
})
export class CustomLoaderComponent implements OnInit, OnDestroy {
  images = [
    { src: 'assets/image1.png', text: 'Cargando datos, por favor espere...' },
    { src: 'assets/image2.png', text: 'Preparando la interfaz de usuario...' },
    { src: 'assets/image3.png', text: 'Optimizando la experiencia...' },
    { src: 'assets/image4.png', text: 'Cargando recursos adicionales...' },
    // Añadir más imágenes y textos según sea necesario
  ];

  currentIndex: number = 0;
  intervalId: any;

  ngOnInit() {
    this.startImageRotation();
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  startImageRotation(): void {
    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }, 2000);
  }
}
