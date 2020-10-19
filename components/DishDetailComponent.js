import React from 'react';
import { View } from 'react-native';
import { Tile } from 'react-native-elements';
import { ListItem, Avatar } from 'react-native-elements';
import {DISHES} from '../shared/dishes';
function RenderDish (props) {
        const dish = props.dish;
        console.log(dish)
        if (dish != null){
            return(
                <Tile
                    imageSrc={require("./alberto.png")}
                    title={dish.name}
                    featured
                    caption={dish.description}
                    /> 
                    )
        }
        else{
            return(<View></View>);
        }
}
function Dishdetail (props) {
    const dishes = DISHES
    const dishId = props.route.params.dishId;
    return(
        <RenderDish dish={dishes.filter((dish) => dish.id === dishId)[0]} />
    );
}

export default Dishdetail;