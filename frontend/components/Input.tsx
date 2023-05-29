import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { View } from '../components/Themed';
import { Picker } from '@react-native-picker/picker';

export function InputBorder({children}: {children: React.ReactNode }) {
    return (
        <View style={styles.borderStyle}>
            {children}
        </View>
    )
}

export function SelectorFilter({onValueChange, values, selectedValue, initialValue}: 
    {onValueChange?: ((itemValue: any, itemIndex: number) => void), values?: [string | number] | [], selectedValue?: string | number, initialValue?: string}) {
    
    if (!values) {
        values = []
    }

    const pickerValues = values.map((v) => {
        return <Picker.Item key={v} label={v.toString()} value={v}/>
    })

    return (
        <InputBorder>
            <Picker style={styles.inputStyle}
                selectedValue={selectedValue}
                onValueChange={onValueChange}
            >
                <Picker.Item label={initialValue} value={initialValue}/>
                {pickerValues}
            </Picker>
        </InputBorder>
    )
}

export function TextSearch({onSubmitEditing, onChange, value}: {
    onSubmitEditing?: ((text: string) => void) | undefined,
    onChange?: ((text: string) => void) | undefined,
    value?: string | undefined
}) {
    return (
        <InputBorder>
            <TextInput style={styles.inputStyle}
                autoFocus
                placeholder='Filter by name...'
                onSubmitEditing={(e)=>{onSubmitEditing?.(e.nativeEvent.text)}}
                onChangeText={onChange}
                value={value}
            />
        </InputBorder>
    )
}

const styles = StyleSheet.create({
    inputStyle: {
        outlineStyle: 'none',
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: "400",
        fontSize: 16,
        color: "rgba(0, 0, 0, 0.7)",
        borderWidth: 0,
        backgroundColor: "rgba(0,0,0,0)",
        height: 50
    },
    borderStyle: {
        flex: 1,
        justifyContent: 'center',
        borderColor: 'rgba(0, 0, 0, 0.7)',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 8,
        position: 'relative',
        padding: 5
    }
});