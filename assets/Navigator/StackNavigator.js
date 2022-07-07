import React from 'react'
import DrawerNavigator from './DrawerNavigator'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Login/Login';
import { COLORS } from '../Const/color';
import Signup from '../Signup/Signup';
import ForgetPassword from '../Login/ForgetPassword';
import ProductDetail from '../ProductDetail/ProductDetail';
import Cart from '../Cart/Cart';
import BySubCategory from '../Products/BySubCategory';
import Checkout from '../Checkout/Checkout';
import Shipping from '../Shipping/Shipping';
import Payment from '../Payment/Payment';
import CartButton from '../Components/Buttons/CartButton';


const Stack = createNativeStackNavigator()

const StackNavigation = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Drawer">
                <Stack.Screen name="Drawer" component={DrawerNavigator} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={Login} options={{ title: 'AF Collection', headerTintColor: COLORS.dPink }} />
                <Stack.Screen name="Signup" component={Signup} options={{ title: 'AF Collection', headerTintColor: COLORS.dPink, }} />
                <Stack.Screen name="ForgetPassword" component={ForgetPassword} options={{ title: 'AF Collection', headerTintColor: COLORS.dPink, }} />
                <Stack.Screen name="prodDetails" component={ProductDetail} options={({ route, navigation }) =>
                ({
                    title: route.params ? route.params.name.substring(0,25)+"..." : "Details", headerTintColor: COLORS.dPink, headerTitleAlign: 'center',
                    headerRight: () => (
                        <CartButton />
                    )
                })}
                />

                <Stack.Screen name="productbySC" component={BySubCategory} options={({ route, navigation }) =>
                ({
                    title: route.params ? route.params.name : "Details", headerTintColor: COLORS.dPink, headerTitleAlign: 'center',
                    headerRight: () => (
                        <CartButton navigation={navigation} />
                    )
                })}

                />
                <Stack.Screen name="cart" component={Cart} options={{
                    title: "Cart", headerTintColor: COLORS.dPink, headerTitleAlign: 'center'
                }}
                />

                <Stack.Screen name="shipping" component={Shipping} options={{
                    title: "Shipping", headerTintColor: COLORS.dPink, headerTitleAlign: 'center'
                }}
                />

                <Stack.Screen name="payment" component={Payment} options={{
                    title: "Payment", headerTintColor: COLORS.dPink, headerTitleAlign: 'center'
                }}
                />

                <Stack.Screen name="checkout" component={Checkout} options={{
                    title: "Checkout", headerTintColor: COLORS.dPink, headerTitleAlign: 'center'
                }}
                />

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigation