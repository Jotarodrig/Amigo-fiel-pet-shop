// Formata um número como moeda brasileira. Ex.: 19.9 -> "R$ 19,90"
export function formatarMoeda(valor: number): string {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

// Formata CEP enquanto o usuário digita. Ex.: "01001000" -> "01001-000"
export function formatarCep(valor: string): string {
  const digitos = valor.replace(/\D/g, '').slice(0, 8)
  return digitos.length > 5 ? `${digitos.slice(0, 5)}-${digitos.slice(5)}` : digitos
}

// Capitaliza a primeira letra. Ex.: "labrador" -> "Labrador"
export function capitalizar(texto: string): string {
  return texto.charAt(0).toUpperCase() + texto.slice(1)
}
