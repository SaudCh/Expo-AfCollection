import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Alert, TouchableOpacity, ToastAndroid } from 'react-native'
import { TextInput, Button } from "react-native-paper"
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { signupValidation } from "./signupValidation";
import envs from '../../Config/env'


import { COLORS } from '../Const/color';

export default function Signup() {
  const [isLoading, setLoading] = useState(false)

  const [fName, setfName] = useState("")
  const [lName, setlName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [cPassword, setcPassword] = useState("")
  const [errors, setErrors] = useState("")

  const navigation = useNavigation();

  const signup = async () => {
    setErrors("")

    const data = {
      email,
      password,
      fName,
      lName,
      cPassword
    }

    const errors = signupValidation(data);

    if (Object.keys(errors).length !== 0) {
      setErrors(errors)
      return
    }

    try {
      setLoading(true)
      const response = await fetch(
        `${envs.api}auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: fName,
          lastName: lName,
          email: email,
          password: password,
          confirmPassword: cPassword
        }),
      }
      );
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      ToastAndroid.show(responseData.message, ToastAndroid.SHORT);
      navigation.navigate("Login")

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
        <Text style={{ ...styles.title }}>Signup</Text>
        {errors.api && <Text style={{ ...styles.apiErrors }}>{errors.api}</Text>}
        <TextInput
          mode="outlined"
          label="First Name"
          style={{ height: 40, marginTop: errors.api ? 5 : 10 }}
          placeholder="First Name"
          value={fName}
          onChangeText={fname => setfName(fname)}
        />
        {errors.fName && <Text style={{ ...styles.errors }}>{errors.fName}</Text>}
        <TextInput
          mode="outlined"
          label="Last Name"
          style={{ height: 40, marginTop: 10 }}
          placeholder="Last Name"
          value={lName}
          onChangeText={lname => setlName(lname)}
        />
        {errors.lName && <Text style={{ ...styles.errors }}>{errors.lName}</Text>}

        <TextInput
          mode="outlined"
          label="Email"
          style={{ height: 40, marginTop: 10 }}
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


        <TextInput
          mode="outlined"
          style={{ height: 40, marginTop: 10, marginBottom: 10 }}
          label="Confirm Password"
          placeholder="Confirm Password"
          value={cPassword}
          onChangeText={cpass => setcPassword(cpass)}
          secureTextEntry
        />
        <View>
          {errors.cPassword && <Text style={{ ...styles.errors }}>{errors.cPassword}</Text>}


          {isLoading ? (

            <View style={{ ...styles.activityContainer }}>
              <ActivityIndicator size="large" color="red" />
            </View>

          ) : (
            <Button style={{ ...styles.createButton }} onPress={() => signup()}>
              <Text style={{ ...styles.createText }}>Create</Text>
            </Button>

          )}
          <Button onPress={() => navigation.navigate('Login')}>
            <Text style={{ ...styles.loginText }}>Already have an account</Text>
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
  createButton: {
    backgroundColor: COLORS.dPink,
    width: 100,
    alignSelf: 'center',
    marginVertical: 10
  },
  createText: {
    color: COLORS.white
  },
  loginText: {
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
