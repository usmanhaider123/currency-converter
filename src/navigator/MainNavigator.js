import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screens/Login'
import Home from '../screens/Home'
import Currencylist from '../screens/Currencylist'
import Settings from '../screens/Settings'
import Themes from '../screens/Themes';

const Stack = createStackNavigator();
const headeroptions = { headerShown: false }

const MainNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator >
                <Stack.Screen name="Login" component={Login} options={headeroptions} />
                <Stack.Screen name="Home" component={Home} options={headeroptions} />
                <Stack.Screen name="Currencylist" options={{ title: 'Base Currency' }} component={Currencylist} />
                <Stack.Screen name="Settings" options={{ title: 'Options' }} component={Settings} />
                <Stack.Screen name="Themes" component={Themes} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default MainNavigator;