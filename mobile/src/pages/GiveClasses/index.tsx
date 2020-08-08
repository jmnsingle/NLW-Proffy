import React from 'react';
import { useNavigation } from '@react-navigation/native';

import giveClassesBgImage from '../../assets/images/give-classes-background.png';

import { 
  Container, 
  Content, 
  Title, 
  Description, 
  Button, 
  ButtonText 
} from './styles';

const GiveClasses = () => {
  const { goBack } = useNavigation();

  function handleNavigateGoback() {
    goBack();
  }

  return (
    <Container>
      <Content 
        source={giveClassesBgImage} 
        resizeMode="contain" 
      >
        <Title>Quero ser um Proffy ?</Title>
        <Description>
          Para começar, você precisa se cadastrar na nossa plataforma.
        </Description>
      </Content>

      <Button onPress={handleNavigateGoback}>
        <ButtonText>Tudo Bem</ButtonText>
      </Button>
    </Container>
  );
}

export default GiveClasses;