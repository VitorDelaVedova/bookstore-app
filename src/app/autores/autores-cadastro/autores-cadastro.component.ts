import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Autor } from '../autor.model';
import { AutorService } from '../autor.service';
import { Genero } from '../genero.enum';

@Component({
  selector: 'app-autores-cadastro',
  templateUrl: './autores-cadastro.component.html',
  styleUrls: ['./autores-cadastro.component.scss'],
})
export class AutoresCadastroComponent implements OnInit {
  mesesAbreviados = [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ];
  meses = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  autorId: number;
  autoresForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private autorService: AutorService,
    private router: Router,
  ) {
    let autor = {
      id: null,
      nome: '',
      dataNascimento: null,
      genero: Genero.FEMININO,
    };
    this.initializaFormulario(autor);
  }

  ngOnInit() {
    const id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.autorId = id;
    this.autorService
      .getAutor(id)
      .subscribe((autor) => {
         this.initializaFormulario(autor);
      });
  }

  initializaFormulario(autor: Autor) {
    this.autoresForm = new FormGroup({
      nome: new FormControl(autor.nome, [
        Validators.required, 
        Validators.minLength(3),
        Validators.maxLength(150),  
      ]),      
      dataNascimento: new FormControl(autor.dataNascimento),
      genero: new FormControl(autor.genero, Validators.required)
    })
  }

  salvar() {
    const autor = {...this.autoresForm.value, id: this.autorId}
    this.autorService.salvar(autor);
    this.router.navigate(['autores']);
  }

  get nome() {
    return this.autoresForm.get('nome');
  }
}
