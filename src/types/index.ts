// Tipos TypeScript usados em todo o projeto.

export type Categoria = 'racao' | 'brinquedos' | 'acessorios' | 'higiene'

export type Animal = 'cachorro' | 'gato'

export interface Produto {
  id: number
  nome: string
  descricao: string
  preco: number
  categoria: Categoria
  animal: Animal
  imagem: string
}

export interface ItemCarrinho {
  produto: Produto
  quantidade: number
}

export interface Usuario {
  nome: string
  email: string
}

// Resposta da API Dog CEO (https://dog.ceo/dog-api/)
export interface DogCeoImagemResponse {
  message: string
  status: string
}

export interface DogCeoRacasResponse {
  message: Record<string, string[]>
  status: string
}

// Resposta da The Cat API (https://thecatapi.com/)
export interface GatoRaca {
  id: string
  name: string
  origin: string
  temperament: string
  description: string
  life_span: string
  reference_image_id?: string
}

// Modelo interno usado pelo componente BreedCard (cães e gatos)
export interface Raca {
  id: string
  nome: string
  animal: Animal
  imagem: string
  detalhes?: string
}

// Resposta da API ViaCEP (https://viacep.com.br)
export interface EnderecoViaCep {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
  erro?: boolean | string
}

// Endereço preenchido nos formulários (autopreenchido via ViaCEP)
export interface Endereco {
  cep: string
  logradouro: string
  numero: string
  bairro: string
  cidade: string
  uf: string
}

