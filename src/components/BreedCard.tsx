
import { useState } from 'react'
import { Dog, Cat } from 'lucide-react'
import type { Raca } from '../types'

interface BreedCardProps {
  raca: Raca
}

export function BreedCard({ raca }: BreedCardProps) {
  const [imagemFalhou, setImagemFalhou] = useState(false)

  const semImagem = imagemFalhou || !raca.imagem

  return (
    <article className="card raca">
      {semImagem ? (
        <div
          className="raca__foto raca__foto--vazia"
          aria-label={`Imagem indisponível para ${raca.nome}`}
        >
          {raca.animal === 'cachorro' ? (
            <Dog size={58} strokeWidth={1.5} />
          ) : (
            <Cat size={58} strokeWidth={1.5} />
          )}
          <span>Imagem indisponível</span>
        </div>
      ) : (
        <img
          className="raca__foto"
          src={raca.imagem}
          alt={`Foto de ${raca.nome}`}
          loading="lazy"
          onError={() => setImagemFalhou(true)}
        />
      )}

      <div className="raca__corpo">
        <h3>{raca.nome}</h3>
        {raca.detalhes && <p>{raca.detalhes}</p>}
      </div>
    </article>
  )
}
