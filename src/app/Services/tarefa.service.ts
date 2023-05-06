import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  // Iniciamos um Array e dps colocamos ele como vazio 
  ColecaoTarefas : any[]=[];
  key = 'ColecaoTarefas';

  constructor() { }



  // Para cada item salvo ele cria um obj com essas caracteristicas
  // obtendo do local storage
  Salvar(tarefa : any,  callback: (() => void) | null = null) {

    tarefa.status = false ;

    // Recebe do Local Storage
    let PegandoDoLocalStorage = localStorage.getItem(this.key)

    // Caso seja nulo ou INdefinido ele ira pegar um obj e add ao ObjTarefas
    // Ou seja ele irá Iniciar uma nova colecao de tarefas caso nao tenha nada 
    if (PegandoDoLocalStorage==null || PegandoDoLocalStorage==undefined) {
      this.ColecaoTarefas.push(tarefa);
      // Aqui recebemos chave e valor e add a tarefa
      // Foi ysado o JSON.stringify pois o setItem só recebe Strings e nós definimos 
      // que a ColecaoTarefas seria um Array 
      localStorage.setItem(this.key, JSON.stringify(this.ColecaoTarefas));
    } 
    
    else {
      // Caso ele encontre alguma tarefa ele ira pegar ela tirar do metodo String 
      let ItensJaSetadosMaisUm : any[] = JSON.parse(PegandoDoLocalStorage);
      // Apos isso ele add a nova tarefa coloca no LocalStorage e Transfomra em String
     ItensJaSetadosMaisUm.push(tarefa);
     localStorage.setItem(this.key, JSON.stringify(ItensJaSetadosMaisUm));
    }

    if (callback != null) {
      callback();
    }
  

  }

  ListarTarefas() {

    let PegandoDoLocalStorage = localStorage.getItem(this.key);

    if (PegandoDoLocalStorage==null || PegandoDoLocalStorage==undefined) {
      return [];
    } 
    else {
      let ItensJaSetados : any[] = JSON.parse(PegandoDoLocalStorage);
      return ItensJaSetados;

    }

  }


  // Esta função recebe o item do storage e se for nulo ou indefinido nao faz nada
  // mas se tiver algo lá ele faz um filtro exibindo todos os itens menos o que foi selecionado
  // e dps salva isso 
  // o filtro pega o nome e faz essa comparaçãp exibindo todos menos o nome que foi passado 
  DeletarTarefa(tarefa : any, callback: (() => void) | null = null){

    let PegandoDoLocalStorage = localStorage.getItem(this.key);

    if (PegandoDoLocalStorage==null || PegandoDoLocalStorage==undefined) {
      return;
    } 
    else {
      let ColecaoTarefas : any[] = JSON.parse(PegandoDoLocalStorage);
      let resultcollection = ColecaoTarefas.filter(item=>{return item.tarefa != tarefa.tarefa});
      localStorage.setItem(this.key, JSON.stringify(resultcollection));
  }

  if (callback != null) {
    callback();
  }
}

atualizar(tarefa : any, callback: (() => void) | null = null){
  
    // Recebe do Local Storage 
    let PegandoDoLocalStorage = localStorage.getItem(this.key)
    if (PegandoDoLocalStorage==null || PegandoDoLocalStorage==undefined) {
     return;
    } 
    else{
      let ColecaoDeTarefasAtulizadas : any[] = JSON.parse(PegandoDoLocalStorage);
      ColecaoDeTarefasAtulizadas.forEach(item=>{
        if (item.tarefa == tarefa.tarefa){
          item.status = tarefa.status;
        }
      });

      localStorage.setItem(this.key, JSON.stringify(ColecaoDeTarefasAtulizadas));
    }

    if (callback!=null){
      callback();
    }
  }
}


