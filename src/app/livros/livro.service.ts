//cabe ao serviço fazer a adição de livros
//Um serviço pode ser implementado como uma classe Typescript
import { Livro } from './livro.model';
import { Injectable } from '@angular/core';
//Para que a lista de livros seja obtida a partir de um servidor remoto
import { Subject } from 'rxjs';

@Injectable ({ providedIn: 'root'})
export class LivroService {
    private livros: Livro[] = [];
    private listaLivrosAtualizada = new Subject<Livro[]>();

    getLivros(): Livro[]{
        return[...this.livros];
    }
// Também cabe ao serviço fazer a adição de livros
    cadastrarLivro(id:number, titulo: string, 
    autor:string, paginas:number ){
      const livro: Livro = {
          id,
          titulo,
          autor,
          paginas
        };
    this.livros.push(livro)
    this.listaLivrosAtualizada.next([...this.livros]);
    }
    //Para permitir que componentes registrem observadores vinculados à lista atualizada do serviço,
    //vamos definir um novo método que devolve um Observable
    getListaDeLivrosAtualizadaObservable(){
       return this.listaLivrosAtualizada.asObservable();
    }
}