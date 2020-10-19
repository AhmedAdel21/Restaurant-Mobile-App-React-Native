import {FlatList} from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import React from 'react';
import {DISHES} from '../shared/dishes';

function Menu (props){
    const { navigate } = props.navigation;
    const dishes = DISHES;
    const renderMenuItem = ({item,index}) => {
        return(
            <ListItem key={index.toString()} bottomDivider
            onPress={() => navigate('Dishdetail', { dishId: item.id })}>
                <Avatar source={require('./images/zucchipakoda.png')}/>
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