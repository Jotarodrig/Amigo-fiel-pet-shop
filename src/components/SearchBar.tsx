import { useRef } from 'react'

interface SearchBarProps {
  valor: string
  aoMudar: (valor: string) => void
  placeholder?: string
}

// Componente 8/14: campo de busca.
// Usa useRef para devolver o foco ao campo quando o usuário limpa o texto.
export function SearchBar({ valor, aoMudar, placeholder = 'Buscar...' }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const limpar = () => {
    aoMudar('')
    inputRef.current?.focus()
  }

  return (
    <div className="busca">
      <input
        ref={inputRef}
        type="search"
        value={valor}
        placeholder={placeholder}
        aria-label={placeholder}
        onChange={(evento) => aoMudar(evento.target.value)}
      />
      {valor && (
        <button type="button" className="busca__limpar" onClick={limpar} aria-label="Limpar busca">
          ✕
        </button>
      )}
    </div>
  )
}
