import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'

// Respostas falsas das APIs: os testes não dependem de internet.
function simularApis() {
  const fetchFalso = vi.fn(async (entrada: RequestInfo | URL) => {
    const url = String(entrada)
    let corpo: unknown = {}

    if (url.includes('dog.ceo/api/breeds/image/random')) {
      corpo = { message: 'https://images.dog.ceo/breeds/husky/foto.jpg', status: 'success' }
    } else if (url.includes('dog.ceo/api/breeds/list/all')) {
      corpo = { message: { akita: [], beagle: [], boxer: [] }, status: 'success' }
    } else if (url.includes('dog.ceo/api/breed/')) {
      corpo = { message: 'https://images.dog.ceo/breeds/x/foto.jpg', status: 'success' }
    } else if (url.includes('thecatapi.com/v1/breeds')) {
      corpo = [
        {
          id: 'abys',
          name: 'Abyssinian',
          origin: 'Egypt',
          temperament: 'Active, Energetic',
          description: '',
          life_span: '14 - 15',
          reference_image_id: 'img1',
        },
      ]
    } else if (url.includes('viacep.com.br/ws/01001000')) {
      corpo = {
        cep: '01001-000',
        logradouro: 'Praça da Sé',
        complemento: '',
        bairro: 'Sé',
        localidade: 'São Paulo',
        uf: 'SP',
      }
    } else if (url.includes('viacep.com.br/ws/99999999')) {
      corpo = { erro: 'true' }
    }

    return { ok: true, status: 200, json: async () => corpo } as Response
  })
  vi.stubGlobal('fetch', fetchFalso)
  return fetchFalso
}

function abrir(caminho: string) {
  window.history.pushState({}, '', caminho)
  return render(<App />)
}

describe('Pet shop', () => {
  beforeEach(() => {
    simularApis()
  })

  it('mostra a home com destaques e a foto vinda da API Dog CEO', async () => {
    abrir('/')
    expect(screen.getByRole('heading', { name: /tudo para o seu melhor amigo/i })).toBeInTheDocument()
    expect(await screen.findByAltText(/cachorro aleatório/i)).toHaveAttribute(
      'src',
      'https://images.dog.ceo/breeds/husky/foto.jpg',
    )
  })

  it('filtra produtos por busca e por categoria', async () => {
    const usuario = userEvent.setup()
    abrir('/produtos')
    expect(screen.getByText('12 produtos encontrados')).toBeInTheDocument()

    await usuario.type(screen.getByLabelText('Buscar produto...'), 'bolinha')
    expect(screen.getByText('1 produto encontrado')).toBeInTheDocument()

    await usuario.clear(screen.getByLabelText('Buscar produto...'))
    await usuario.click(screen.getByRole('button', { name: 'Higiene' }))
    expect(screen.getByText('3 produtos encontrados')).toBeInTheDocument()
  })

  it('adiciona ao carrinho, soma o total e remove o item', async () => {
    const usuario = userEvent.setup()
    abrir('/produtos')

    const cartao = screen.getByRole('heading', { name: 'Bolinha de Borracha' }).closest('article')!
    await usuario.click(within(cartao).getByRole('button', { name: 'Adicionar' }))
    await usuario.click(within(cartao).getByRole('button', { name: 'Adicionar' }))

    await usuario.click(screen.getByRole('link', { name: /carrinho/i }))
    expect(await screen.findByRole('heading', { name: 'Seu carrinho' })).toBeInTheDocument()
    // 2 x 14,90 = 29,80 aparece no subtotal do item e no total
    expect(screen.getAllByText(/R\$\s*29,80/)).toHaveLength(2)

    await usuario.click(screen.getByRole('button', { name: /remover bolinha/i }))
    expect(screen.getByText(/carrinho está vazio/i)).toBeInTheDocument()
  })

  it('valida o login e autentica o usuário', async () => {
    const usuario = userEvent.setup()
    abrir('/login')

    await usuario.click(screen.getByRole('button', { name: 'Entrar' }))
    expect(screen.getByRole('alert')).toHaveTextContent(/e-mail válido/i)

    await usuario.type(screen.getByLabelText('E-mail'), 'joao@teste.com')
    await usuario.type(screen.getByLabelText('Senha'), '1234')
    await usuario.click(screen.getByRole('button', { name: 'Entrar' }))

    expect(await screen.findByRole('heading', { name: 'Produtos' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sair \(joao\)/i })).toBeInTheDocument()
  })

  it('autopreenche o endereço pelo CEP (ViaCEP) e trata CEP inexistente', async () => {
    const usuario = userEvent.setup()
    abrir('/contato')

    await usuario.type(screen.getByLabelText('CEP'), '01001000')
    await usuario.tab()
    await waitFor(() => expect(screen.getByLabelText('Rua')).toHaveValue('Praça da Sé'))
    expect(screen.getByLabelText('Cidade')).toHaveValue('São Paulo')
    expect(screen.getByLabelText('UF')).toHaveValue('SP')

    await usuario.clear(screen.getByLabelText('CEP'))
    await usuario.type(screen.getByLabelText('CEP'), '99999999')
    await usuario.tab()
    expect(await screen.findByText('CEP não encontrado.')).toBeInTheDocument()
  })

  it('lista raças de cães e de gatos vindas das APIs', async () => {
    const usuario = userEvent.setup()
    abrir('/racas')

    expect(await screen.findByRole('heading', { name: 'Akita' })).toBeInTheDocument()
    expect(screen.getAllByRole('article')).toHaveLength(3)

    await usuario.click(screen.getByRole('tab', { name: /gatos/i }))
    expect(await screen.findByRole('heading', { name: 'Abyssinian' })).toBeInTheDocument()
  })

  it('mostra 404 para rota desconhecida', () => {
    abrir('/qualquer-coisa')
    expect(screen.getByRole('heading', { name: /404/ })).toBeInTheDocument()
  })
})
