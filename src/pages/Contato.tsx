
import { Clock, Mail, Store } from 'lucide-react'
import { ContactForm } from '../components/ContactForm'

export function Contato() {
  return (
    <div className="container container--estreito">
      <div className="pagina__cabecalho">
        <h1>Fale conosco</h1>
        <p>Estamos aqui para ajudar você e seu melhor amigo!</p>
      </div>

      <section className="card info-loja">
        <div className="info-loja__titulo">
          <Store size={24} />
          <h2>Sobre a Amigo Fiel</h2>
        </div>

        <p>
          A Amigo Fiel é o lugar certo para quem deseja oferecer o melhor ao seu companheiro. Aqui você encontra rações, brinquedos, acessórios e produtos de higiene para cães e gatos, com variedade e cuidado em cada escolha.
        </p>

        <div className="info-loja__detalhes">
          <div>
            <Clock size={19} />
            <span>Segunda a sábado, das 9h às 18h</span>
          </div>

          <div>
            <Mail size={19} />
            <span>contato@amigofiel.com.br</span>
          </div>
        </div>
      </section>

      <ContactForm />
    </div>
  )
}
