import {FlatList} from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import React , {useEffect} from 'react';
import {DISHES} from '../shared/dishes';
import { useSelector, useDispatch } from 'react-redux';
import {ADD_DISHES,fetchDishAsync,fetchDishes,fetchRecipes} from '../redux/dishes';
import { baseUrl } from '../shared/baseUrl';
function Menu (props){
    const { navigate } = props.navigation;
    const dispatch = useDispatch();
    const postStatus = useSelector((state) => state.dishes.status)
    useEffect(() => {
        if (postStatus === 'idle') {
            console.log(postStatus)
          dispatch(fetchDishes())
        }
      }, [postStatus, dispatch])
    
    const dishes = useSelector(state => state.dishes.dishes)
    console.log(dishes)
    const renderMenuItem = ({item,index}) => {
        //console.log(baseUrl + item.image)
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