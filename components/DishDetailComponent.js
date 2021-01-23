import React,{useState} from 'react';
import { View, Text } from 'react-native';
import { Tile,Card, Icon, Input, Rating } from 'react-native-elements';
import {FlatList, Modal,Button , Alert, PanResponder} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { baseUrl } from '../shared/baseUrl';
import { useSelector, useDispatch } from 'react-redux';
import {ADD_FAVORITE} from '../redux/favorites';
import {postComments} from '../redux/comments';
import { Value } from 'react-native-reanimated';
import * as Animatable from 'react-native-animatable';


function RenderComments(props) {

    const comments = props.comments;
            
    const renderCommentItem = ({item, index}) => {
        
        return (
            <View key={index.toString()} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Text style={{fontSize: 12}}> <Rating imageSize={10} readonly startingValue={item.rating}/></Text>
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
        );
    };
    
    return (
        <Card>
            <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
                <Card.Title>Comments</Card.Title>
                <FlatList 
                    data={comments}
                    renderItem={renderCommentItem}
                    keyExtractor={item => item.id.toString()}
                    />
            </Animatable.View>
        </Card>
    );
}

const CommetsModal = ({showModal, toggleModal, dishId}) =>{
    const dispatch = useDispatch();
    const dishIdddd = dishId;
    const [author, setAuthor] = useState('');
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState('');

    const resetForm = () => {
        setAuthor('');setComment('');setRating('');
    }

    const submiteComment = (rating, author, comment, dishId = dishIdddd) => {
        dispatch(postComments(rating, author, comment, dishId))}
    return(
        <Modal animationType = {"slide"} transparent = {false}
            visible = {showModal}
            onDismiss = {() => toggleModal() }
            onRequestClose = {() => toggleModal() }>
            
            <View>

            </View>
            <View style={{margin: 30}} >
                <Rating showRating  startingValue={3} 
                onFinishRating={value => setRating(value)  } />
            </View>

            <Input
            placeholder='Author'
            leftIcon={{ type: 'font-awesome', name: 'user-o' }}
            onChangeText = {Value => setAuthor(Value)}
            />

            <Input
            placeholder='Comment'
            leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
            onChangeText = {value  => setComment(value)}
            />
            <View style={{marginBottom:20}}>
                <Button 
                onPress = {() =>{toggleModal();  submiteComment(rating,author,comment); resetForm(); }}
                title="SUBMIT" 
                color="#512DA8"
                
                />
            </View>
                <Button 
                onPress = {() =>{toggleModal(); resetForm();}}
                title="CANCEL"
                color="#756e6d"
                
                />
        </Modal>
    );
}
function RenderDish (props) {
        const dish = props.dish;
        handleViewRef = ref => view = ref;
        const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
            if ( dx < -200 )
                return true;
            else
                return false;
        }
    
        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (e, gestureState) => {
                return true;
            },
            onPanResponderGrant: () => {view.rubberBand(1000).then(endState => console.log(endState.finished ? 'finished' : 'cancelled'));},
            onPanResponderEnd: (e, gestureState) => {
                console.log("pan responder end", gestureState);
                if (recognizeDrag(gestureState))
                    Alert.alert(
                        'Add Favorite',
                        'Are you sure you wish to add ' + dish.name + ' to favorite?',
                        [
                            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                            {text: 'OK', onPress: ()=>{props.favorite ? console.log("Already favorite") : props.onPress() } },
                        ],
                        { cancelable: false }
                    );
    
                return true;
            }
        })
        if (dish != null){
            return(
                <Card  >
                    <Animatable.View animation="fadeInDown" duration={2000} delay={1000}
                    ref={handleViewRef}
                    {...panResponder.panHandlers}>
                    <Card.Image source={{uri: baseUrl + dish.image}} style={{justifyContent: 'center'}}><Card.Title style={{color:'white'}}>{dish.name}</Card.Title></Card.Image>
                        <Text style={{margin: 10}}>
                            {dish.description}
                        </Text>
                        <View style={{flex: 1, flexDirection: 'row', alignItems:'center',justifyContent:'center' }}>
                            <Icon raised reverse
                                name={props.favorite ? 'heart' : 'heart-o'} type='font-awesome' color='#f50'
                                onPress={()=>props.favorite ? console.log("Already favorite") : props.onPress() }
                                />
                            <Icon
                                raised reverse
                                name='pencil'
                                type='font-awesome'
                                color='#512DA8'
                                onPress={() => props.toggleModal()} />
                        </View>
                    </Animatable.View>
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
    const [showModal, setShowModal] = useState(false);
    
    const toggleModal = () =>{
        setShowModal(!showModal);
    }

    const markFavorite = (dishId) =>{
        dispatch(ADD_FAVORITE(dishId))
        }
        
    return(
        <ScrollView>
            <RenderDish dish={dishes[+dishId]}
            favorite ={favorites.some(el => el === dishId)}
            onPress ={()=>markFavorite(dishId)}
            toggleModal={toggleModal} />
            <RenderComments comments={comments.filter((comment) => comment.dishId===dishId)} />
            <CommetsModal showModal={showModal} toggleModal={toggleModal}
             dishId = {dishId} />
        </ScrollView>
    );
}