import React, { useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, ToastAndroid } from 'react-native'
import { TextInput, Button } from "react-native-paper"
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';


import { loginValidation } from './LoginValidator'

import envs from '../../Config/env'
import { COLORS } from '../Const/color';

export default function Login() {
  const navigation = useNavigation()

  const [isLoading, setLoading] = useState(false)
  const [errors, setErrors] = useState("")

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const signin = async () => {
    setErrors("")

    const data = {
      email,
      password
    }
    const error = loginValidation(data)
    if (Object.keys(error).length !== 0) {
      setErrors(error)
      return
    }

    setLoading(true)

    try {

      const response = await fetch(
        `${envs.api}auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password
        }),
      }
      );
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      const jsonValue = JSON.stringify({ email, token: responseData.data })

      await AsyncStorage.setItem(
        '@authen',
        jsonValue
      );

      ToastAndroid.show(responseData.message, ToastAndroid.SHORT);
      navigation.replace("Drawer")

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
        <Text style={{ ...styles.title }}>Login</Text>

        {errors.api && <Text style={{ ...styles.apiErrors }}>{errors.api}</Text>}

        <TextInput
          mode="outlined"
          label="Email"
          style={{ height: 40, marginTop: errors.api ? 5 : 10 }}
          placeholder="Email"
          value={email}
          onChangeText={email => setEmail(email)}
        />
        {errors.email && <Text style={{ ...styles.errors }}>{errors.email}</Text>}


        <TextInput
          mode="outlined"
          style={{ height: 40, marginTop: 10, marginBottom: 10 }}
          label="Password"
          placeholder="Password"
          value={password}
          onChangeText={pass => setPassword(pass)}
          secureTextEntry
        />
        {errors.password && <Text style={{ ...styles.errors }}>{errors.password}</Text>}

        <TouchableOpacity onPress={() => navigation.navigate("ForgetPassword")}>
          <Text style={{ ...styles.forgetPass }}>
            Forget Password?
          </Text>
        </TouchableOpacity>
        <View>

          {isLoading ? (

            <View style={{ ...styles.activityContainer }}>
              <ActivityIndicator size="large" color="red" />
            </View>

          ) : (
            <Button style={{ ...styles.loginButton }} onPress={() => signin()}>
              <Text style={{ ...styles.loginText }}>Login</Text>
            </Button>
          )}

          <Button onPress={() => navigation.navigate('Signup')}>
            <Text style={{ ...styles.signupText }}>Create an Account</Text>
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
    fontSize: 20,
    color: COLORS.dPink
  },
  forgetPass: {
    textAlign: 'right'
  },
  loginButton: {
    backgroundColor: COLORS.dPink,
    width: 100,
    alignSelf: 'center',
    marginVertical: 10
  },
  loginText: {
    color: COLORS.white
  },
  signupText: {
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
