import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AcountDetails from '../Account/AccountDetails';
import OrderHistory from '../Account/OrderHistory';

const Tab = createMaterialTopTabNavigator();

export default function MyAccount() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="OrderHistory" options={{
                title: 'Order History',
            }} component={OrderHistory} />
            <Tab.Screen name="AccountDetails" options={{
                title: 'Account Details',
            }} component={AcountDetails} />
        </Tab.Navigator>
    );
}
