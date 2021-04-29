import { Autor } from '../autores/autor.model';

export interface Livro {
    id?: number;
    nome: string;      
    dataLancamento: Date;
    preco: number; 
    imagem: string;     
}