import React, { useState  } from 'react';
import { Text, View, ScrollView, StyleSheet, Switch, Button, Platform, Modal } from 'react-native';
//import DatePicker from 'react-native-datepicker';
import {Picker} from '@react-native-community/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

import * as Localization from 'expo-localization';
import moment from 'moment-timezone';
import { cos } from 'react-native-reanimated';

function Reservation(props){
    // get the actual date of any device 
    const deviceTimezone = Localization.timezone;
    const deviceActualDate = moment().tz(deviceTimezone)
    const displayedDate = new Date(deviceActualDate)

    const [guests , SetGuests] = useState(0);
    const [smoking, SetSmoking] = useState(false);

    const [date, SetDate] = useState(displayedDate);
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    
    const [showModal, setShowModal] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        SetDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };
      
    const handleReservation = () =>{
        console.log(JSON.stringify(guests));
        console.log(JSON.stringify(smoking));
        console.log(JSON.stringify(date));
        
    }

    const itemsNumber = new Array(6)
    for (var index = 0; index < itemsNumber.length; index++) {
        itemsNumber[index] = index + 1;
    }
    const pickerItems = itemsNumber.map((index) => 
    <Picker.Item label={index.toString()} value={index.toString()} key={index.toString()} />   )     
    
    const canSave = !(guests == 0 || date === displayedDate)

    const toggleModal = () =>{
        setShowModal(!showModal);
    }
    const resetForm =() =>{
        SetGuests(0);
        SetSmoking(false);
        SetDate(displayedDate);
    }
    return(
        <ScrollView> 
            <View style={styles.formRow}>
                <Text style={styles.formLabel}>Number of Guests</Text>
                <Picker
                    selectedValue={guests}
                    style={styles.formItem}
                    onValueChange={(itemValue, itemIndex) =>
                        SetGuests(itemValue)
                    }>
                    <Picker.Item label='0' value='0' key='0' />
                    {pickerItems}
                </Picker>
            </View>
            <View style={styles.formRow}>
                <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
                <Switch
                    style={styles.formItem}
                    value={smoking}
                    onTintColor='#512DA8'
                    onValueChange={(value) => SetSmoking(value)}>
                </Switch>
            </View>
            <View style={styles.formRow}>
                <Text style={styles.formLabel}>Date and Time</Text>
                <View>
                    <Button color="#f194ff" onPress={showDatepicker} title={date.toLocaleDateString()} />
                </View>
                <View>
                    <Button color="#f194ff" onPress={showTimepicker} title={date.toLocaleTimeString()} />
                </View>
                {show && (
                    <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={false}
                    display="spinner"
                    onChange={onChange}
                    />
                )}
            </View>
            <View style={styles.formRow}>
                    <Button
                        onPress={() => {handleReservation(); toggleModal()}}
                        title="Reserve"
                        color="#512DA8"
                        accessibilityLabel="Learn more about this purple button"
                        disabled={!canSave}
                        />
            </View>
            <Modal animationType = {"slide"} transparent = {false}
                visible = {showModal}
                onDismiss = {() => toggleModal() }
                onRequestClose = {() => toggleModal() }>
                    <View style = {styles.modal}>
                        <Text style = {styles.modalTitle}>Your Reservation</Text>
                        <Text style = {styles.modalText}>Number of Guests: {guests}</Text>
                        <Text style = {styles.modalText}>Smoking?: {smoking ? 'Yes' : 'No'}</Text>
                        <Text style = {styles.modalText}>Date and Time: {date.toLocaleDateString()}  {date.toLocaleTimeString()}</Text>
                        
                        <Button 
                            onPress = {() =>{toggleModal(); resetForm();}}
                            color="#512DA8"
                            title="Close" 
                            />
                    </View>
                </Modal>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    formRow: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
      margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
     },
     modalTitle: {
         fontSize: 24,
         fontWeight: 'bold',
         backgroundColor: '#512DA8',
         textAlign: 'center',
         color: 'white',
         marginBottom: 20
     },
     modalText: {
         fontSize: 18,
         margin: 10
     }
});

export default Reservation;