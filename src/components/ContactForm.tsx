
import { useState } from 'react'
import type { FormEvent } from 'react'
import { Send, CheckCircle } from 'lucide-react'
import type { Endereco } from '../types'
import { AddressFields } from './AddressFields'

const enderecoVazio: Endereco = {
  cep: '',
  logradouro: '',
  numero: '',
  bairro: '',
  cidade: '',
  uf: '',
}

export function ContactForm() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [endereco, setEndereco] = useState<Endereco>(enderecoVazio)
  const [enviado, setEnviado] = useState(false)
  const [erro, setErro] = useState<string | null>(null)

  const enviar = (evento: FormEvent<HTMLFormElement>) => {
    evento.preventDefault()

    if (!nome.trim() || !email.includes('@') || mensagem.trim().length < 5) {
      setErro(
        'Preencha nome, um e-mail válido e uma mensagem com pelo menos 5 caracteres.'
      )
      return
    }

    setErro(null)
    setEnviado(true)
    setNome('')
    setEmail('')
    setMensagem('')
    setEndereco(enderecoVazio)
  }

  return (
    <form className="card formulario" onSubmit={enviar} noValidate>
      <h2>Envie sua mensagem</h2>

      {enviado && (
        <div className="sucesso" role="status">
          <CheckCircle size={20} />
          <span>
            Mensagem enviada! Responderemos em breve (envio simulado).
          </span>
        </div>
      )}

      <label>
        Nome
        <input
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          autoComplete="name"
          placeholder="Seu nome completo"
        />
      </label>

      <label>
        E-mail
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          placeholder="seuemail@exemplo.com"
        />
      </label>

      <AddressFields valor={endereco} aoMudar={setEndereco} />

      <label>
        Mensagem
        <textarea
          rows={4}
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          placeholder="Como podemos ajudar?"
        />
      </label>

      {erro && (
        <p className="campo-erro" role="alert">
          {erro}
        </p>
      )}

      <button type="submit" className="botao">
        <Send size={18} />
        Enviar mensagem
      </button>
    </form>
  )
}
