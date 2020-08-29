import { Time } from '@angular/common';
import { Categoria } from './Categoria';
import {Lugar} from './Lugar';
export class Actividad {
    public ID_ACTIVIDAD: number;
    public FECHA: Date;
    public HORA: string;
    public DURACION: number;
    public NOMBRE: string;
    public OBSERVACIONES: string;
    public categoria: Categoria;
    public lugare: Lugar;
    constructor(parameters) {
    }
}
