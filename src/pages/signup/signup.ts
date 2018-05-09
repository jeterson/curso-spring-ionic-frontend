import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoService } from '../../services/domain/estado.service';
import { EstadoDTO } from '../../models/estado.dto';
import { CiadadeDTO } from '../../models/cidade.dto';
import { ClienteService } from '../../services/domain/cliente.service';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;
  estados: EstadoDTO[] = [];
  cidades: CiadadeDTO[] = [];
  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public cidadeService: CidadeService, public estadoService: EstadoService, public clienteService: ClienteService) {
    this.formGroup = this.formBuilder.group({
      nome: ['Joaquim', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      email: ['joaquim@gmail.com', [Validators.required, Validators.email]],
      tipoCliente: ['1', [Validators.required]],
      cpfChpj: ['06134596280', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
      senha: ['123', [Validators.required]],
      logradouro: ['Rua Via', [Validators.required]],
      numero: ['25', [Validators.required]],
      complemento: ['Apto 3', []],
      bairro: ['Copacabana', []],
      cep: ['10828333', [Validators.required]],
      telefone1: ['977261827', [Validators.required]],
      telefone2: ['', []],
      telefone3: ['', []],
      estadoId: [null, [Validators.required]],
      cidadeId: [null, [Validators.required]]
    });


  }

  signupUser() {
    this.clienteService.insert(this.formGroup.value).subscribe(res => {
      this.showInsertOk();
    }, error => {

    });
  }

  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso', message: 'Cadastro Efetuado com sucesso', enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });

    alert.present();
  }

  ionViewDidLoad() {
    this.estadoService.findAll().subscribe(res => {
      this.estados = res;
      this.formGroup.controls.estadoId.setValue(this.estados[0].id);
      this.updateCidades();
    }, error => { });
  }

  updateCidades() {
    let estadoId = this.formGroup.value.estadoId;
    this.cidadeService.findAll(estadoId).subscribe(res => {
      this.cidades = res;
      this.formGroup.controls.cidadeId.setValue(null);
    }, error => { });
  }




}
