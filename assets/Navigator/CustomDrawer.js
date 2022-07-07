import React, { useState, useCallback, useEffect } from "react";
import { StyleSheet, TouchableOpacity, ToastAndroid, ActivityIndicator, FlatList } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { COLORS } from "../Const/color";
import { Button, List } from "react-native-paper";
import { View, Text } from 'react-native'
import { Entypo, Feather, AntDesign } from '@expo/vector-icons';
import envs from '../../Config/env'



export function CustomDrawer(props) {
    const nav = useNavigation()
    const [user, setUser] = useState(null)
    const [category, setCategory] = useState([])
    const [isLoading, setLoading] = useState(false)

    useEffect(async () => {

        try {
            setLoading(true)
            const response = await fetch(
                envs.api + `categories?populate=subCategories`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
            );

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message);
            }

            setCategory(responseData.data)
            setLoading(false);
        } catch (err) {
            setLoading(false);

            let errs = {}
            errs.api = err.message || "Something went wrong, please try again."
            console.log(err.message)
        }

    }, []);


    //fetch user state local storage
    useFocusEffect(
        useCallback(() => {

            AsyncStorage.getItem("@authen").then((val) => {
                if (val) {
                    const jsonValue = JSON.parse(val);
                    setUser(jsonValue)
                } else {
                    setUser(null)
                }
            });
        })
    );

    const logout = async () => {
        try {
            await AsyncStorage.removeItem("@authen");
            props.navigation.closeDrawer();
            props.navigation.navigate("Home");
            ToastAndroid.show("Logged Out", ToastAndroid.SHORT);
        }
        catch (exception) {
            return false;
        }

    };

    const navigate = (screen) => {
        props.navigation.closeDrawer();
        nav.navigate(screen);
    };

    return (
        <View style={{ paddingTop: 45, backgroundColor: '#fff', flex: 1 }}>
            <TouchableOpacity onPress={() => navigate("Home")} style={{ ...styles.btn }}>
                <View style={{ ...styles.dFlex }}>
                    <Text style={{ ...styles.btnText }}>Home</Text>
                </View>
            </TouchableOpacity>
            {isLoading ? <ActivityIndicator size="large" color="#fof" /> : (
                <FlatList
                    data={category}
                    keyExtractor={({ _id }, index) => _id}
                    renderItem={({ item }) => (

                        <View>{item.subCategories.length === 0 ?
                            <TouchableOpacity style={{ ...styles.btn }}>
                                <View style={{ ...styles.dFlex }}>
                                    <Text style={{ ...styles.btnText }}>{item.name}</Text>
                                </View>
                            </TouchableOpacity>
                            :

                            <View style={{ backgroundColor: "#fff", marginBottom: 15 }}>
                                <List.AccordionGroup>
                                    <List.Accordion
                                        title={item.name}
                                        style={{ backgroundColor: 'white' }}
                                        id={item._id}
                                    >
                                        {item.subCategories.map((e) => (
                                            <TouchableOpacity onPress={() => nav.navigate('productbySC', {
                                                name: e.name,
                                                id: e._id
                                            })}>
                                                <List.Item title={e.name} style={{ marginLeft: 20, marginBottom: 5 }} />
                                            </TouchableOpacity>
                                        ))}
                                    </List.Accordion>
                                </List.AccordionGroup>
                            </View>

                        }</View>
                    )
                    }
                />
            )}

            <View style={{ position: 'absolute', bottom: 0, width: '100%' }}>
                {
                    user ?
                        <>
                            <Button onPress={() => nav.navigate("MyAccount", { screen: 'AccountDetails' })} style={{ ...styles.btn, justifyContent: 'center' }}>
                                <Text style={{ color: COLORS.dPink }}>My Account</Text>
                            </Button>
                            <Button onPress={() => logout()} style={{ ...styles.btn, justifyContent: 'center' }}>
                                <Text style={{ color: COLORS.dPink }}>Logout</Text>
                            </Button>
                        </>
                        :
                        <>
                            <Button onPress={() => navigate("Login")} style={{ ...styles.btn, justifyContent: 'center' }}>
                                <Text style={{ color: COLORS.dPink }}>Login</Text>
                            </Button>
                        </>
                }
            </View>
        </View >
    );
}
const styles = StyleSheet.create({
    dFlex: {
        flexDirection: 'row',
    },
    btnText: {
        // paddingLeft: 50
    },
    btn: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        justifyContent: 'flex-start'
    }
});