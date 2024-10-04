import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSelectedValue } from "../../hooks/SelectedValue";
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native';
import SearchScreen from '../screens/SearchScreen';
import HomeScreen from '../screens/HomeScreen';
import TvScreen from '../screens/TvScreen';

const Tab = createMaterialTopTabNavigator();

const NavCont = () => {

  const { setSelectedValue } = useSelectedValue();
  const navigation = useNavigation();

  useEffect(() => {
    const changeTab = navigation.addListener('state', () => {
      setSelectedValue('popular');
    });

    return changeTab;
  }, [navigation]);

  return (
    <Tab.Navigator
      initialRouteName="Movies"
      screenOptions={{
        tabBarLabelStyle: { fontSize: 12, textTransform: 'none' },
        tabBarActiveTintColor: '#2c3e50',
        tabBarStyle: { backgroundColor: '#ffffff' },
        indicatorStyle: { backgroundColor: '#2c3e50' },
        tabBarInactiveTintColor: '#d1d1d1',
      }}
    >
      <Tab.Screen 
        name="Movies" 
        component={HomeScreen} 
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color, textTransform: 'none' }}>Movies</Text>
          ),
        }}
      />
      <Tab.Screen 
        name="Search Results" 
        component={SearchScreen} 
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color, textTransform: 'none'}}>Search Results</Text>
          ),
        }}
      />
      <Tab.Screen 
        name="Tv Show" 
        component={TvScreen} 
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color, textTransform: 'none' }}>TV Shows</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default NavCont;