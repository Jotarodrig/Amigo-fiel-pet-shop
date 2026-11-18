interface LoadingProps {
  mensagem?: string
}

// Componente 1/14: indicador de carregamento reutilizável.
export function Loading({ mensagem = 'Carregando...' }: LoadingProps) {
  return (
    <div className="loading" role="status" aria-live="polite">
      <span className="loading__patinha" aria-hidden="true">
        🐾
      </span>
      <p>{mensagem}</p>
    </div>
  )
}
