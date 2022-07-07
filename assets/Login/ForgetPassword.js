import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Alert, ToastAndroid } from 'react-native'
import { TextInput, Button } from "react-native-paper"
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { fpValidation } from './fpValidation'
import envs from '../../Config/env'

import { COLORS } from '../Const/color';

export default function ForgetPassword() {
    const [isLoading, setLoading] = useState(false)

    const [email, setEmail] = useState("")
    const [errors, setErrors] = useState("")


    const navigation = useNavigation()

    const fprequest = async () => {
        setErrors("")

        const data = {
            email
        }

        const errors = fpValidation(data)

        if (Object.keys(errors).length !== 0) {
            setErrors(errors)
            return
        }

        setLoading(true)

        try {

            const response = await fetch(
                envs.api + `auth/forgot-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email
                }),
            }
            );
            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message);
            }

            ToastAndroid.show(responseData.message, ToastAndroid.SHORT);
            setEmail("")


            setLoading(false);
        } catch (err) {
            setLoading(false);

            let errs = {}
            errs.api = err.message || "Something went wrong, please try again."
            setErrors(errs)

        }

    }


    return (
        <View style={{ ...styles.body }}>
            <View style={{ ...styles.box }}>
                <Text style={{ ...styles.title }}>RESET YOUR PASSWORD</Text>
                <Text>We'll send you a link to reset your password.</Text>
                {errors.api && <Text style={{ ...styles.apiErrors }}>{errors.api}</Text>}

                <TextInput
                    mode="outlined"
                    label="Email"
                    style={{ height: 40, marginTop: 10 }}
                    placeholder="Email"
                    value={email}
                    onChangeText={email => setEmail(email)}
                />
                {errors.email && <Text style={{ ...styles.errors }}>{errors.email}</Text>}

                <View>

                    {isLoading ? (

                        <View style={{ ...styles.activityContainer }}>
                            <ActivityIndicator size="large" color="red" />
                        </View>

                    ) : (
                        <Button style={{ ...styles.submitButton }} onPress={() => fprequest()}>
                            <Text style={{ ...styles.submitText }}>SUBMIT</Text>
                        </Button>
                    )}

                    <Button onPress={() => navigation.navigate('Login')}>
                        <Text style={{ ...styles.cancelText }}>Cancel</Text>
                    </Button>
                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: COLORS.lPink
    },
    box: {

        borderRadius: 10,
        backgroundColor: COLORS.white,
        padding: 20,
        width: 300,

        // Shadow
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,

    },
    title: {
        textAlign: 'center',
        fontSize: 18,
        color: COLORS.dPink
    },
    submitButton: {
        backgroundColor: COLORS.dPink,
        width: 100,
        alignSelf: 'center',
        marginVertical: 10
    },
    submitText: {
        color: COLORS.white
    },
    cancelText: {
        color: COLORS.yellow
    },
    errors: {
        color: 'red'
    },
    apiErrors: {
        color: 'red',
        padding: 0,
        margin: 0,
        marginTop: 10,
    }
});
