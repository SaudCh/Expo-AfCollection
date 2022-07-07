import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { COLORS } from '../Const/color';
import { globalStyle } from '../Components/Styles/GlobalStyles';
import { TouchableOpacity } from 'react-native';
import { CirleCross, DecrementIcon, IncrementIcon } from '../Components/Icons/Icon';
import { changeNS } from '../Components/Functions/Global';

export default function CartCard(props) {
    const { item, deleteItem, incQuan, decQuan } = props
    const { id, name, images, price, subCategory, quantity } = item

    const mainImage = images.find(x => x.isMain === true);

    const actPrice = subCategory.discount ? price - ((price * subCategory.discount) / 100) : price

    return (
        <View style={{ ...styles.card, ...globalStyle.shadow }}>
            <Image
                style={{ ...styles.cardImage }}
                source={{
                    uri: images.length ? mainImage.url : null,
                }} />
            <View style={{ flexDirection: "row", flex: 1, justifyContent: 'space-between' }}>
                <View style={{ marginLeft: 10 }}>
                    <Text style={{ ...styles.title }}>{name.substring(0,17)}...</Text>
                    <View style={{ flexDirection: 'row' }}>
                        {subCategory.discount ? <Text style={{ fontSize: 15, textDecorationLine: "line-through" }}>Rs. {changeNS(price)}</Text> : <Text style={{ fontSize: 15 }}>Rs. {changeNS(actPrice)}</Text>}
                        {subCategory.discount ? <Text style={{ fontSize: 15, color: COLORS.success }}> Rs. {changeNS(actPrice)}</Text> : null}
                    </View>
                </View>

                <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', marginBottom: 5 }}>{"Rs " + changeNS(actPrice * quantity)}</Text>
                    <View style={{ ...globalStyle.hStack, ...globalStyle.border, borderRadius: 10 }}>

                        <TouchableOpacity onPress={() => decQuan(id)} style={{ ...styles.decContainer }}>
                            <DecrementIcon size={20} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 14, paddingHorizontal: 10, }}>{quantity}</Text>
                        <TouchableOpacity onPress={() => incQuan(id)} style={{ ...styles.incContainer }}>
                            <IncrementIcon size={20} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <TouchableOpacity onPress={() => deleteItem(id)}>
                <CirleCross color={COLORS.danger} style={{ marginLeft: 10 }} />
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    card: {
        borderRadius: 20,
        backgroundColor: '#fff',
        margin: 5,
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
    incContainer: {
        borderLeftWidth: 1,
        borderColor: "rgba(0,0,0,0.3)",
        paddingHorizontal: 2
    },
    decContainer: {
        borderRightWidth: 1,
        borderColor: "rgba(0,0,0,0.3)",
        paddingHorizontal: 2
    }
});