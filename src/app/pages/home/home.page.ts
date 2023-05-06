import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { TarefaService } from 'src/app/Services/tarefa.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

ColecaoTarefas : any[]=[]

  constructor(
    private alertCtrl : AlertController,
    private TarefaService : TarefaService,
    private actionSheetCtrl : ActionSheetController
  ) { }

  // Ao terminar de carregar a tela ele chama o metodo ListarTarefas
  ionViewDidEnter() {
    this.ListarTarefas();
  }

  // Este Metodo Recebe as Tarefas que estao dentro do Array
  ListarTarefas(){
      this.ColecaoTarefas = this.TarefaService.ListarTarefas();
  }

  ngOnInit() {
  }

  

  async AddTarefas() {
    const alert = await this.alertCtrl.create({
      header: 'Informe Sua Tarefa',
      inputs: [
        {
          name: 'tarefa',
          type: 'text',
          placeholder: 'Escreva Aqui Sua Tarefa'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
        
          handler: () => {

          }
        }, 
        
        {
          text: 'Salvar',
          // Caso Usuario Aperte em Salvar ele ira iniciar o Tarefa Service 
          // ( Descrição do que ele faz na propria função )
          handler: (tarefa) => {
            this.TarefaService.Salvar(tarefa, () => {
              this.ListarTarefas();
            });
          }
        }
      ]
    });

    await alert.present();
  }


  DeletarTarefa(item: any) {
    this.TarefaService.DeletarTarefa(item, ()=> {
      this.ListarTarefas();
    });

  }

  async AtualizarTarefas(tarefa: any) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: "O QUE DESEJA FAZER?",
      buttons: [{
        text: tarefa.status ? 'Adicionar Novamente' : 'Marcar como Realizado',
        icon: tarefa.status ? 'close-outline' : 'checkmark-circle',
        handler: () => {
          tarefa.status = !tarefa.status;
          
          this.TarefaService.atualizar(tarefa, ()=>{
            this.ListarTarefas();
          })
        }
      }
        , {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
}
