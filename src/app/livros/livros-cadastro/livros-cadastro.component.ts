import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-livros-cadastro',
  templateUrl: './livros-cadastro.component.html',
  styleUrls: ['./livros-cadastro.component.scss'],
})
export class LivrosCadastroComponent implements OnInit {
  livroId: number;
  livrosForm: FormGroup;

  constructor(
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private livroService: LivroService,
    private router: Router,
  ) {
    let livro = {
      id: null,
      titulo: null,
      isbn: null,
      paginas: null,
      preco: null, 
      imagem: null,
      autor: null
    };
    this.initializaFormulario(livro);
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id !== undefined) {
      this.livroId = parseInt(id);
      this.livroService
        .getLivro(this.livroId)
        .subscribe((livro) => {
          this.initializaFormulario(livro);
        });
    }
  }

  initializaFormulario(livro: Livro) {
    this.livrosForm = new FormGroup({
      titulo: new FormControl(livro.titulo, [
        Validators.required, 
        Validators.minLength(3),
        Validators.maxLength(150),  
      ]),      
      isbn: new FormControl(livro.isbn),    
      paginas: new FormControl(livro.paginas),    
      preco: new FormControl(livro.preco),
      imagem: new FormControl(livro.imagem),
      autor: new FormControl(livro.autor)
    })
  }

  salvar() {
    const livro: Livro = {...this.livrosForm.value, id: this.livroId}
    this.livroService.salvar(livro).subscribe(
      () => this.router.navigate(['livros']),
      (erro) => {
        console.error(erro);
        this.toastController.create({
          message: `Não foi possível salvar o livro ${livro.titulo}`,
          duration: 5000,
          keyboardClose: true,
          color: 'danger'
        }).then(t => t.present());
      }
    );
  }

  get titulo() {
    return this.livrosForm.get('titulo');
  }
}
