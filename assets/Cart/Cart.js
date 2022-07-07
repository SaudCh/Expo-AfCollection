import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native'
import { TextInput, Button } from "react-native-paper"
import { COLORS } from "../Const/color";
import { globalStyle } from "../Components/Styles/GlobalStyles";
import CartCard from "./cartCard";
import { changeNS } from "../Components/Functions/Global";
import EmptyCart from "./EmptyCart";
import CartContext from '../Components/Context/cartContext';
import { useNavigation } from "@react-navigation/native";

export default function Cart() {
    const navigation = useNavigation();
    const { cart, total, deleteItem, incQuan, decQuan, isLoading } = useContext(CartContext)
    const [note, setNote] = useState("")


    return (
        <View style={{ ...styles.body }}>
            <View>
                {isLoading ? <ActivityIndicator size="large" color="#fof" /> : (

                    <FlatList
                        data={cart}
                        ListEmptyComponent={<EmptyCart />}
                        style={{ paddingTop: 10 }}
                        keyExtractor={({ id }) => id}
                        renderItem={(item) => (
                            <CartCard item={item.item} deleteItem={deleteItem} incQuan={incQuan} decQuan={decQuan} />
                        )}
                    />
                )}

            </View>
            {cart != 0 ?
                <View style={{ ...styles.totalContainer }}>
                    <View style={{ backgroundColor: '#fff' }}>
                        <TextInput value={note} onChangeText={(text) => setNote(text)} mode="outlined" label="Add a Note to your Order" multiline={true} numberOfLines={8} />
                    </View>
                    <Text style={{ marginVertical: 5, color: 'rgba(0,0,0,0.5)' }}>Shipping & taxes calculated at checkout</Text>
                    <View style={{ ...globalStyle.hStack, justifyContent: 'space-between', }}>
                        <View>
                            <Text style={{ fontWeight: "bold" }}>
                                Total
                            </Text>
                            <Text style={{ fontSize: 18 }}>
                                {changeNS(total)} PKR
                            </Text>
                        </View>
                        <Button onPress={() => {
                            navigation.navigate("checkout", {
                                note: note
                            }), {
                                note: note
                            }
                        }} mode="contained" color={COLORS.dPink} style={{ paddingHorizontal: 5 }}>
                            <Text>Proceed to Checkout</Text>
                        </Button>
                    </View>
                </View>
                : <View></View>}
        </View>
    );
}
const styles = StyleSheet.create({
    body: {
        flex: 1,
    },
    totalContainer: {
        position: 'absolute',
        bottom: 0,
        paddingBottom: 20,
        paddingRight: 10,
        paddingLeft: 20,
        width: "100%",
        backgroundColor: "#fff"
    },
});
