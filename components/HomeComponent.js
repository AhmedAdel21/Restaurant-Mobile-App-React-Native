import React from 'react';
import { Text, ScrollView, View } from 'react-native';
import { Card } from 'react-native-elements';
import { useSelector } from 'react-redux';
import {baseUrl} from '../shared/baseUrl';
import {Loading} from './LoadingComponent';

function RenderItem(props){
    const item = props.item;
    if(props.status==='loading'){
        return(
            <Loading/>
        );
    }
    else if (props.errMess){
        return(
            <View>
                <Text>{props.errMess}</Text>
            </View>
        );
    }
    else{
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
    
}
export default function Home(props){
    const dishes = useSelector(state => state.dishes)
    const leaders = useSelector((state) => state.leaders)
    const promotions= useSelector((state) => state.promotions)
    return(
    <ScrollView>
        <Text>{props.dola}</Text>
        <RenderItem item={dishes.dishes.filter((dish) => dish.featured)[0]}
        status={dishes.status}
        errMess={dishes.errMess}
        />
        <RenderItem item={promotions.promotions.filter((promo) => promo.featured)[0]} 
        status={promotions.status}
        errMess={promotions.errMess}
        />
        <RenderItem item={leaders.leaders.filter((leader) => leader.featured)[0]}
        status={leaders.status}
        errMess={leaders.errMess}
        />
    </ScrollView>);
}