import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Tile,Card, Icon } from 'react-native-elements';
import {FlatList} from 'react-native';
import {DISHES} from '../shared/dishes';
import {COMMENTS} from '../shared/comments'
import { ScrollView } from 'react-native-gesture-handler';
import { baseUrl } from '../shared/baseUrl';
function RenderComments(props) {

    const comments = props.comments;
            
    const renderCommentItem = ({item, index}) => {
        
        return (
            <View key={index} style={{margin: 10}}>
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
                <Card>
                <Card.Title>{dish.name}</Card.Title>
                <Card.Image source={require('./alberto.png')} />
                    <Text style={{margin: 10}}>
                        {dish.description}
                    </Text>
                    <Icon raised reverse
                        name={props.favorite ? 'heart' : 'heart-o'} type='font-awesome' color='#f50'
                         onPress={()=>props.favorite ? console.log("Already favorite") : props.onPress() }/>
                </Card> 

                    );
        }
        else{
            return(<View></View>);
        }
}
class Dishdetail extends Component{
    constructor(props){
        super(props);
        this.state ={
            dishes : DISHES,
            commnets : COMMENTS,
            favorites:[]
        }
    }
    
    
    markFavorite(dishId){
        this.setState( 
            {favorites: this.state.favorites.concat(dishId)}
            )}
    render(){
        const dishId = this.props.route.params.dishId;
    return(
        <ScrollView>
            <RenderDish dish={this.state.dishes[+dishId]}
            favorite ={this.state.favorites.some(el => el === dishId)}
            onPress ={()=>this.markFavorite(dishId)} />
            <RenderComments comments={this.state.commnets.filter((comment) => comment.dishId===dishId)} />
        </ScrollView>
    );}
}

export default Dishdetail;