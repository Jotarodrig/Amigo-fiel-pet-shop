import { categorias } from '../data/produtos'
import type { Categoria } from '../types'

interface CategoryFilterProps {
  selecionada: Categoria | 'todas'
  aoSelecionar: (categoria: Categoria | 'todas') => void
}

// Componente 7/14: botões de filtro por categoria (componente controlado).
export function CategoryFilter({ selecionada, aoSelecionar }: CategoryFilterProps) {
  return (
    <div className="filtros" role="group" aria-label="Filtrar por categoria">
      {categorias.map((categoria) => (
        <button
          key={categoria.valor}
          type="button"
          className={`chip ${selecionada === categoria.valor ? 'chip--ativo' : ''}`}
          aria-pressed={selecionada === categoria.valor}
          onClick={() => aoSelecionar(categoria.valor)}
        >
          {categoria.rotulo}
        </button>
      ))}
    </div>
  )
}
