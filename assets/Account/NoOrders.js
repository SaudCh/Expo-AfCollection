import { View, Text } from 'react-native'
import React from 'react'
import { CartIcon } from '../Components/Icons/Icon'
import { COLORS } from '../Const/color'
import { Button } from 'react-native-paper'
import { dimensions } from '../Const/heightWidth'


export default function EmptyOrder() {
    return (
        <View style={{
            height: dimensions.height * 0.8,
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <CartIcon size={150} color={COLORS.dPink} />
            <Text style={{ color: COLORS.dPink, fontSize: 22, marginBottom: 10 }}>You haven't placed any order yet</Text>
            <Text style={{ marginBottom: 10 }}>Add something to make me happy :)</Text>
            <Button mode='contained' color={COLORS.dPink}>Go to Homepage</Button>
        </View>
    )
}