import 'react-native-gesture-handler';
import React, { useEffect} from 'react';
import Menu from './MenuComponent';
import Dishdetail from './DishDetailComponent';
import Home from'./HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Image, StyleSheet, View, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator,DrawerItemList } from '@react-navigation/drawer';
import { Icon } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { fetchDishes} from '../redux/dishes';
import { fetchComments} from '../redux/comments';
import { fetchLeaders} from '../redux/leaders';
import { fetchPromotions} from '../redux/promotions';
const Stack  = createStackNavigator(); 
const Drawer = createDrawerNavigator();
const menuNavigator = () => {
    return(
        <Stack.Navigator initialRouteName="Menu" screenOptions={{headerStyle: {backgroundColor: "#512DA8"},
            headerTintColor: "#fff",headerTitleStyle: {color: "#fff"}}} >
            <Stack.Screen name="Menu" component={Menu}  options= {({ navigation }) => ({ headerLeft:() => <Icon name="menu" size={30} color= 'white' onPress={ () => navigation.toggleDrawer() }/>, title:'Menu'}) } />
            <Stack.Screen name="Dishdetail" component={Dishdetail}  options={{ title: 'Dish detail' }} />
        </Stack.Navigator>
    );

}
const homeNavigator = () =>{
    return(
        <Stack.Navigator screenOptions={{headerStyle: {backgroundColor: "#512DA8"},
            headerTintColor: "#fff",headerTitleStyle: {color: "#fff"}}}>
            <Stack.Screen name='Home' component={Home} options= {({ navigation }) => ({ headerLeft:() => <Icon name="home" type='font-awesome' size={30} color= 'white' onPress={ () => navigation.toggleDrawer() }/>,title:'Home'}) }/>
        </Stack.Navigator>
    );
}
const ContactNavigator = () => {
    return(
        <Stack.Navigator screenOptions={{headerStyle: {backgroundColor: "#512DA8"},
        headerTintColor: "#fff",headerTitleStyle: {color: "#fff"}}}>
            <Stack.Screen name="Contact" component={Contact} options={{ title:'Contact Us'}} />
        </Stack.Navigator>
    );
} 
const AboutNavigator = () => {
    return(
        <Stack.Navigator screenOptions={{headerStyle: {backgroundColor: "#512DA8"},
        headerTintColor: "#fff",headerTitleStyle: {color: "#fff"}}}>
            <Stack.Screen name="About" component={About} options={{ title:'About US'}} />
        </Stack.Navigator>
    );
}
const CustomDrawerContentComponent = (props) => (
    <ScrollView>
      <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
        <View style={styles.drawerHeader}>
          <View style={{flex:1}}>
          <Image source={require('./images/logo.png')} style={styles.drawerImage} />
          </View>
          <View style={{flex: 2}}>
            <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
          </View>
        </View>
        <DrawerItemList {...props} />
      </SafeAreaView>
    </ScrollView>
  );

function Main (props){

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchDishes());
        dispatch(fetchComments());
        dispatch(fetchLeaders());
        dispatch(fetchPromotions());
    }, [dispatch])

    return( 
      <NavigationContainer>
          <Drawer.Navigator initialRouteName="Home" drawerStyle={{backgroundColor: '#D1C4E9'}} drawerContent={(props) => <CustomDrawerContentComponent {...props}/>}  >
              <Drawer.Screen name='Home' component={homeNavigator} options={{drawerIcon:({ tintColor }) => (<Icon name='home' type='font-awesome' size={24} color={tintColor}/>) ,  title: "Home"}}/>
              <Drawer.Screen name='Menu' component={menuNavigator}  options={{drawerIcon:({ tintColor }) => (<Icon name='list' type='font-awesome' size={24} color={tintColor}/>) ,title: "Menu"}}/>
              <Drawer.Screen name="ContactNavigator" component={ContactNavigator} options={{drawerIcon:({ tintColor }) => (<Icon name='address-card' type='font-awesome' size={22} color={tintColor}/>) ,title: "Contact Us"}} />
              <Drawer.Screen name="AboutNavigator" component={AboutNavigator} options={{drawerIcon:({ tintColor }) => (<Icon name='info-circle' type='font-awesome' size={24} color={tintColor}/>) ,title: "About Us"}} />
          </Drawer.Navigator>
      </NavigationContainer>
          );

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    drawerHeader: {
      backgroundColor: '#512DA8',
      height: 140,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row'
    },
    drawerHeaderText: {
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold'
    },
    drawerImage: {
      margin: 10,
      width: 80,
      height: 60
    }
  });
export default Main;