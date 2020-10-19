import 'react-native-gesture-handler';

import React, { Component, useState } from 'react';
import {DISHES} from '../shared/dishes';
import Menu from './MenuComponent';
import Dishdetail from './DishDetailComponent';
import Home from'./HomeComponent';
import Dola from './Dola';
import { View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Icon } from 'react-native-elements';

const Stack  = createStackNavigator(); 
const Drawer = createDrawerNavigator();
const menuNavigator = () => {
    return(
        <Stack.Navigator initialRouteName="Menu" screenOptions={{headerStyle: {backgroundColor: "#512DA8"},
            headerTintColor: "#fff",headerTitleStyle: {color: "#fff"}}} >
            <Stack.Screen name="Dola" component={Dola}  options={{ title: 'Dola' }} />
            <Stack.Screen name="Menu" component={Menu}  options={{ title: 'Menu' }} />
            <Stack.Screen name="Dishdetail" component={Dishdetail}  options={{ title: 'Dish detail' }} />
        </Stack.Navigator>
    );

}
const homeNavigator = () =>{
    return(
        <Stack.Navigator screenOptions={{headerStyle: {backgroundColor: "#512DA8"},
            headerTintColor: "#fff",headerTitleStyle: {color: "#fff"}}}>
            <Stack.Screen name='Home' component={Home}/>
        </Stack.Navigator>
    );
}
class Main extends Component{
    constructor(props){
        super (props);
        this.state ={
            dishes: DISHES,
            selectedDish : null
        }
    }
    onDishSelect (dishId){ 
        this.setState({selectedDish : dishId})
     }
    
    render(){
        return( 
            <NavigationContainer>
                <Drawer.Navigator initialRouteName="Home" drawerStyle={{backgroundColor: '#D1C4E9'}}>
                    <Drawer.Screen name='Home' component={homeNavigator}/>
                    <Drawer.Screen name='Menu' component={menuNavigator}/>
                </Drawer.Navigator>
            </NavigationContainer>
            )}

}

export default Main;