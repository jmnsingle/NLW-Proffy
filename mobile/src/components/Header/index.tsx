import React, { ReactNode } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import backIcon from '../../assets/images/icons/back.png';
import logoImg from '../../assets/images/logo.png';

import { 
  Container, 
  TopBar, 
  Title,
  ContainerTitle 
} from './styles';

interface HeaderProps {
  title: string;
  headerRight?: ReactNode;
}

const Header: React.FC<HeaderProps> = ({ title, children, headerRight }) => {
  const { navigate } = useNavigation();

  function handleGoBack() {
    navigate('Landing');
  }

  return (
    <Container>
      <TopBar>
        <BorderlessButton onPress={handleGoBack}>
          <Image source={backIcon} resizeMode="contain" />
        </BorderlessButton>

        <Image source={logoImg} resizeMode="contain"/>
      </TopBar>

      <ContainerTitle>
        <Title>{title}</Title>

        {headerRight}
      </ContainerTitle>

      {children}
    </Container>
  );
}

export default Header;