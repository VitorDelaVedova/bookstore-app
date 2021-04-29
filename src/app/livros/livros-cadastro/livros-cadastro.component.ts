import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livros-cadastro',
  templateUrl: './livros-cadastro.component.html',
  styleUrls: ['./livros-cadastro.component.scss'],
})
export class LivrosCadastroComponent implements OnInit {
  livroId: number;
  livrosForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private livroService: LivroService,
    private router: Router,
  ) {
    let livro = {
      id: null,
      nome: '',
      dataLancamento: null,
      preco: null,
      imagem: null      
    };
    this.initializaFormulario(livro);
  }

  ngOnInit() {
    const id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.livroId = id;
    this.livroService
      .getLivro(id)
      .subscribe((livro) => {
         this.initializaFormulario(livro);
      });
  }

  initializaFormulario(livro: Livro) {
    this.livrosForm = new FormGroup({
      nome: new FormControl(livro.nome, [
        Validators.required, 
        Validators.minLength(3),
        Validators.maxLength(150),  
      ]),      
      dataLancamento: new FormControl(livro.dataLancamento),    
      preco: new FormControl(livro.preco),
      imagem: new FormControl(livro.imagem)
    })
  }

  salvar() {
    const livro = {...this.livrosForm.value, id: this.livroId}
    this.livroService.salvar(livro);
    this.router.navigate(['livros']);
  }

  get nome() {
    return this.livrosForm.get('nome');
  }
}