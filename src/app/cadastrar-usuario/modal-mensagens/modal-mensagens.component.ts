import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { DialogData } from '../cadastrar-usuario.component';

@Component({
  selector: 'app-modal-mensagens',
  templateUrl: './modal-mensagens.component.html',
  styleUrls: ['./modal-mensagens.component.css']
})
export class ModalMensagensComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  @Input() tituloModal!:string;
  @Input() textoModal!:string;

}
