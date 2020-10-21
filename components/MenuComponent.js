import {FlatList} from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import React  from 'react';
import { useSelector } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

function Menu (props){
    const { navigate } = props.navigation;
    const dishes = useSelector(state => state.dishes.dishes)
    console.log(dishes)
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
    return(
        <FlatList
        data={dishes}
        keyExtractor={item => item.id.toString()}
        renderItem={renderMenuItem}
        />
    );
}

export default Menu;