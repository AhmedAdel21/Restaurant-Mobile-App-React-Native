import React from 'react';
import { Text, ScrollView, View } from 'react-native';
import { Card } from 'react-native-elements';
import { useSelector } from 'react-redux';
import {baseUrl} from '../shared/baseUrl';

function RenderItem(props){
    const item = props.item;
    if(item != null){
        return(
            <Card>
                <Card.Image source={{uri: baseUrl + item.image}} >
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
    const dishes = useSelector(state => state.dishes.dishes)
    const leaders = useSelector((state) => state.leaders.leaders)
    const promotions= useSelector((state) => state.promotions.promotions)
    return(
    <ScrollView>
        <Text>{props.dola}</Text>
        <RenderItem item={dishes.filter((dish) => dish.featured)[0]} />
        <RenderItem item={promotions.filter((promo) => promo.featured)[0]} />
        <RenderItem item={leaders.filter((leader) => leader.featured)[0]} />
    </ScrollView>);
}