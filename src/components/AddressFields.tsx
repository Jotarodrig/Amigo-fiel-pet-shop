
import { useRef, useState } from 'react'
import { buscarEnderecoPorCep } from '../services/api'
import type { Endereco } from '../types'

interface AddressFieldsProps {
  valor: Endereco
  aoMudar: (endereco: Endereco) => void
}

export function AddressFields({ valor, aoMudar }: AddressFieldsProps) {
  const [buscando, setBuscando] = useState(false)
  const [mensagem, setMensagem] = useState<string | null>(null)
  const numeroRef = useRef<HTMLInputElement>(null)

  const buscarCep = async () => {
    if (buscando) return

    setMensagem(null)

    if (valor.cep.replace(/\D/g, '').length !== 8) return

    setBuscando(true)

    try {
      const dados = await buscarEnderecoPorCep(valor.cep)

      aoMudar({
        ...valor,
        logradouro: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        uf: dados.uf.toUpperCase(),
      })

      setMensagem('Endereço encontrado!')
      numeroRef.current?.focus()
    } catch {
      setMensagem('CEP não encontrado. Verifique e tente novamente.')
    } finally {
      setBuscando(false)
    }
  }

  return (
    <div className="formulario__endereco">
      <label>
        CEP
        <input
          type="text"
          value={valor.cep}
          maxLength={9}
          placeholder="00000-000"
          onChange={(e) =>
            aoMudar({ ...valor, cep: e.target.value })
          }
          onBlur={buscarCep}
        />
      </label>

      {buscando && <p>Buscando endereço...</p>}

      {mensagem && (
        <p className="formulario__mensagem">{mensagem}</p>
      )}

      <label>
        Rua
        <input
          type="text"
          value={valor.logradouro}
          onChange={(e) =>
            aoMudar({ ...valor, logradouro: e.target.value })
          }
        />
      </label>

      <label>
        Número
        <input
          ref={numeroRef}
          type="text"
          value={valor.numero}
          onChange={(e) =>
            aoMudar({ ...valor, numero: e.target.value })
          }
        />
      </label>

      <label>
        Bairro
        <input
          type="text"
          value={valor.bairro}
          onChange={(e) =>
            aoMudar({ ...valor, bairro: e.target.value })
          }
        />
      </label>

      <label>
        Cidade
        <input
          type="text"
          value={valor.cidade}
          onChange={(e) =>
            aoMudar({ ...valor, cidade: e.target.value })
          }
        />
      </label>

      <label>
        UF
        <input
          type="text"
          value={valor.uf}
          maxLength={2}
          onChange={(e) =>
            aoMudar({ ...valor, uf: e.target.value.toUpperCase() })
          }
        />
      </label>
    </div>
  )
}
