import React from 'react'
import { StyleSheet } from 'react-native';

export const globalStyle = StyleSheet.create({
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,

    },
    hStack: {
        flexDirection: "row",
        alignItems: "center"
    },

    border: {
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.5)"
    }

});
