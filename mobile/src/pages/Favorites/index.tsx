import React, { useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Header from '../../components/Header';

import { Container, ListTeacher } from './styles';

const Favorites = () => {
  const [ favorites, setFavorites ] = useState([]);

  async function loadFavorites() {
    AsyncStorage.getItem('favorites').then(response => {
      if (response) {
        const favoritedTeachers = JSON.parse(response);

        setFavorites(favoritedTeachers);
      }
    });
  }

  useFocusEffect(
    React.useCallback(() => {
      loadFavorites();
    }, [])
  )

  return (
    <Container>
      <Header title="Meus proffys favoritos" />

      <ListTeacher 
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >

        {favorites.map((teacher: Teacher) => (
          <TeacherItem 
            key={teacher.id}
            teacher={teacher}
            favorited 
          />
        ))}
      </ListTeacher>
    </Container>
  );
} 

export default Favorites;