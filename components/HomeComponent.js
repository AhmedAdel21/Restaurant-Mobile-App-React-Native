import React,{useEffect,useRef} from 'react';
import { Text, View, Animated, Easing } from 'react-native';
import { Card } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
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
                    <Card.Image source={{uri: baseUrl + item.image}} style={{justifyContent:'center', alignItems:'center'}} >
                        <View >
                            <Card.Title style={{color:'#fff'}}>{item.name}</Card.Title>
                            <Card.FeaturedSubtitle >{item.designation}</Card.FeaturedSubtitle>
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
    const animatedValue = new Animated.Value(0);
    const animate =  () => {
        animatedValue.setValue(0);
        Animated.timing(
            animatedValue,
            {
                toValue: 8,
                duration: 20000,
                useNativeDriver:false,
                easing: Easing.linear
            }
        ).start(() => animate())
    };
    useEffect(() => {
        animate();
    });

    const xpos1 = animatedValue.interpolate({
        inputRange: [0, 1, 3, 5, 8],
        outputRange: [1200, 600, 0, -600, -1200]
    });
    const xpos2 = animatedValue.interpolate({
        inputRange: [0, 2, 4, 6, 8],
        outputRange: [1200, 600, 0, -600, -1200]
    });
    const xpos3 = animatedValue.interpolate({
        inputRange: [0, 3, 5, 7, 8],
        outputRange: [1200, 600, 0, -600, -1200 ]
    });
    return(
    <View style={{ flex:1 , flexDirection: 'row', justifyContent:'center' }}>
        <Animated.View style={{width:'100%', transform:[{translateX:xpos1}]}}>
            <RenderItem item={dishes.dishes.filter((dish) => dish.featured)[0]}
            status={dishes.status}
            errMess={dishes.errMess}
            />
        </Animated.View>
        <Animated.View style={{width:'100%', transform:[{translateX:xpos2}]}}>
            <RenderItem item={promotions.promotions.filter((promo) => promo.featured)[0]} 
            status={promotions.status}
            errMess={promotions.errMess}
            />
        </Animated.View>
        <Animated.View style={{width:'100%', transform:[{translateX:xpos3}]}}>
            <RenderItem item={leaders.leaders.filter((leader) => leader.featured)[0]}
            status={leaders.status}
            errMess={leaders.errMess}
            />
        </Animated.View>
    </View>
    );
}