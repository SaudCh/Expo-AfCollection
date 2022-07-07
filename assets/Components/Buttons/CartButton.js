import React, { useContext } from 'react'
import { Text } from 'react-native-paper';
import { COLORS } from '../../Const/color'
import { Entypo } from "@expo/vector-icons"
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import CartContext from '../Context/cartContext';
import { useNavigation } from '@react-navigation/native';

export default function CartButton() {
    const { cart } = useContext(CartContext)
    const navigation = useNavigation()
    
    return (

        <TouchableOpacity
            onPress={() => navigation.navigate("cart")}
            style={{ marginRight: 5 }}
        >
            <Entypo style={{ color: COLORS.dPink }} name="shopping-cart" size={24} color="black" />
            {cart.length ?
                <View style={{ ...styles.cartQuantity }}>
                    <Text style={{ color: COLORS.white }}>{cart.length}</Text>
                </View> : null
            }
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    cartQuantity: {
        position: 'absolute',
        right: -10,
        top: -10,
        backgroundColor: 'red',
        width: 20,
        height: 20,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50
    }
})