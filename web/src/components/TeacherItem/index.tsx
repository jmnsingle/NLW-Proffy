import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

const TeacherItem = () => {
  return (
    <article className="teacher-item">
      <header>
        <img src="https://avatars1.githubusercontent.com/u/47636541?s=460&u=a32e385725e3de30e1dd1f4f80af5bc950ef9a8f&v=4" alt="Juliano Nogueira"/>

        <div>
          <strong>Juliano Nogueira</strong>
          <span>Programação</span>
        </div>
      </header>

      <p>
        Entusiasta das melhores recnologias de programação avançada.
        <br/> <br/>
        Apaixonado por programar coisas e colocar em produção.
      </p>

      <footer>
        <p>
          Preço/Hora
          <strong>R$ 150,00</strong>
        </p>
        <button type="button">
          <img src={whatsappIcon} alt="Whatsapp"/>
          Entrar em contato
        </button>
      </footer>
    </article>
  );
}

export default TeacherItem;