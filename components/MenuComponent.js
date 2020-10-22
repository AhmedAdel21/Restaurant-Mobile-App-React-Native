import {FlatList, View, Text} from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import React  from 'react';
import { useSelector } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';

function Menu (props){
    const { navigate } = props.navigation;
    const dishes = useSelector(state => state.dishes)

    const renderMenuItem = ({item,index}) => {
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
    if(dishes.status === 'loading'){
        return(
            <Loading />
        );
    }
    else if (dishes.errMess){
        return(
            <View>
                <Text>{dishes.errMess}</Text>
            </View>
        );
    }
    else{
        return(
            <FlatList
            data={dishes.dishes}
            keyExtractor={item => item.id.toString()}
            renderItem={renderMenuItem}
            />
        );
    }
}


export default Menu;