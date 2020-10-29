import React from 'react';
import { FlatList, View, Text } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';





export default function Favorites (props){

    const { navigate } = props.navigation;
    const dishes = useSelector(state => state.dishes)
    const favorites = useSelector(state => state.favorites.favorites)
    const renderMenuItem = ({item , index}) => {
        return(
            <ListItem key={index.toString()} bottomDivider
            onPress={() => navigate('Dishdetail', { dishId: item.id })}>
                <Avatar rounded source={{uri: baseUrl + item.image}}/>
                <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
                <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
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