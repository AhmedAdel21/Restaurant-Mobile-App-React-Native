import React from 'react';
import { View, Text } from 'react-native';
import { Tile,Card, Icon } from 'react-native-elements';
import {FlatList} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { baseUrl } from '../shared/baseUrl';
import { useSelector, useDispatch } from 'react-redux';
import {ADD_FAVORITE} from '../redux/favorites';
function RenderComments(props) {

    const comments = props.comments;
            
    const renderCommentItem = ({item, index}) => {
        
        return (
            <View key={index.toString()} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
        );
    };
    
    return (
        <Card>
            <Card.Title>Comments</Card.Title>
            <FlatList 
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id.toString()}
                />
        </Card>
    );
}


function RenderDish (props) {
        const dish = props.dish;
        if (dish != null){
            return(
                <Card  >
                
                <Card.Image source={{uri: baseUrl + dish.image}} style={{justifyContent: 'center'}}><Card.Title style={{color:'white'}}>{dish.name}</Card.Title></Card.Image>
                    <Text style={{margin: 10}}>
                        {dish.description}
                    </Text>
                    <View style={{flex: 1, alignItems:'center' }}>
                        <Icon raised reverse
                            name={props.favorite ? 'heart' : 'heart-o'} type='font-awesome' color='#f50'
                            onPress={()=>props.favorite ? console.log("Already favorite") : props.onPress() }
                            
                            />
                    </View>
                    
                </Card> 

                    );
        }
        else{
            return(<View></View>);
        }
}
export default function Dishdetail (props){
    const dispatch = useDispatch();
    const dishId = props.route.params.dishId;
    const dishes = useSelector(state => state.dishes.dishes)
    const comments = useSelector((state) => state.comments.comments)
    const favorites = useSelector((state) => state.favorites.favorites)

    const markFavorite = (dishId) =>{
        dispatch(ADD_FAVORITE(dishId))
        }
        
    return(
        <ScrollView>
            <RenderDish dish={dishes[+dishId]}
            favorite ={favorites.some(el => el === dishId)}
            onPress ={()=>markFavorite(dishId)} />
            <RenderComments comments={comments.filter((comment) => comment.dishId===dishId)} />
        </ScrollView>
    );
}