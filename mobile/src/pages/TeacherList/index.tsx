import React, { useState, useEffect } from 'react';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';


import { 
  Container, 
  ListTeacher,
  SearchForm,
  Label,
  Input,
  InputGroup,
  InputBlock,
  SubmitButton,
  SubmitButtonText
} from './styles';

import Header from '../../components/Header';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import api from '../../services/api';
import { Alert } from 'react-native';

const TeacherList = () => {
  const [ isFilterVisible, setIsFilterVisible ] = useState(false);

  const [ favorites, setFavorites ] = useState<number[]>([]);

  const [ teachers, setTeachers ] = useState([]);
  const [ week_day, setWeek_day ] = useState('');
  const [ subject, setSubject ] = useState('');
  const [ time, setTime ] = useState('');

  async function loadFavorites() {

    AsyncStorage.getItem('favorites').then(response => {
      if (response) {
        const favoritedTeachers = JSON.parse(response);
        const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
          return teacher.id;
        });

        setFavorites(favoritedTeachersIds);
      }
    });
  }

  function handleFiltersSubmit() {
    loadFavorites();

    api.get('classes', {
      params: {
        week_day,
        subject,
        time
      }
    }).then(response => {
      setTeachers(response.data);
      setIsFilterVisible(false);
    }).catch(err => {
      Alert.alert('Filtros insuficientes', 'Preencha todos os campos.');
    });
  }

  function handleToggleVisible() {
    setIsFilterVisible(!isFilterVisible);
  }

  return (
    <Container>
      <Header title="Proffys Disponíveis" headerRight={(
        <BorderlessButton onPress={handleToggleVisible}>
          <Feather name="filter" size={20} color="#fff" />
        </BorderlessButton>
      )}>
        {isFilterVisible && (
          <SearchForm>
            <Label>Matéria</Label>
            <Input 
              placeholder="Qual matéria ?"
              placeholderTextColor="#c1bccc"
              value={subject}
              onChangeText={text => setSubject(text)}
            />

            <InputGroup>
              <InputBlock>
                <Label>Dia da semana</Label>
                <Input 
                  placeholder="Qual dia ?"
                  placeholderTextColor="#c1bccc"
                  value={week_day}
                  onChangeText={text => setWeek_day(text)}
                />
              </InputBlock>

              <InputBlock>
                <Label>Horário</Label>
                <Input 
                  placeholder="Qual horário ?"
                  placeholderTextColor="#c1bccc"
                  value={time}
                  onChangeText={text => setTime(text)}
                />
              </InputBlock>
            </InputGroup>
            
            <SubmitButton onPress={handleFiltersSubmit}>
              <SubmitButtonText>Filtrar</SubmitButtonText>
            </SubmitButton>
          </SearchForm>
        )}
      </Header>

      <ListTeacher 
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {teachers.map((teacher: Teacher) => (
          <TeacherItem 
            key={teacher.id} 
            teacher={teacher}
            favorited={favorites.includes(teacher.id)}
          />
        ))}
      </ListTeacher>
    </Container>
  );
} 

export default TeacherList;