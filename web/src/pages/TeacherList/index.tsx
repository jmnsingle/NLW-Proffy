import React from 'react';

import Header from '../../components/Header';
import TeacherItem from '../../components/TeacherItem';


import './styles.css';

const TeacherList = () => {
  return (
    <div id="page-teacher-list" className="container">
      <Header title="Estes são os proffys disponíveis.">
        <form id="search-teachers">
          <div className="input-block">
            <label htmlFor="subject">Matéria</label>
            <input type="text" id="subject"/>
          </div>

          <div className="input-block">
            <label htmlFor="week-day">Dia da semana</label>
            <input type="text" id="week-day"/>
          </div>

          <div className="input-block">
            <label htmlFor="time">Hora</label>
            <input type="text" id="time"/>
          </div>
        </form>
      </Header>

      <main>
        <TeacherItem/>
      </main>
    </div>
  );
}

export default TeacherList;