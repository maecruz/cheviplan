import {parametro} from './parametro';
import { AppService } from './app.service';

export class ListaSeleccion{
    tiposDocumentos: parametro[] = [
      {valor: 'CC', label: 'Cédula'},
      {valor: 'CE', label: 'Cédula de extranjería'},
      {valor: 'NIT', label: 'NIT'},
      {valor: 'PAS', label: 'Pasaporte'}
      
    ];
    paises: parametro[] = new Array();




  }