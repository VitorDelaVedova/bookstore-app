import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';
import { ToastController } from '@ionic/angular';
import { AutorService } from '../../autores/autor.service';
import { Autor } from 'src/app/autores/autor.model';

@Component({
  selector: 'app-livros-cadastro',
  templateUrl: './livros-cadastro.component.html',
  styleUrls: ['./livros-cadastro.component.scss'],
})
export class LivrosCadastroComponent implements OnInit {
  livroId: number;
  livrosForm: FormGroup;
  autores: Autor[];

  constructor(
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private livroService: LivroService,
    private router: Router,
    private autorService: AutorService
  ) {
    let livro = {
      id: null,
      titulo: '',
      isbn: 0,
      paginas: 0,
      preco: 0, 
      imagem: '',
      autor: null
    };
    this.initializaFormulario(livro);
  }

  ngOnInit() {
    this.getAutores();
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
      isbn: new FormControl(livro.isbn, Validators.required,),    
      paginas: new FormControl(livro.paginas, Validators.required),    
      preco: new FormControl(livro.preco, Validators.required),
      imagem: new FormControl(livro.imagem, Validators.required),
      autor: new FormControl(livro.autor, Validators.required)
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

  get isbn(){
    return this.livrosForm.get('isbn');
  }

  get paginas(){
    return this.livrosForm.get('paginas');
  }

  get preco(){
    return this.livrosForm.get('preco');
  }

  get imagem(){
    return this.livrosForm.get('imagem');
  }

  get autor(){
    return this.livrosForm.get('autor');
  }

  getAutores() {    
    this.autorService
      .getAutores()
      .subscribe(
        (dados) => {
          this.autores = dados;          
        }, 
        (erro) => {
          console.error(erro);
        }
      );
  }
}
