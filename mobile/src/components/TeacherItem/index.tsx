import React, { useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unFavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';

import api from '../../services/api';

import { 
  Container, 
  Profile, 
  Avatar,
  ProfileInfo, 
  Name, 
  Subject,
  Bio,
  Footer,
  Price,
  PriveValue,
  ButtonContainer,
  FavoriteButton,
  ContactButton,
  ContactButtonText
} from './styles';
import { Image, Linking } from 'react-native';

export interface Teacher {
  avatar: string;
  bio: string;
  cost: number;
  id: number;
  name: string;
  subject: string;
  user_id: number;
  whatsapp: string;
}

interface TeacherProps {
  teacher: Teacher;
  favorited: boolean;
}

const TeacherItem: React.FC<TeacherProps> = ({ teacher, favorited }) => {
  const [ isFavorited, setIsfavorited ] = useState(favorited)

  function handleLinkToWhatsApp() {
    Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`);

    api.post('connections', {
      user_id: teacher.id,
    });
  }

  async function handleToggleFavorited() {

    const favorites = await AsyncStorage.getItem('favorites');
  
    let favoritesArray = [];
  
    if (favorites) {
      favoritesArray = JSON.parse(favorites);
    }

    if (isFavorited) {
      const favoriteIndex = favoritesArray.findIndex((teacherItem: Teacher) => {
        return teacherItem.id === teacher.id;
      });

      favoritesArray.splice(favoriteIndex, 1);
      setIsfavorited(false);
    } else {

      favoritesArray.push(teacher);

      setIsfavorited(true);
    }
    
    await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
  }

  return (
    <Container>
      <Profile>
        <Avatar source={{ uri: `${teacher.avatar}` }} />

        <ProfileInfo>
          <Name>{teacher.name}</Name>
          <Subject>{teacher.subject}</Subject>
        </ProfileInfo>
      </Profile>

      <Bio>
        {teacher.bio}
      </Bio>

      <Footer>
        <Price>
          Preço/Hora {'   '}
          <PriveValue>R$ {teacher.cost}</PriveValue>
        </Price>

        <ButtonContainer>
          <FavoriteButton favorited={isFavorited} onPress={handleToggleFavorited}>
            { isFavorited 
              ? <Image source={unFavoriteIcon}/>
              : <Image source={heartOutlineIcon}/>
            }
            
          </FavoriteButton>

          <ContactButton onPress={handleLinkToWhatsApp}>
            <Image source={whatsappIcon}/>
            <ContactButtonText>Entrar em contato</ContactButtonText>
          </ContactButton>
        </ButtonContainer>
      </Footer>
    </Container>
  );
}

export default TeacherItem;