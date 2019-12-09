import { Component } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { ListaSeleccion } from './listaSeleccion';
import { HttpClient}from '@angular/common/http';
import { AppService } from './app.service';
import { parametro } from './parametro';


export class marcacionError implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  formulario = new FormGroup({
    correo : new FormControl('', [
    Validators.required,
    Validators.email,
    Validators.minLength(4)
  ]),
  nombre : new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1 ]+$')
  ]),
  tipoId : new FormControl('', [
    Validators.required,
  ]),
  documento : new FormControl('', [
    Validators.required,       
    Validators.minLength(7),
    Validators.maxLength(10),
    Validators.pattern('^([0-9])*$')
  ]),
  pais : new FormControl('', [
    Validators.required
  ]),
  celular : new FormControl('', [
    Validators.required,    
    Validators.minLength(10),
    Validators.maxLength(10),
    Validators.pattern('^([0-9])*$')
  ]),
  condiciones : new FormControl('', [
    Validators.requiredTrue
  ]),
  });

  matcher = new marcacionError();

  tiposDocumentos = [];
  paises :Array<parametro>;
  listas : ListaSeleccion;

  constructor(protected services : AppService){
    this.listas = new ListaSeleccion();
    this.tiposDocumentos = this.listas.tiposDocumentos;
    this.consultarPaises();
  }

  consultarPaises(){

    this.services.consultarPaises().subscribe(
        data => {
          this.paises = new Array();
          let resultado = Object.values(data);
          for(var i = 0; i< resultado.length; i++){
            let pais: parametro = {valor: resultado[i]['alpha3Code'], label: resultado[i]['name']};
            this.paises.push(pais);
          }
           
  });
}
}
