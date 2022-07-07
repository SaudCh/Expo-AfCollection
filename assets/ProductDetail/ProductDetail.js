import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { dimensions } from "../Const/heightWidth"
import { DecrementIcon, IncrementIcon } from '../Components/Icons/Icon';
import { globalStyle } from '../Components/Styles/GlobalStyles';
import { Button, List } from 'react-native-paper';
import { COLORS } from '../Const/color';
import Slider from './Slider';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { changeNS } from '../Components/Functions/Global';
import CartContext from '../Components/Context/cartContext';

export default function ProductDetail(props) {
    const { route } = props;
    const { product } = route.params;
    const { name, images, price, subCategory, stock, description, colors } = product;

    const { addToCart } = useContext(CartContext);

    const [quantity, setQuantity] = useState(1)
    const [color, setColor] = useState(colors.find(x => x.isDefault === true))

    const incQuantity = () => {
        if (quantity >= 5)
            return
        setQuantity((quan) => quan + 1)
    }

    const decQuantity = () => {
        if (quantity <= 1)
            return
        setQuantity((quan) => quan - 1)
    }



    return (
        <View style={{ ...styles.container }}>

            <Slider images={images} />
            <ScrollView style={{ padding: 10 }}>
                <Text style={{ ...styles.title }}>{name}</Text>

                {stock ? <Text style={{ ...styles.inStock }}>In Stock</Text> : <Text style={{ ...styles.outStock }}>Out of Stock</Text>}

                <View style={{ ...globalStyle.hStack, marginBottom: 5 }}>
                    {subCategory.discount ? <Text style={{ fontSize: 15, textDecorationLine: "line-through" }}>Rs. {changeNS(price * quantity)}</Text> : <Text style={{ fontSize: 15 }}>Rs. {changeNS(price * quantity)}</Text>}
                    {subCategory.discount ? <Text style={{ fontSize: 15, color: COLORS.success }}> Rs. {changeNS((price - ((price * subCategory.discount) / 100)) * quantity)}</Text> : null}
                </View>

                <Text style={{ ...styles.collection }}><Text style={{ fontWeight: 'bold' }}>Collections: </Text>{subCategory.name}</Text>
                <View style={{ flexDirection: 'row' }}>
                    {
                        colors ?
                            colors.map((clr) => {
                                return (
                                    <TouchableOpacity onPress={() => setColor(clr)} style={{ backgroundColor: clr.code, width: 25, height: 25, marginBottom: 5, marginRight: 10 }} >

                                    </TouchableOpacity>
                                )
                            }
                            ) : null
                    }
                </View>

                <View style={{ marginTop: 10 }}>
                    <List.AccordionGroup>
                        <List.Accordion style={{ backgroundColor: COLORS.light }} title={"Product Details".toUpperCase()} id="1">
                            <Text style={{ fontSize: 15, margin: 10 }}>
                                {description}
                            </Text>
                        </List.Accordion>

                        <List.Accordion style={{ backgroundColor: COLORS.light }} title={"Return Policy".toUpperCase()} id="2">
                            <Text style={{ fontSize: 15, margin: 10 }}>
                                If your product is defective / damaged or incorrect / incomplete at the time of delivery, your product may be eligible for refund depending on the product category and condition. You can contact us on info@qualityfabrics.pk or For whatsapp 03334076963.
                            </Text>
                        </List.Accordion>

                        <List.Accordion style={{ backgroundColor: COLORS.light }} title={"Shipping detail".toUpperCase()} id="3">
                            <Text style={{ fontSize: 15, margin: 10 }}>
                                150 Delivery Charges are applicable on complete order. We deliver all over Pakistan. For major cities, it's takes 3 to 4 working days, for other cities 4 to 6 working days.
                            </Text>
                        </List.Accordion>

                    </List.AccordionGroup>
                </View>

            </ScrollView >
            <View style={{ ...globalStyle.hStack, ...styles.cartContainer }}>
                <View style={{ ...globalStyle.hStack, ...globalStyle.border }}>

                    <TouchableOpacity onPress={() => decQuantity()} style={{ ...styles.decContainer }}>
                        <DecrementIcon />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 20, paddingHorizontal: 10 }}>{quantity}</Text>
                    <TouchableOpacity onPress={() => incQuantity()} style={{ ...styles.incContainer }}>
                        <IncrementIcon />
                    </TouchableOpacity>
                </View>
                <Button mode="contained" color={COLORS.dPink} onPress={() => addToCart(product, quantity, color)} style={{ paddingHorizontal: 50 }}>
                    <Text>ADD TO CART</Text>
                </Button>
            </View>

        </View >
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.light
    },
    prodImage: {
        width: dimensions.width,
        height: dimensions.height * 0.3,
        resizeMode: 'cover',
        alignSelf: 'center',
    },
    title: {
        fontWeight: "bold",
        fontSize: 22,
        marginVertical: 5
    },
    collection: {
        fontSize: 15,
        marginBottom: 5
    },
    inStock: {
        fontSize: 15,
        marginBottom: 5,
        color: COLORS.success
    },
    outStock: {
        fontSize: 15,
        marginBottom: 5,
        color: COLORS.danger
    },
    cartContainer: {
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 0,
        paddingHorizontal: 10,
        paddingBottom: 10,
        width: "100%",
        backgroundColor: "#fff"
    },
    incContainer: {
        borderLeftWidth: 1,
        borderColor: "rgba(0,0,0,0.3)",
        padding: 5
    },
    decContainer: {
        borderRightWidth: 1,
        borderColor: "rgba(0,0,0,0.3)",
        padding: 5
    }
});