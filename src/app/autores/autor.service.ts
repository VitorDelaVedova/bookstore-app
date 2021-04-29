import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Autor } from './autor.model';

@Injectable({
  providedIn: 'root'
})
export class AutorService {
  
  private url = 'http://localhost:3000/autores';
 
  private autores: Autor[];

  constructor(
    private httpClient: HttpClient
  ) {}
  
  getAutores(): Observable<Autor[]> {
    return this.httpClient.get<Autor[]>(this.url);
  }

  excluir(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  getAutor(id: number): Observable<Autor> {
    return this.httpClient.get<Autor>(`${this.url}/${id}`);
  }

  private adicionar(autor: Autor)  {
    autor.id = parseInt((Math.random() * 1000).toFixed(0));
    this.autores.push(autor);
  }

  private atualizar(autor: Autor) {
    this.autores.forEach((a, i) => {
      if(a.id === autor.id) {
        this.autores[i] = autor;
      } 
    })
  }

  salvar(autor: Autor) {
    if(autor.id) {
      this.atualizar(autor);
    } else {
      this.adicionar(autor);
    }
  }
}
