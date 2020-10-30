import React from 'react';
import { FlatList, View, Text, TouchableOpacity ,StyleSheet, Animated, Alert } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { useSelector,useDispatch } from 'react-redux';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import Swipeable from 'react-native-gesture-handler/Swipeable';
//import Swipeable from 'react-native-swipeable';

import {DELETE_FAVORITE} from '../redux/favorites';




const RenderItems = (props) => {
    const item = props.item;
    const index = props.index;
    const showAlert = () =>{
        Alert.alert(
            'Delete Favorite ?',
            'Are you sure you wish to delete the favorite dish ' + item.name + '?',
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => {props.deleteFavorite();console.log("OK Pressed"); } }
            ],
            { cancelable: false }
          );
    }
    const leftSwipe = () => {
        return (
          <TouchableOpacity activeOpacity={0.6} onPress={showAlert} >
            <View style={styles.deleteBox}>
              <Animated.Text >
                Delete
              </Animated.Text>
            </View>
          </TouchableOpacity>
        );
      };

    return(
        <Swipeable renderRightActions={leftSwipe} >
                <ListItem key={index.toString()} bottomDivider
                onPress={() => props.navigate('Dishdetail', { dishId: item.id })}>
                    <Avatar rounded source={{uri: baseUrl + item.image}}/>
                    <ListItem.Content>
                    <ListItem.Title>{item.name}</ListItem.Title>
                    <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            </Swipeable>
    );
}
export default function Favorites (props){
    const dispatch = useDispatch()
    const { navigate } = props.navigation;
    const dishes = useSelector(state => state.dishes)
    const favorites = useSelector(state => state.favorites.favorites)

    const deleteFavorite= (id) => {dispatch(DELETE_FAVORITE(id))}
    
    const renderMenuItem = ({item , index}) => {
        return(
            <RenderItems item={item} index={index} navigate={navigate} deleteFavorite={() => deleteFavorite(index)}/>
        );
    }
    if (dishes.isLoading) {
        return(
            <Loading />
        );
    }
    else if (dishes.errMess) {
        return(
            <View>            
                <Text>{dishes.errMess}</Text>
            </View>            
        );
    }
    else {
        return (
            <FlatList 
                data={dishes.dishes.filter(dish => favorites.some(  el => el === dish.id))}
                renderItem={renderMenuItem}
                keyExtractor={item => item.id.toString()}
                />
        );
    }
} 


const styles = StyleSheet.create({

      deleteBox: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 120,
      }
})