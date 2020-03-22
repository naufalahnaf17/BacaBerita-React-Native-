import 'react-native-gesture-handler'
import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'

import CustomHeader from './component/CustomHeader'

import Headlines from './ui/Headlines'
import Entertaiment from './ui/Entertaiment'
import Health from './ui/Health'
import Science from './ui/Science'
import Sports from './ui/Sports'

import WebBerita from './component/WebBerita';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

function MatertialTopTab(){
  return(
    <Tab.Navigator 
      initialRouteName="Headlines" 
      lazy={true}
      tabBarOptions={{ 
        tabStyle : {width : 'auto'} , 
        scrollEnabled : true
    }}>
        <Tab.Screen name="Headlines" component={Headlines} />
        <Tab.Screen name="Entertaiment" component={Entertaiment} />
        <Tab.Screen name="Health" component={Health} />
        <Tab.Screen name="Science" component={Science} />
        <Tab.Screen name="Sports" component={Sports} />
    </Tab.Navigator>
  );
}

export default function App(){
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen 
          name="Main" 
          component={MatertialTopTab}
          options={{ 
            title:'',
            headerStyle:{ backgroundColor: '#3F51B6', },
            headerTitle: props => <CustomHeader {...props} />,
          }}
        />
        <Stack.Screen 
          name="WebBerita" 
          component={WebBerita}
          options={{
            headerShown:false
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}