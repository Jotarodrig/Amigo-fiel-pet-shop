import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// Limpa a tela e o armazenamento entre os testes.
afterEach(() => {
  cleanup()
  localStorage.clear()
  window.history.pushState({}, '', '/')
})
