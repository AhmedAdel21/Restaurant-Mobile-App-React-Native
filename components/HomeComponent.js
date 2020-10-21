import React from 'react';
import { Text, ScrollView, View } from 'react-native';
import { Card } from 'react-native-elements';
import { DISHES } from '../shared/dishes';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions';
function RenderItem(props){
    const item = props.item;
    if(item != null){
        return(
            <Card>
                <Card.Image source={require('./images/uthappizza.png')} >
                    <View style={{alignSelf:'center'}}>
                        <Card.Title style={{color:'#fff'}}>{item.name}</Card.Title>
                        <Card.FeaturedSubtitle>{item.designation}</Card.FeaturedSubtitle>
                    </View>
                </Card.Image>
                <Text style={{margin: 10}}>
                    {item.description}
                </Text>
            </Card>
        );
    }
    else{
        return(<View></View>);
    }
}
export default function Home(props){
    const dishes = DISHES;
    const leaders = LEADERS;
    const promotions= PROMOTIONS;
    return(
    <ScrollView>
        <Text>{props.dola}</Text>
        <RenderItem item={dishes.filter((dish) => dish.featured)[0]} />
        <RenderItem item={leaders.filter((leader) => leader.featured)[0]} />
        <RenderItem item={promotions.filter((promotion) => promotion.featured)[0]} />
    </ScrollView>);
}