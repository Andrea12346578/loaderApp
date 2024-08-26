// src/app/loader.service.ts
import { Injectable, ComponentFactoryResolver, Injector, ApplicationRef, EmbeddedViewRef } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loader: HTMLIonLoadingElement | null = null;

  constructor(
    private loadingController: LoadingController,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef
  ) {}

  async presentLoader(component: any, duration: number = 2000): Promise<void> {
    // Crear el loader
    this.loader = await this.loadingController.create({
      message: '',  // Mensaje vacío ya que manejaremos el contenido dinámicamente
      duration: duration,
      cssClass: 'custom-loader-class'
    });

    await this.loader.present();  // Mostrar el loader

    // Crear un contenedor div para el componente Angular
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.justifyContent = 'center';
    container.style.alignItems = 'center';
    container.style.flexDirection = 'column';

    // Insertar el contenedor en el shadow DOM del loader
    const loaderContent = this.loader.querySelector('.loading-wrapper');
    if (loaderContent) {
      loaderContent.appendChild(container);
    }

    // Crear y agregar el componente Angular al contenedor
    this.createComponent(component, container);

    // Esperar a que el loader se cierre
    await this.loader.onDidDismiss();
  }

  async dismissLoader(): Promise<void> {
    if (this.loader) {
      await this.loader.dismiss();
      this.loader = null;
    }
  }

  private createComponent(component: any, container: HTMLElement): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    const componentRef = componentFactory.create(this.injector);

    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    container.appendChild(domElem);
  }
}
