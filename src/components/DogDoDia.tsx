
import { useEffect, useState } from 'react'
import { Dog, Cat, RefreshCw } from 'lucide-react'
import {
  buscarCachorroAleatorio,
  buscarGatoAleatorio,
} from '../services/api'
import { ErrorMessage } from './ErrorMessage'
import { Loading } from './Loading'

type TipoPet = 'cachorro' | 'gato'

export function DogDoDia() {
  const [tipoPet, setTipoPet] = useState<TipoPet>('cachorro')
  const [gatilho, setGatilho] = useState(0)
  const [imagem, setImagem] = useState('')
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState<string | null>(null)

  useEffect(() => {
    let cancelado = false

    const buscarImagem = async () => {
      setCarregando(true)
      setErro(null)

      try {
        let url = ''

        if (tipoPet === 'cachorro') {
          url = await buscarCachorroAleatorio()
        } else {
          url = await buscarGatoAleatorio()
        }

        if (!cancelado) {
          setImagem(url)
        }
      } catch (error) {
        if (!cancelado) {
          setErro(
            error instanceof Error
              ? error.message
              : 'Não foi possível carregar a imagem.'
          )
        }
      } finally {
        if (!cancelado) {
          setCarregando(false)
        }
      }
    }

    buscarImagem()

    return () => {
      cancelado = true
    }
  }, [tipoPet, gatilho])

  return (
    <section className="card dog-dia">
      <div className="dog-dia__cabecalho">
        {tipoPet === 'cachorro' ? (
          <Dog size={27} />
        ) : (
          <Cat size={27} />
        )}

        <h2>
          {tipoPet === 'cachorro'
            ? 'Cãozinho do momento'
            : 'Gatinho do momento'}
        </h2>
      </div>

      <div className="dog-dia__opcoes">
        <button
          type="button"
          className={`botao ${tipoPet === 'cachorro' ? '' : 'botao--contorno'}`}
          onClick={() => setTipoPet('cachorro')}
          disabled={carregando}
        >
          <Dog size={17} />
          Cachorros
        </button>

        <button
          type="button"
          className={`botao ${tipoPet === 'gato' ? '' : 'botao--contorno'}`}
          onClick={() => setTipoPet('gato')}
          disabled={carregando}
        >
          <Cat size={17} />
          Gatos
        </button>
      </div>

      {carregando && (
        <Loading mensagem="Procurando um amiguinho..." />
      )}

      {erro && (
        <ErrorMessage
          mensagem="Não foi possível carregar a foto."
          dica={erro}
        />
      )}

      {imagem && !carregando && !erro && (
        <img
          src={imagem}
          alt={tipoPet === 'cachorro' ? 'Cachorro aleatório' : 'Gato aleatório'}
          className="dog-dia__foto"
        />
      )}

      <button
        type="button"
        className="botao"
        onClick={() => setGatilho((g) => g + 1)}
        disabled={carregando}
      >
        <RefreshCw size={17} />
        Ver outro {tipoPet === 'cachorro' ? 'cachorro' : 'gato'}
      </button>

      <small>
        Imagens fornecidas pela{' '}
        {tipoPet === 'cachorro' ? 'Dog CEO API' : 'The Cat API'}
      </small>
    </section>
  )
}
