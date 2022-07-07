import { View, Text, FlatList, StyleSheet, ScrollView } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { ActivityIndicator, Button, List } from 'react-native-paper'
import CartSection from './CartSection';
import { globalStyle } from '../Components/Styles/GlobalStyles';
import ContactInfo from './ContactInfo';
import { changeNS } from '../Components/Functions/Global';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../Const/color';
import { useNavigation } from '@react-navigation/native';
import { checkoutValidation } from './checkoutValidatin';
import CartContext from '../Components/Context/cartContext';


export default function Checkout({ route }) {
    const navigation = useNavigation()

    const { note } = route.params
    const { cart, isLoading, total } = useContext(CartContext)
    const [expanded, setExpanded] = useState(true);
    const [user, setUser] = useState("")

    const [email, setEmail] = useState("")
    const [country, setCountry] = useState("Pakistan")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [address, setAddress] = useState("")
    const [addressDetails, setAddressDetails] = useState("")
    const [city, setCity] = useState("")
    const [postalCode, setPostalCode] = useState("")
    const [phone, setPhone] = useState("")
    const [errors, setErrors] = useState("")

    const handlePress = () => setExpanded(!expanded);

    const getUser = async () => {
        var usr;
        const jsonValue = await AsyncStorage.getItem('@authen')
        jsonValue != null ? usr = JSON.parse(jsonValue) : null;
        setUser(usr)
    }

    const logout = async () => {
        let isMounted = true;
        try {
            await AsyncStorage.removeItem("@authen");
            ToastAndroid.show("Logged Out", ToastAndroid.SHORT);
        }
        catch (exception) {
            return false;
        }
        return () => { isMounted = false };
    };

    const handleSubmit = () => {
        const data = {
            email: user ? user.email : email,
            country,
            firstName,
            lastName,
            address,
            addressDetails,
            city,
            postalCode,
            phone,
            user,
            note
        }

        const err = checkoutValidation(data)
        setErrors(err)
        if (Object.keys(err).length !== 0) {
            setExpanded(true)
            return
        }

        navigation.navigate("shipping", { data: data })
    }

    useEffect(() => {
        getUser()
    }, [logout])


    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>
                <List.Section >
                    <List.Accordion
                        title="Cart"
                    >
                        <View style={{ ...styles.card, ...globalStyle.shadow }}>
                            {isLoading ? <ActivityIndicator size="large" color="#fof" /> : (
                                <>
                                    <FlatList
                                        data={cart}
                                        ListEmptyComponent={<View style={{ justifyContent: 'center', alignItems: "center" }}><Text>Empty</Text></View>}
                                        style={{ paddingTop: 10 }}
                                        keyExtractor={({ id }) => id}
                                        renderItem={(item) => (
                                            <CartSection item={item.item} />
                                        )}
                                    />

                                    <View style={{ height: 50 }}></View>
                                </>
                            )}

                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", margin: 10 }}>
                                <Text>Sub Total</Text>
                                <Text>Rs. {changeNS(total)}</Text>
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", margin: 10 }}>
                                <Text>Shipping</Text>
                                <Text>---</Text>
                            </View>

                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", margin: 10 }}>
                                <Text style={{ fontWeight: "bold" }}>Total</Text>
                                <Text style={{ fontWeight: "bold" }}>Rs. {changeNS(total)}</Text>
                            </View>

                        </View>
                    </List.Accordion>

                    <List.Accordion
                        title="Information"
                        expanded={expanded}
                        onPress={handlePress}>
                        <ContactInfo
                            errors={errors}
                            user={user} logout={logout}
                            email={email} setEmail={setEmail}
                            country={country} setCountry={setCountry}
                            firstName={firstName} setFirstName={setFirstName}
                            lastName={lastName} setLastName={setLastName}
                            address={address} setAddress={setAddress}
                            addressDetails={addressDetails} setAddressDetails={setAddressDetails}
                            city={city} setCity={setCity}
                            postalCode={postalCode} setPostalCode={setPostalCode}
                            phone={phone} setPhone={setPhone}

                        />
                    </List.Accordion>
                </List.Section>

            </ScrollView>
            <View style={{ flexDirection: 'row', justifyContent: "space-between", margin: 5 }}>
                <Button color={COLORS.dPink} onPress={() => navigation.goBack()}>Return to Cart</Button>
                <Button style={{ backgroundColor: COLORS.dPink, marginRight: 5 }} color='#fff' onPress={() => handleSubmit()}>Shipping</Button>
            </View>
        </View >

    )
}
const styles = StyleSheet.create({
    card: {
        borderRadius: 20,
        backgroundColor: '#fff',
        margin: 5,
        padding: 10,
    },

});