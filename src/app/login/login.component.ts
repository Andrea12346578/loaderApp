import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { LoaderService } from '../services/loader.service';
import { CustomLoaderComponent } from '../custom-loader-component/custom-loader-component.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;  // Formulario de inicio de sesión

  showLoaderFlag: boolean = false;
  
  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private loaderService: LoaderService
  ) {
    // Inicializar el formulario con validaciones
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],  // Validación de correo electrónico
      password: ['', [Validators.required, Validators.minLength(6)]]  // Validación de contraseña
    });
  }

  // Función para manejar el envío del formulario
  onLogin() {
    if (this.loginForm.valid) {
      // Aquí puedes agregar la lógica para la autenticación del usuario, como una llamada a un API
      console.log('Email:', this.loginForm.value.email);
      console.log('Password:', this.loginForm.value.password);
      // Simulamos la redirección a la página de inicio tras un inicio de sesión exitoso
      this.showLoader()
    } else {
      console.log('Formulario no válido');
    }
  }

  async showLoader() {
    await this.loaderService.presentLoader(CustomLoaderComponent, 10000); // Muestra el loader durante 10 segundos
    this.navCtrl.navigateRoot('/home');
  }


}
