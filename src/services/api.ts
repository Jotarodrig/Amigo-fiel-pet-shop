
import type {
  DogCeoImagemResponse,
  DogCeoRacasResponse,
  EnderecoViaCep,
  GatoRaca,
} from '../types'

// Endereços das APIs
const DOG_CEO = 'https://dog.ceo/api'
const CAT_API = 'https://api.thecatapi.com/v1'
const VIA_CEP = 'https://viacep.com.br/ws'

// Chave da The Cat API configurada no arquivo .env
const catHeaders = (): HeadersInit => {
  const chave = import.meta.env.VITE_CAT_API_KEY as string | undefined

  return chave ? { 'x-api-key': chave } : {}
}

// Função genérica para requisições
async function pegarJson<T>(
  url: string,
  init?: RequestInit
): Promise<T> {
  const resposta = await fetch(url, init)

  if (!resposta.ok) {
    throw new Error(`Falha na requisição (${resposta.status})`)
  }

  return (await resposta.json()) as T
}

// Dog CEO

export async function buscarCachorroAleatorio(): Promise<string> {
  const dados = await pegarJson<DogCeoImagemResponse>(
    `${DOG_CEO}/breeds/image/random`
  )

  return dados.message
}

export async function buscarNomesRacasCachorro(): Promise<string[]> {
  const dados = await pegarJson<DogCeoRacasResponse>(
    `${DOG_CEO}/breeds/list/all`
  )

  return Object.keys(dados.message)
}

export async function buscarImagemRacaCachorro(
  raca: string
): Promise<string> {
  const dados = await pegarJson<DogCeoImagemResponse>(
    `${DOG_CEO}/breed/${raca}/images/random`
  )

  return dados.message
}

// The Cat API

export async function buscarGatoAleatorio(): Promise<string> {
  const dados = await pegarJson<Array<{ url: string }>>(
    `${CAT_API}/images/search`,
    { headers: catHeaders() }
  )

  if (!dados.length) {
    throw new Error('Nenhuma imagem de gato foi encontrada.')
  }

  return dados[0].url
}

export async function buscarRacasGato(
  limite = 12
): Promise<GatoRaca[]> {
  return pegarJson<GatoRaca[]>(
    `${CAT_API}/breeds?limit=${limite}`,
    { headers: catHeaders() }
  )
}

export function urlImagemGato(idImagem: string): string {
  return `https://cdn2.thecatapi.com/images/${idImagem}.jpg`
}

// ViaCEP

export async function buscarEnderecoPorCep(
  cep: string
): Promise<EnderecoViaCep> {
  const apenasDigitos = cep.replace(/\D/g, '')

  if (apenasDigitos.length !== 8) {
    throw new Error('O CEP deve ter 8 dígitos.')
  }

  const dados = await pegarJson<EnderecoViaCep>(
    `${VIA_CEP}/${apenasDigitos}/json/`
  )

  if (dados.erro) {
    throw new Error('CEP não encontrado.')
  }

  return dados
}
