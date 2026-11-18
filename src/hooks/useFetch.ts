import { useEffect, useState } from 'react'

interface EstadoFetch<T> {
  dados: T | null
  carregando: boolean
  erro: string | null
}

// Guarda o resultado de UMA busca, junto de qual busca ele pertence.
interface Resultado<T> {
  origem: () => Promise<T>
  gatilho: number
  dados: T | null
  erro: string | null
}

// CUSTOM HOOK: executa uma função assíncrona e controla os estados de
// carregamento, sucesso e erro. Usa useState e useEffect por dentro.
//
// - `buscar` deve ser estável (definida fora do componente ou memorizada),
//   senão dispara uma nova chamada a cada renderização.
// - `gatilho` é um número opcional: ao mudar, refaz a busca (ex.: botão "outro").
//
// "carregando" é DERIVADO: enquanto o resultado guardado não pertence à busca
// atual (mesma função e mesmo gatilho), consideramos que ainda está carregando.
export function useFetch<T>(buscar: () => Promise<T>, gatilho = 0): EstadoFetch<T> {
  const [resultado, setResultado] = useState<Resultado<T> | null>(null)

  useEffect(() => {
    let cancelado = false

    buscar()
      .then((dados) => {
        if (!cancelado) setResultado({ origem: buscar, gatilho, dados, erro: null })
      })
      .catch((e: unknown) => {
        if (!cancelado) {
          const erro = e instanceof Error ? e.message : 'Erro desconhecido.'
          setResultado({ origem: buscar, gatilho, dados: null, erro })
        }
      })

    // Limpeza: evita atualizar estado de um componente já desmontado
    // ou de uma busca antiga que foi substituída por outra.
    return () => {
      cancelado = true
    }
  }, [buscar, gatilho])

  const atualizado = resultado !== null && resultado.origem === buscar && resultado.gatilho === gatilho

  return {
    dados: resultado?.dados ?? null,
    carregando: !atualizado,
    erro: atualizado ? resultado.erro : null,
  }
}
