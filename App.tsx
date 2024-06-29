// App.js hoặc App.tsx
import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/noneedlogin/login'; // Đường dẫn đến màn hình đăng nhập của bạn

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Login">
                    <Stack.Screen name="Login" component={LoginScreen} />
                    {/* Các màn hình khác */}
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}