interface ErrorMessageProps {
  mensagem: string
  dica?: string
}

// Componente 2/14: mensagem de erro reutilizável.
export function ErrorMessage({ mensagem, dica }: ErrorMessageProps) {
  return (
    <div className="erro" role="alert">
      <strong>Ops! {mensagem}</strong>
      {dica && <p>{dica}</p>}
    </div>
  )
}
