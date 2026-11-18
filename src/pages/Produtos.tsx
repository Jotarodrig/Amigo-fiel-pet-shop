
import { useMemo, useState } from 'react'
import { SearchX } from 'lucide-react'
import { CategoryFilter } from '../components/CategoryFilter'
import { ProductCard } from '../components/ProductCard'
import { SearchBar } from '../components/SearchBar'
import { produtos } from '../data/produtos'
import type { Animal, Categoria } from '../types'

export function Produtos() {
  const [busca, setBusca] = useState('')
  const [categoria, setCategoria] = useState<Categoria | 'todas'>('todas')
  const [animal, setAnimal] = useState<Animal | 'todos'>('todos')

  const filtrados = useMemo(() => {
    const termo = busca.trim().toLowerCase()

    return produtos.filter(
      (p) =>
        (categoria === 'todas' || p.categoria === categoria) &&
        (animal === 'todos' || p.animal === animal) &&
        (termo === '' ||
          p.nome.toLowerCase().includes(termo) ||
          p.descricao.toLowerCase().includes(termo)),
    )
  }, [busca, categoria, animal])

  return (
    <div className="container">
      <div className="pagina__cabecalho">
        <h1>Nosso catálogo</h1>
        <p>Encontre tudo o que seu melhor amigo precisa!</p>
      </div>

      <div className="barra-filtros">
        <SearchBar
          valor={busca}
          aoMudar={setBusca}
          placeholder="Buscar produto..."
        />

        <select
          value={animal}
          onChange={(e) => setAnimal(e.target.value as Animal | 'todos')}
          aria-label="Filtrar por animal"
        >
          <option value="todos">Cães e gatos</option>
          <option value="cachorro">Somente cães</option>
          <option value="gato">Somente gatos</option>
        </select>
      </div>

      <CategoryFilter
        selecionada={categoria}
        aoSelecionar={setCategoria}
      />

      <p className="contagem" aria-live="polite">
        {filtrados.length}{' '}
        {filtrados.length === 1
          ? 'produto encontrado'
          : 'produtos encontrados'}
      </p>

      {filtrados.length === 0 ? (
        <div className="vazio">
          <SearchX size={42} />
          <p>Nenhum produto encontrado.</p>
          <small>Tente alterar os filtros ou buscar outro produto.</small>
        </div>
      ) : (
        <div className="grade">
          {filtrados.map((produto) => (
            <ProductCard key={produto.id} produto={produto} />
          ))}
        </div>
      )}
    </div>
  )
}
