import { View, Text, StyleSheet, ToastAndroid, Modal } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode";
import { COLORS } from '../Const/color';
import { ActivityIndicator, Button, TextInput } from 'react-native-paper';
import envs from '../../Config/env'


export default function AcountDetails() {
    const navigation = useNavigation()
    const [user, setUser] = useState("")
    const [modal, setModal] = useState(false)
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [isLoading, setLoading] = useState(false)
    const [token, setToken] = useState("")
    const [errors, setErrors] = useState()

    useFocusEffect(
        useCallback(() => {

            AsyncStorage.getItem("@authen").then((val) => {
                if (val) {
                    const jsonValue = JSON.parse(val);
                    setToken(jsonValue.token)

                    var decoded = jwt_decode(jsonValue.token);
                    setEmail(decoded.email)
                    setUser(decoded)
                } else {

                }
            });
        })

    );

    const UpdatePassword = async () => {
        let errs = {}
        setErrors({})
        if (password && password.length < 8) {
            errs.res = "Password must be at least 8 characters long"
            setErrors(errs)
            return
        }

        setLoading(true)

        try {

            const response = await fetch(
                `${envs.api}users/update-profile`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: "Bearer " + token
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            }
            );
            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message);
            }
            console.log(responseData)

            // ToastAndroid.show(responseData.message, ToastAndroid.SHORT);
            setModal(false);

            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.log(err)
            let errs = {}
            errs.res = err.message || "Something went wrong, please try again."
            setErrors(errs);
        }


    }

    return (
        <View style={{ margin: 10, flex: 1 }}>
            <View>
                <Text style={{ ...styles.heading }}>First Name: <Text style={{ ...styles.value }}>{user.firstName}</Text></Text>
                <Text style={{ ...styles.heading }}>Last Name:  <Text style={{ ...styles.value }}>{user.lastName}</Text></Text>
                <Text style={{ ...styles.heading }}>Email:  <Text style={{ ...styles.value }}>{user.email}</Text></Text>
            </View>
            <View style={{ marginTop: 20, position: 'absolute', bottom: 5, width: '100%' }}>
                <Button mode='outlined' color={COLORS.dPink} style={{ borderColor: COLORS.dPink }} onPress={() => setModal(true)}>
                    Update Info
                </Button>
            </View>
            <Modal
                transparent={true}
                visible={modal}

            >
                <View style={{ backgroundColor: "#000000aa", flex: 1, justifyContent: 'center' }}>
                    <View style={{ margin: 50, backgroundColor: '#ffffff', padding: 40, paddingHorizontal: 20, borderRadius: 20 }}>
                        <Text style={{ fontSize: 18, color: COLORS.dPink, marginBottom: 10 }}>Update Info</Text>
                        {errors && <Text style={{ color: COLORS.danger, fontSize: 14, marginBottom: 10 }}>{errors.res}</Text>}
                        <TextInput
                            mode="outlined"
                            label="Email"
                            style={{ height: 40, marginTop: errors ? 0 : 10 }}
                            placeholder="Email"
                            value={email}
                            onChangeText={email => setEmail(email)}
                        />
                        <TextInput
                            mode="outlined"
                            label="Password"
                            style={{ height: 40, marginTop: errors ? 0 : 10 }}
                            placeholder="Password"
                            value={password}
                            onChangeText={password => setPassword(password)}
                        />
                        {isLoading ? <ActivityIndicator style={{ marginTop: 5 }} size="small" color={COLORS.dPink} /> :
                            <Button onPress={() => UpdatePassword()} mode='contained' color={COLORS.dPink} style={{ marginTop: 10 }}>
                                Update
                            </Button>
                        }
                        <Button onPress={() => setModal(false)} style={{ marginTop: 10 }}>
                            Cancel
                        </Button>
                    </View>
                </View>
            </Modal>
        </View >
    )
}
const styles = StyleSheet.create({
    heading: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        color: COLORS.dPink
    },
    value: {
        fontSize: 18,
        fontWeight: "100",
        marginBottom: 10,
        color: COLORS.secondary
    }
});