import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'

import TeacherList from '../pages/TeacherList';
import Favorites from '../pages/Favorites';

const { Navigator, Screen } = createBottomTabNavigator();

const StudyTabs = () => {
  return (
    <Navigator tabBarOptions={{
      style: {
        elevation: 0,
        shadowOpacity: 0,
        height: Platform.OS === 'ios' ? 84 : 64,
      },
      tabStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: Platform.OS === 'ios' ? 20 : 0,
      },
      iconStyle: {
        flex: 0,
        width: 22,
        height: 22,
      },
      labelStyle: {
        fontFamily: 'Archivo_700Bold',
        fontSize: 13,
        marginLeft: 12,
      },
      inactiveBackgroundColor: '#fafafc',
      activeBackgroundColor: '#ebebf5',
      inactiveTintColor: '#c1bccc',
      activeTintColor: '#32264d'
    }}>
      <Screen 
        name="TeacherLIst" 
        component={TeacherList}
        options= {{
          tabBarLabel: 'Proffys',
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <Ionicons name="ios-easel" size={size} color={focused ? '#8257e5' : color} />
            );
          }
        }}
      />
      <Screen 
        name="Favorites" 
        component={Favorites}
        options= {{
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <Ionicons style={{width: 22}} name="ios-heart" size={size} color={focused ? '#8257e5' : color} />
            );
          }
        }}
      />
    </Navigator>
  );
}

export default StudyTabs;