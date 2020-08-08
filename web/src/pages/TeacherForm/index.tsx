import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';

import Header from '../../components/Header';
import Input from '../../components/Input';

import warningIcon from '../../assets/images/icons/warning.svg';

import './styles.css';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

const TeacherForm = () => {
  const history = useHistory();

  const [ scheduleItems, setScheduleItems ] = useState([
    { week_day: 0, from: '', to: '' }
  ]);
  
  const [ name, setName ] = useState('');
  const [ avatar, setAvatar ] = useState('');
  const [ whatsapp, setWhatsapp ] = useState('');
  const [ bio, setBio ] = useState('');
  const [ subject, setSubject ] = useState('');
  const [ cost, setCost ] = useState('');

  function addNewScheduleItem() {
    setScheduleItems([
      ...scheduleItems,
      { week_day: 0, from: '', to: '' }
    ]);
  }

  function handleCreateClass(e: FormEvent) {
    e.preventDefault();

    api.post('classes', {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost: Number(cost),
      schedule: scheduleItems,
    }).then(response => {
      alert('Cadastrado com sucesso');
      history.push('/landing');
    }).catch(err => {
      alert('Erro: ' + err);
    });
  }

  function setScheduleItemValue(index: number, field: string, value: string) {
    const uptatedScheduleItems = scheduleItems.map((scheduleItem, scheduleIndex) => {
      if (scheduleIndex === index) {
        return { ...scheduleItem, [field]: value }
      }

      return scheduleItem;
    });

    setScheduleItems(uptatedScheduleItems);
  }

  return (
    <div id="page-teacher-form" className="container">
      <Header 
        title="Que incrível que você quer dar aulas"
        description="O primeiro passo é preencher esse formulário de inscrição."
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>

            <Input 
              name="name" 
              value={name}
              label="Nome completo"
              onChange={(e) => setName(e.target.value)}
            />
            <Input 
              name="avatar" 
              value={avatar}
              label="Avatar" 
              onChange={(e) => setAvatar(e.target.value)}
            />
            <Input 
              name="whatsapp" 
              value={whatsapp}
              label="WhatsApp" 
              onChange={(e) => setWhatsapp(e.target.value)}
            />
            <Textarea 
              name="bio" 
              value={bio}
              label="Biografia"
              onChange={(e) => setBio(e.target.value)}
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>

            <Select 
              name="subject"
              value={subject}
              label="Matéria"
              onChange={(e) => setSubject(e.target.value)}
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
            <Input 
              name="cost" 
              value={cost}
              label="Custo da sua hora por aula" 
              onChange={(e) => setCost(e.target.value)}
            />
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
              <button type="button" onClick={addNewScheduleItem}>
                + Novo horário
              </button>
            </legend>

            {scheduleItems.map((scheduletTime, index) => (
              <div className="schedule-item" key={scheduletTime.week_day}>
                <Select 
                  name="week_day"
                  value={scheduletTime.week_day}
                  label="Dia da semana"
                  onChange={(e) => setScheduleItemValue(index, 'week_day', e.target.value)}
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
                  name="from" 
                  label="Das" 
                  type="time"
                  value={scheduletTime.from}
                  onChange={(e) => setScheduleItemValue(index, 'from', e.target.value)}  
                />
                <Input 
                  name="to" 
                  label="Até" 
                  type="time"
                  value={scheduletTime.to}
                  onChange={(e) => setScheduleItemValue(index, 'to', e.target.value)}  
                />
              </div>
            ))}
            
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante"/>
              Importante! <br/>
              Preencha todos os dados.
            </p>
            <button>
              Salvar cadastro
            </button>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default TeacherForm;