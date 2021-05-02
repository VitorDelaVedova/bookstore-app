import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Livro } from './livro.model';

@Injectable({
  providedIn: 'root'
})
export class LivroService {
  
  private url = 'http://localhost:3000/livros';

  constructor(
    private httpClient: HttpClient
  ) {}
  
  getLivros(): Observable<Livro[]> {
    return this.httpClient.get<Livro[]>(this.url);
  }

  excluir(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  getLivro(id: number): Observable<Livro> {
    return this.httpClient.get<Livro>(`${this.url}/${id}`);
  }

  private adicionar(livro: Livro)  {
    return this.httpClient.post(this.url, livro);
  }

  private atualizar(livro: Livro) {
    return this.httpClient.put(`${this.url}/${livro.id}`, livro);
  }

  salvar(livro: Livro) {
    if(livro.id) {
      return this.atualizar(livro);
    } else {
      return this.adicionar(livro);
    }
  }
}
