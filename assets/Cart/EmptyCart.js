import { View, Text } from 'react-native'
import React from 'react'
import { CartIcon } from '../Components/Icons/Icon'
import { COLORS } from '../Const/color'
import { Button } from 'react-native-paper'
import { dimensions } from '../Const/heightWidth'
import { useNavigation } from '@react-navigation/native'


export default function EmptyCart() {
    const navigation = useNavigation()
    return (
        <View style={{
            height: dimensions.height * 0.8,
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <CartIcon size={150} color={COLORS.dPink} />
            <Text style={{ color: COLORS.dPink, fontSize: 22, marginBottom: 10 }}>Your cart is Empty</Text>
            <Text style={{ marginBottom: 10 }}>Add something to make me happy :)</Text>
            <Button onPress={() => navigation.navigate('Home')} mode='contained' color={COLORS.dPink}>Go to Homepage</Button>
        </View>
    )
}