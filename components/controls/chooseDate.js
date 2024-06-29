import { StyleSheet, Text, View, Pressable, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Icon, Button } from 'react-native-paper';
import moment from 'moment';
import Modal from "react-native-modal";
import { translate } from '../../localization/localization';
export default function ChooseDate(props) {
    const [date, setDate] = useState(props.date ? props.date : new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [tempDate, setTempDate] = useState(props.date ? props.date : new Date())

    useEffect(() => {
        props.changeDate(date)
    }, [date])

    useEffect(() => {
        setDate(props.date)
    }, [props.date])
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        if (Platform.OS === 'android') {
            setShow(false);
        }
        setDate(currentDate);

    };

    const setDateTimeIos = () => {
        setShow(!show);
        setTempDate(date)
    }

    const showDatePicker = () => {
        if (Platform.OS === 'ios') {
            setDate(tempDate)
        }
        setShow(!show);
    }

    const cancelSetDate = () => {
        setDate(tempDate)
        setShow(!show);
    }

    return (
        <>
            <View >
                <View className="mb-4 ">
                    <Text className="text-gray-600 font-medium text-sm mb-2">{props.title ? props.title : 'Date'}</Text>
                    <Pressable onPress={() => showDatePicker()} style={{ borderWidth: 1, borderColor: '#D0D5DD', borderRadius: 8 }} className=" rounded-lg p-3 flex flex-row justify-between">
                        <Text>{moment(date).format("DD/MM/YYYY")}</Text>
                        <Icon
                            source="calendar-month-outline"
                            size={20}
                        />
                    </Pressable>
                </View>
                {
                    show && (
                        <View>
                            {
                                Platform.OS === 'ios' || Platform.OS === 'macos' ?
                                    <Modal
                                        isVisible={true}
                                        onBackdropPress={() => showDatePicker()}
                                        style={styles.view}
                                    >
                                        <View className="bg-white">
                                            <View className="flex flex-row justify-between">
                                                <Button onPress={() => cancelSetDate()}><Text>{translate('cancel')}</Text></Button>
                                                <Button onPress={setDateTimeIos}><Text>{translate('complete')}</Text></Button>
                                            </View>
                                            <DateTimePicker
                                                maximumDate={props.maxDate ? new Date(props.maxDate) : undefined}
                                                minimumDate={props.minDate ? new Date(props.minDate) : undefined}
                                                value={date}
                                                mode={mode}
                                                is24Hour={props.is24Hour ? true : false}
                                                onChange={onChange}
                                                display="spinner"
                                                dia
                                            />
                                        </View>
                                    </Modal>
                                    :

                                    <DateTimePicker
                                        maximumDate={props.maxDate ? new Date(props.maxDate) : undefined}
                                        minimumDate={props.minDate ? new Date(props.minDate) : undefined}
                                        value={date}
                                        mode={mode}
                                        is24Hour={props.is24Hour ? true : false}
                                        onChange={onChange}
                                    />

                            }
                        </View>
                    )
                }

            </View>
        </>
    );
}

const styles = StyleSheet.create({
    view: {
        justifyContent: 'flex-end',
        margin: 0,
    },
});