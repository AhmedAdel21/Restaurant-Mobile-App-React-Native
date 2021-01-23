import React from 'react';
import { Text, View, FlatList, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { ListItem ,Avatar } from 'react-native-elements'
import { useSelector} from 'react-redux';
import {baseUrl} from '../shared/baseUrl';
import {Loading} from './LoadingComponent';
import * as Animatable from 'react-native-animatable';
const renderCorporateItem = ({item,index})=>{
    return(
        <ListItem key={index.toString()}hideChevron={true}>
            <Avatar rounded source={{uri: baseUrl + item.image}}/>
            <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
                <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    );
}
const CorporateView = (props)=>{
    if(props.leaders.status === 'loading'){
        return(
            <Loading/>
        );
    }
    else if (props.leaders.errMess){
        return(
            <View>
                <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                    <Text>{props.leaders.errMess}</Text>
                </Animatable.View>
            </View>
        );
    }
    else{
        return(
            <Card>
                <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                    <Card.Title><Text>Corporate Leadership</Text></Card.Title>
                    <Card.Divider/>
                    <FlatList
                    data={props.leaders.leaders}
                    renderItem={renderCorporateItem}
                    keyExtracto={item => item.id.toString()}
                    />
                </Animatable.View>
            </Card>
        );
    }
}

const ContactView = ()=>{
        return(
            <Card>
                <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                    <Card.Title><Text>Our History</Text></Card.Title>
                    <Card.Divider/>
                    <Text>Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world 
                        fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star 
                        Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.{"\n"}</Text>
                    <Text>The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.</Text>
                </Animatable.View>
            </Card>
        );
    }
function About (props){
        const leaders = useSelector((state) => state.leaders)
        return(
            <View>
                <ScrollView>
                    <ContactView/>
                    <CorporateView leaders={leaders}/>
                </ScrollView>
            </View>
        );
}

export default About;