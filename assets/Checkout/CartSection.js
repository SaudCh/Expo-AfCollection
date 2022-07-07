import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { COLORS } from '../Const/color';
import { changeNS } from '../Components/Functions/Global';

export default function CartSection(props) {
    const { item } = props
    const { id, name, images, price, subCategory, quantity } = item

    const mainImage = images.find(x => x.isMain === true);

    const actPrice = subCategory.discount ? price - (price * subCategory.discount) / 100 : price

    return (
        <View style={{ ...styles.card }}>
            <Image
                style={{ ...styles.cardImage }}
                source={{
                    uri: images.length ? mainImage.url : null,
                }} />
            <Text style={{ ...styles.quantity }}>{quantity}</Text>
            <View style={{ flexDirection: "row", flex: 1, justifyContent: 'space-between', alignItems: "center" }}>
                <View style={{ marginLeft: 10 }}>
                    <Text style={{ ...styles.title }}>{name}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        {subCategory.discount ? <Text style={{ fontSize: 15, textDecorationLine: "line-through" }}>Rs. {changeNS(price)}</Text> : <Text style={{ fontSize: 15 }}>Rs. {changeNS(actPrice)}</Text>}
                        {subCategory.discount ? <Text style={{ fontSize: 15, color: COLORS.success }}> Rs. {changeNS(actPrice)}</Text> : null}
                    </View>
                </View>

                <Text style={{ fontSize: 15, fontWeight: 'bold', marginBottom: 5 }}>{"Rs " + changeNS(actPrice * quantity)}</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        marginHorizontal: 5,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardImage: {
        width: 50,
        height: 50,
        resizeMode: 'cover',
        borderRadius: 10
    },
    title: {
        fontWeight: "bold",
        fontSize: 18,
        color: COLORS.dPink,
        marginBottom: 2
    },
    quantity: {
        width: 20, height: 20, backgroundColor: COLORS.danger, borderRadius: 10, color: "#fff",
        textAlign: "center",
        position: 'absolute',
        top: 10,
        left: 10
    }
});