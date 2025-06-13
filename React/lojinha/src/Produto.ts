export interface Categoria {
    id: number;
    nome: string;
    ativa: boolean;
}

export interface Produto {
    id: number;
    nome: string;
    preco: number;
    emailEmpresa: string;
    dataValidade: string;
    createdAt: string;
    categoria: Categoria;
    categoriaId: number;
}