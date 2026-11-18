
import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogIn, User, Mail, Lock } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export function LoginForm() {
  const { entrar } = useAuth()
  const navegar = useNavigate()
  const emailRef = useRef<HTMLInputElement>(null)

  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState<string | null>(null)

  useEffect(() => {
    emailRef.current?.focus()
  }, [])

  const enviar = (evento: FormEvent<HTMLFormElement>) => {
    evento.preventDefault()

    if (!email.includes('@')) {
      setErro('Informe um e-mail válido.')
      return
    }

    if (senha.length < 4) {
      setErro('A senha deve ter pelo menos 4 caracteres.')
      return
    }

    setErro(null)
    entrar({ nome: nome.trim() || email.split('@')[0], email })
    navegar('/produtos')
  }

  return (
    <form className="card formulario login-form" onSubmit={enviar} noValidate>
      <div className="login-form__titulo">
        <LogIn size={27} />
        <h2>Bem-vindo à Amigo Fiel!</h2>
      </div>

      <p className="formulario__ajuda">
        Entre para continuar suas compras e cuidar ainda melhor do seu melhor amigo.
      </p>

      <label>
        <span><User size={17} /> Nome (opcional)</span>
        <input
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          autoComplete="name"
          placeholder="Seu nome"
        />
      </label>

      <label>
        <span><Mail size={17} /> E-mail</span>
        <input
          ref={emailRef}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          placeholder="seuemail@exemplo.com"
        />
      </label>

      <label>
        <span><Lock size={17} /> Senha</span>
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          autoComplete="current-password"
          placeholder="Mínimo de 4 caracteres"
        />
      </label>

      {erro && (
        <p className="campo-erro" role="alert">
          {erro}
        </p>
      )}

      <button type="submit" className="botao">
        <LogIn size={18} />
        Entrar
      </button>

      <small className="login-form__aviso">
        Acesso demonstrativo para fins acadêmicos.
      </small>
    </form>
  )
}
