import React, { useState, FormEvent } from 'react';

import Header from '../../components/Header';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';


import './styles.css';
import Select from '../../components/Select';
import api from '../../services/api';



const TeacherList = () => {
  const [ teachers, setTeachers ] = useState([]);
  const [ subject, setSubject ] = useState('');
  const [ week_day, setWeek_day ] = useState('');
  const [ time, setTime ] = useState('');

  function searchTeacher(e: FormEvent) {
    e.preventDefault();

    api.get('classes', {
      params: {
        subject,
        week_day,
        time,
      }
    }).then(response => {
      setTeachers(response.data)
    })

  }

  return (
    <div id="page-teacher-list" className="container">
      <Header title="Estes são os proffys disponíveis.">
        <form id="search-teachers" onSubmit={searchTeacher}>
          <Select
            value={subject}
            onChange={(e) => setSubject(e.target.value)} 
            name="subject"
            label="Matéria"
            options={[
              { value: 'Artes', label: 'Artes' },
              { value: 'Biologia', label: 'Biologia' },
              { value: 'Ciências', label: 'Ciências' },
              { value: 'Física', label: 'Física' },
              { value: 'Geografia', label: 'Geografia' },
              { value: 'Matemática', label: 'Matemática' },
              { value: 'História', label: 'História' },
            ]}
          />

          <Select
            value={week_day}
            onChange={(e) => setWeek_day(e.target.value)} 
            name="week_day"
            label="Dia da semana"
            options={[
              { value: '0', label: 'Domingo' },
              { value: '1', label: 'Segunda-feira' },
              { value: '2', label: 'Terça-feira' },
              { value: '3', label: 'Quarta-feira' },
              { value: '4', label: 'Quinta-feira' },
              { value: '5', label: 'Sexta-feira' },
              { value: '6', label: 'Sábado' },
            ]}
          />

          <Input 
            name="time" 
            label="Hora" 
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />

          <button type="submit">
            Buscar
          </button>
        </form>
      </Header>

      <main>
        {teachers.map((teacher: Teacher) => {
          return <TeacherItem key={teacher.id} teacher={teacher}/>
        })}
      </main>
    </div>
  );
}

export default TeacherList;