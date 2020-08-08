import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';

import api from '../../services/api';

import landingImg from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png';

import { 
  Container, 
  Banner, 
  Title, 
  TitleBold, 
  ButtonsContainer,
  Button,
  ButtonText,
  TotalConnections
} from './styles';

const Landing = () => {
  const { navigate } = useNavigation();
  
  const [ totalConnections, setTotalConnections ] = useState(0);

  useEffect(() => {
    api.get('connections').then(response => {
      setTotalConnections(response.data.total);
    });
  }, [])

  function handleNavigateToGiveClasses() {
    navigate('GiveClasses');
  }

  function handleNavigateToStudyPages() {
    navigate('Study');
  }

  return (
    <Container>
      <Banner source={landingImg} resizeMode="contain"/>

      <Title>
        Seja bem vindo,{'\n'}
        <TitleBold>O que você deseja fazer ?</TitleBold>
      </Title>

      <ButtonsContainer>
        <Button background="primary" onPress={handleNavigateToStudyPages}>
          <Image source={studyIcon}/>

          <ButtonText>Estudar</ButtonText>
        </Button>

        <Button background="secondary" onPress={handleNavigateToGiveClasses}>
          <Image source={giveClassesIcon}/>

          <ButtonText>Dar aulas</ButtonText>
        </Button>
      </ButtonsContainer>

      <TotalConnections>
        Total de {totalConnections} conexões realizadas {' '}
        <Image source={heartIcon}/>
      </TotalConnections>
    </Container>
  );
}

export default Landing;