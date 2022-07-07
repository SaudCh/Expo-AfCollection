import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Picker } from '@react-native-picker/picker';
import { COLORS } from '../Const/color';
import { useNavigation } from '@react-navigation/native';
import { Avatar } from '../Components/Icons/Icon';

export default function ContactInfo(props) {
    const { user, errors, logout, email, setEmail, firstName, setFirstName, lastName, setLastName, country, setCountry, address, setAddress, addressDetails, setAddressDetails, city, setCity, postalCode, setPostalCode, phone, setPhone } = props
    const navigation = useNavigation()

    return (
        <View style={{ ...styles.card }}>
            <View>
                <Text style={{ color: "#000", fontSize: 20 }}>Contact Info</Text>
                {user ?

                    <View style={{ flexDirection: "row", alignItems: 'center' }}>
                        <Avatar size={50} />
                        <View style={{ marginLeft: 10 }}>
                            <Text>{user.email}</Text>
                            <TouchableOpacity onPress={() => logout()}><Text style={{ color: COLORS.dPink, fontWeight: "bold" }}>Logout</Text></TouchableOpacity>
                        </View>
                    </View>
                    :
                    <>
                        <TextInput
                            style={{ ...styles.input }}
                            placeholder="Email"
                            value={email}
                            onChangeText={email => setEmail(email)}
                        />
                        {errors.email && <Text style={{ ...styles.errors }}>{errors.email}</Text>}

                        <View style={{ alignItems: "flex-end", marginTop: 5 }}>
                            <Text >Already have an account? <TouchableOpacity onPress={() => navigation.navigate("Login")}><Text style={{ color: COLORS.dPink, fontWeight: "bold" }}>Login</Text></TouchableOpacity></Text>
                        </View>
                    </>
                }
            </View>
            <View>
                <Text style={{ color: "#000", fontSize: 20, marginVertical: 10 }}>Shipping Address</Text>

                <View style={{ ...styles.input }}>
                    <Picker
                        selectedValue={country}
                        onValueChange={(itemValue, itemIndex) =>
                            setCountry(itemValue)
                        }>
                        <Picker.Item label="Pakistan" value="Pakistan" />
                    </Picker>
                </View>

                <TextInput
                    style={{ ...styles.input }}
                    label="First Name"
                    placeholder="First Name"
                    value={firstName}
                    onChangeText={e => setFirstName(e)}
                />
                {errors.firstName && <Text style={{ ...styles.errors }}>{errors.firstName}</Text>}

                <TextInput
                    style={{ ...styles.input }}
                    placeholder="Last Name"
                    value={lastName}
                    onChangeText={e => setLastName(e)}
                />
                <TextInput
                    style={{ ...styles.input }}
                    placeholder="Address"
                    value={address}
                    onChangeText={e => setAddress(e)}
                />
                {errors.address && <Text style={{ ...styles.errors }}>{errors.address}</Text>}

                <TextInput
                    style={{ ...styles.input }}
                    placeholder="Appartment, suite etc. (Optional)"
                    value={addressDetails}
                    onChangeText={e => setAddressDetails(e)}
                />
                <TextInput
                    style={{ ...styles.input }}
                    placeholder="City"
                    value={city}
                    onChangeText={e => setCity(e)}
                />
                {errors.city && <Text style={{ ...styles.errors }}>{errors.city}</Text>}

                <TextInput
                    style={{ ...styles.input }}
                    placeholder="Postal code"
                    value={postalCode}
                    onChangeText={e => setPostalCode(e)}
                />
                {errors.postalCode && <Text style={{ ...styles.errors }}>{errors.postalCode}</Text>}

                <TextInput
                    style={{ ...styles.input }}
                    placeholder="refPhone"
                    value={phone}
                    onChangeText={e => setPhone(e)}
                />
                {errors.phone && <Text style={{ ...styles.errors }}>{errors.phone}</Text>}

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
    input: {
        marginTop: 5,
        marginBottom: 5,
        borderWidth: 1,
        borderColor: COLORS.secondary,
        borderRadius: 3,
        backgroundColor: COLORS.light,
        justifyContent: "center",
        height: 40,
        paddingLeft: 5
    },
    errors: {
        color: 'red'
    },
});