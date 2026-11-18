
import { useMemo, useState } from 'react'
import { Dog, Cat, SearchX } from 'lucide-react'
import { BreedCard } from '../components/BreedCard'
import { ErrorMessage } from '../components/ErrorMessage'
import { Loading } from '../components/Loading'
import { SearchBar } from '../components/SearchBar'
import { useFetch } from '../hooks/useFetch'
import {
  buscarImagemRacaCachorro,
  buscarNomesRacasCachorro,
  buscarRacasGato,
  urlImagemGato,
} from '../services/api'
import type { Animal, Raca } from '../types'
import { capitalizar } from '../utils/formatar'

async function carregarCachorros(): Promise<Raca[]> {
  const nomes = (await buscarNomesRacasCachorro()).slice(0, 12)
  const imagens = await Promise.all(
    nomes.map((nome) => buscarImagemRacaCachorro(nome))
  )

  return nomes.map((nome, i) => ({
    id: nome,
    nome: capitalizar(nome),
    animal: 'cachorro',
    imagem: imagens[i],
  }))
}

async function carregarGatos(): Promise<Raca[]> {
  const racas = await buscarRacasGato(12)

  return racas.map((r) => ({
    id: r.id,
    nome: r.name,
    animal: 'gato',
    imagem: r.reference_image_id ? urlImagemGato(r.reference_image_id) : '',
    detalhes: `${r.origin} • ${r.temperament}`,
  }))
}

export function Racas() {
  const [animal, setAnimal] = useState<Animal>('cachorro')
  const [busca, setBusca] = useState('')

  const cachorros = useFetch(carregarCachorros)
  const gatos = useFetch(carregarGatos)
  const atual = animal === 'cachorro' ? cachorros : gatos

  const filtradas = useMemo(() => {
    const termo = busca.trim().toLowerCase()

    return (atual.dados ?? []).filter((r) =>
      r.nome.toLowerCase().includes(termo)
    )
  }, [atual.dados, busca])

  return (
    <div className="container">
      <div className="pagina__cabecalho">
        <h1>Conheça as raças</h1>
        <p>Descubra características e curiosidades sobre cães e gatos.</p>
      </div>

      <div className="abas" role="tablist" aria-label="Tipo de animal">
        <button
          type="button"
          role="tab"
          aria-selected={animal === 'cachorro'}
          className={`chip ${animal === 'cachorro' ? 'chip--ativo' : ''}`}
          onClick={() => setAnimal('cachorro')}
        >
          <Dog size={18} />
          Cães
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={animal === 'gato'}
          className={`chip ${animal === 'gato' ? 'chip--ativo' : ''}`}
          onClick={() => setAnimal('gato')}
        >
          <Cat size={18} />
          Gatos
        </button>
      </div>

      <SearchBar
        valor={busca}
        aoMudar={setBusca}
        placeholder="Buscar raça..."
      />

      {atual.carregando && (
        <Loading mensagem="Buscando raças nas APIs..." />
      )}

      {atual.erro && (
        <ErrorMessage
          mensagem="Não foi possível carregar as raças."
          dica={
            animal === 'gato'
              ? `${atual.erro}. A The Cat API pode exigir uma chave gratuita.`
              : atual.erro
          }
        />
      )}

      {!atual.carregando && !atual.erro && filtradas.length === 0 && (
        <div className="vazio">
          <SearchX size={42} />
          <p>Nenhuma raça encontrada.</p>
          <small>Tente pesquisar por outro nome.</small>
        </div>
      )}

      {!atual.carregando && !atual.erro && filtradas.length > 0 && (
        <div className="grade">
          {filtradas.map((raca) => (
            <BreedCard
              key={`${raca.animal}-${raca.id}`}
              raca={raca}
            />
          ))}
        </div>
      )}
    </div>
  )
}
