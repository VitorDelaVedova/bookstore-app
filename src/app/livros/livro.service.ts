import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Livro } from './livro.model';

@Injectable({
  providedIn: 'root'
})
export class LivroService {
  
  private url = 'http://localhost:3000/livros';
 
  private livros: Livro[];

  constructor(
    private httpClient: HttpClient
  ) {}
  
  getLivros(): Observable<Livro[]> {
    return this.httpClient.get<Livro[]>(this.url);
  }

  excluir(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  getLivro(id: number): Observable<Livro> {
    return this.httpClient.get<Livro>(`${this.url}/${id}`);
  }

  private adicionar(livro: Livro)  {
    livro.id = parseInt((Math.random() * 1000).toFixed(0));
    this.livros.push(livro);
  }

  private atualizar(livro: Livro) {
    this.livros.forEach((l, i) => {
      if(l.id === livro.id) {
        this.livros[i] = livro;
      } 
    })
  }

  salvar(livro: Livro) {
    if(livro.id) {
      this.atualizar(livro);
    } else {
      this.adicionar(livro);
    }
  }
}
