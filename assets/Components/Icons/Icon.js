import React from 'react'
import { Entypo, AntDesign, FontAwesome } from "@expo/vector-icons"

export const IncrementIcon = (props) => {
    const { size, color } = props
    return (
        < AntDesign name="plus" size={size ? size : 24} color={color ? color : "black"} />
    )
}

export const DecrementIcon = (props) => {
    const { size, color } = props
    return (
        < AntDesign name="minus" size={size ? size : 24} color={color ? color : "black"} />
    )
}

export const CirleCross = (props) => {
    const { size, color, style } = props
    return (
        < Entypo name="circle-with-cross" size={size ? size : 24} color={color ? color : "black"} style={style} />
    )
}

export const Avatar = (props) => {
    const { size, color, style } = props
    return (
        < FontAwesome name="user-circle" size={size ? size : 24} color={color ? color : "black"} style={style} />
    )
}

export const CartIcon = (props) => {
    const { size, color, style } = props
    return (
        < AntDesign name="shoppingcart" size={size ? size : 24} color={color ? color : "black"} style={style} />
    )
}

export const SadIcon = (props) => {
    const { size, color, style } = props
    return (
        < Entypo name="emoji-sad" size={size ? size : 24} color={color ? color : "black"} style={style} />
    )
}