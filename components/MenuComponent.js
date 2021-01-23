import {FlatList, View, Text} from 'react-native';
import { ListItem, Avatar,Tile } from 'react-native-elements';
import React  from 'react';
import { useSelector } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import * as Animatable from 'react-native-animatable';

function Menu (props){
    const { navigate } = props.navigation;
    const dishes = useSelector(state => state.dishes)

    const renderMenuItem = ({item,index}) => {
        return(
            <Animatable.View animation="fadeInRightBig" duration={2000}> 
                <Tile
                imageSrc={{uri: baseUrl + item.image}}
                title={item.name}
                featured
                caption={item.description}
                key={index.toString()} bottomDivider
                onPress={() => navigate('Dishdetail', { dishId: item.id })}
                />
            </Animatable.View>
            
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