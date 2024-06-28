import React, {useEffect, useState} from 'react'
import {NavigationContainer, useNavigation} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {useIsFocused} from "@react-navigation/native";
import DocentDashboard from "./src/screens/DocentDashboard"
import WelcomeScreen from './src/screens/WelcomeScreen'
import Login from "./src/screens/Login"
import RegisterScreen from "./src/screens/RegisterScreen"
import StudentDashboard from "./src/screens/StudentDashboard"
import Toast from 'react-native-toast-message';
import * as Font from 'expo-font';
import AdminDashboard from "./src/screens/AdminDashboard";
import ProfileScreen from "./src/screens/ProfileScreen";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button, View, Text, Image, Platform} from 'react-native';
import GebruikerList from "./src/screens/GebruikerList";
import GebruikerEditScreen from "./src/screens/GebruikerEditScreen";
import ActiviteitenList from "./src/screens/ActiviteitenList";
import ActiviteitBewerkenScreen from "./src/screens/ActiviteitBewerkenScreen";
import ActiviteitDetailScreen from "./src/screens/ActiviteitDetailScreen";
import StudentList from "./src/components/StudentList";
import StudentCard from "./src/screens/StudentCard";
import BackButton from "./src/components/BackButton";
import HeaderRightButton from './src/components/HeaderRightButton';
import Notifications from './src/components/Notifications';

const Stack = createStackNavigator();

const FetchUserComponent = ({ setUser }) => {
    const isFocused = useIsFocused();

    useEffect(() => {
        const fetchUser = async () => {
            const storedUser = await AsyncStorage.getItem('user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        };

        if (isFocused) {
            fetchUser();
        }
    }, [isFocused]);

    return null;
};

const renderHeaderTitle = (user) => (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {user && user.profielfoto && (
            <Image
                source={{ uri: user.profielfoto }}
                style={{ width: 40, height: 40, borderRadius: 20, marginRight: 10 }}
            />
        )}
        <Text style={{
            fontSize: 24,
            fontWeight: 'bold',
            fontFamily: 'Poppins-extra-bold',
        }}>{user ? `${user.achternaam}, ${user.voornaam}` : 'Dashboard'}</Text>
    </View>
);

const renderHeaderLeft = (user) => {
    const navigation = useNavigation();
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <BackButton onPress={() => navigation.goBack()} />
            {user && user.profielfoto && (
                <Image
                    source={{ uri: user.profielfoto }}
                    style={{ width: 40, height: 40, borderRadius: 20, marginLeft: 10 }}
                />
            )}
        </View>
    );
};


const App = () => {
    const [fontLoaded, setFontLoaded] = useState(false);
    const [initialRoute, setInitialRoute] = useState('Welkom');
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function loadFonts() {
            await Font.loadAsync({
                'Poppins-extra-bold': require('./src/assets/fonts/Poppins-ExtraBold.ttf'),
            });
            setFontLoaded(true);
        }
        loadFonts();
    }, []);

    useEffect(() => {
        const checkLoginStatus = async () => {
            const accessToken = await AsyncStorage.getItem('access_token');
            const userType = await AsyncStorage.getItem('user_type');
            if (accessToken) {
                if (userType === 'DOCENT') {
                    setInitialRoute('DocentDashboard');
                } else if (userType === 'STUDENT') {
                    setInitialRoute('StudentDashboard');
                } else if (userType === 'ADMIN') {
                    setInitialRoute('AdminDashboard');
                }
            }
        };

        checkLoginStatus();
    }, []);

    if (!fontLoaded) {
        return null;
    }


    return (
        <NavigationContainer>
            <FetchUserComponent setUser={setUser} />
            <Stack.Navigator initialRouteName={initialRoute}>
                <Stack.Screen
                    name="Welkom"
                    component={WelcomeScreen}
                    options={{
                        title: 'Welkom',
                        headerStyle: {
                            borderBottomColor: '#fff7ea',
                            backgroundColor: '#fff7ea',
                        },
                        headerTintColor: '#001e48',
                        headerTitleStyle: {
                            fontSize: 24,
                            fontWeight: 'bold',
                            fontFamily: 'Poppins-extra-bold',
                        },
                    }}
                />
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{
                        title: 'Login',
                        headerStyle: {
                            borderBottomColor: '#fff7ea',
                            backgroundColor: '#fff7ea',
                        },
                        headerTintColor: '#001e48',
                        headerTitleStyle: {
                            fontSize: 24,
                            fontWeight: 'bold',
                            fontFamily: 'Poppins-extra-bold',
                        },
                    }}
                >
                    {props => <Login {...props} setUser={setUser} />}
                </Stack.Screen>
                <Stack.Screen
                    name="DocentDashboard"
                    component={DocentDashboard}
                    options={({ navigation }) => ({
                        headerTitle: () => renderHeaderTitle(user),
                        headerStyle: {
                            borderBottomColor: '#fff7ea',
                            backgroundColor: '#fff7ea',
                        },
                        headerTintColor: '#001e48',
                        headerTitleStyle: {
                            fontSize: 24,
                            fontWeight: 'bold',
                            fontFamily: 'Poppins-extra-bold',
                        },
                        headerRight: () => <HeaderRightButton />,
                    })}
                />
                <Stack.Screen name="Registreren" component={RegisterScreen}/>
                <Stack.Screen
                    name="StudentDashboard"
                    component={StudentDashboard}
                    options={({navigation}) => ({
                        headerTitle: () => renderHeaderTitle(user),
                        headerStyle: {
                            borderBottomColor: '#fff7ea',
                            backgroundColor: '#fff7ea',
                        },
                        headerTintColor: '#001e48',
                        headerTitleStyle: {
                            fontSize: 24,
                            fontWeight: 'bold',
                            fontFamily: 'Poppins-extra-bold',
                        },
                        headerRight: () => <HeaderRightButton />,
                    })}
                />
                <Stack.Screen
                    name="AdminDashboard"
                    component={AdminDashboard}
                    options={({navigation}) => ({
                        headerTitle: () => renderHeaderTitle(user),
                        headerStyle: {
                            borderBottomColor: '#fff7ea',
                            backgroundColor: '#fff7ea',
                        },
                        headerTintColor: '#001e48',
                        headerTitleStyle: {
                            fontSize: 24,
                            fontWeight: 'bold',
                            fontFamily: 'Poppins-extra-bold',
                        },
                        headerRight: () => <HeaderRightButton />,
                    })}
                />
                <Stack.Screen
                    name="Profiel"
                    component={ProfileScreen}
                    options={({navigation}) => ({
                        title: 'Profiel',
                        headerLeft: () => renderHeaderLeft(user),
                        headerStyle: {
                            borderBottomColor: '#fff7ea',
                            backgroundColor: '#fff7ea',
                        },
                        headerTintColor: '#001e48',
                        headerTitleStyle: {
                            fontSize: 24,
                            fontWeight: 'bold',
                            fontFamily: 'Poppins-extra-bold',
                        },
                        headerRight: () => <HeaderRightButton />,
                    })}
                />
                <Stack.Screen
                    name="GebruikerList"
                    component={GebruikerList}
                    options={({navigation}) => ({
                        title: 'Gebruikerslijst',
                        headerLeft: () => renderHeaderLeft(user),
                        headerStyle: {
                            borderBottomColor: '#fff7ea',
                            backgroundColor: '#fff7ea',
                        },
                        headerTintColor: '#001e48',
                        headerTitleStyle: {
                            fontSize: 24,
                            fontWeight: 'bold',
                            fontFamily: 'Poppins-extra-bold',
                        },
                        headerRight: () => <HeaderRightButton />,
                    })}
                />
                <Stack.Screen
                    name="GebruikerEditScreen"
                    component={GebruikerEditScreen}
                    options={({navigation}) => ({
                        title: 'Gebruiker bewerken',
                        headerLeft: () => renderHeaderLeft(user),
                        headerStyle: {
                            borderBottomColor: '#fff7ea',
                            backgroundColor: '#fff7ea',
                        },
                        headerTintColor: '#001e48',
                        headerTitleStyle: {
                            fontSize: 24,
                            fontWeight: 'bold',
                            fontFamily: 'Poppins-extra-bold',
                        },
                        headerRight: () => <HeaderRightButton />,
                    })}
                />
                <Stack.Screen
                    name="ActiviteitenList"
                    component={ActiviteitenList}
                    options={({route, navigation}) => ({
                        title: route.params.cursusnaam,
                        headerLeft: () => renderHeaderLeft(user),
                        headerStyle: {
                            borderBottomColor: '#fff7ea',
                            backgroundColor: '#fff7ea',
                        },
                        headerTintColor: '#001e48',
                        headerTitleStyle: {
                            fontSize: 24,
                            fontWeight: 'bold',
                            fontFamily: 'Poppins-extra-bold',
                        },
                        headerRight: () => <HeaderRightButton />,
                    })}
                />
                <Stack.Screen
                    name="ActiviteitBewerkenScreen"
                    component={ActiviteitBewerkenScreen}
                    options={{title: 'Activiteiten Bewerken'}}
                />
                <Stack.Screen
                    name="ActiviteitDetailScreen"
                    component={ActiviteitDetailScreen}
                    options={({navigation}) => ({
                        title: 'Activiteit Details',
                        headerLeft: () => renderHeaderLeft(user),
                        headerStyle: {
                            borderBottomColor: '#fff7ea',
                            backgroundColor: '#fff7ea',
                        },
                        headerTintColor: '#001e48',
                        headerTitleStyle: {
                            fontSize: 24,
                            fontWeight: 'bold',
                            fontFamily: 'Poppins-extra-bold',
                        },
                        headerRight: () => <HeaderRightButton />,
                    })}
                />
                <Stack.Screen
                    name="StudentList"
                    component={StudentList}
                    options={({navigation}) => ({
                        title: 'Voortgang',
                        headerLeft: () => renderHeaderLeft(user),
                        headerStyle: {
                            borderBottomColor: '#fff7ea',
                            backgroundColor: '#fff7ea',
                        },
                        headerTintColor: '#001e48',
                        headerTitleStyle: {
                            fontSize: 24,
                            fontWeight: 'bold',
                            fontFamily: 'Poppins-extra-bold',
                        },
                        headerRight: () => <HeaderRightButton />,
                    })}
                />
                <Stack.Screen
                    name="StudentCard"
                    component={StudentCard}
                />
                <Stack.Screen
                    name="Notifications"
                    component={Notifications}
                    options={{
                        title: 'Notifications',
                        headerLeft: () => renderHeaderLeft(user),
                        headerStyle: {
                            borderBottomColor: '#fff7ea',
                            backgroundColor: '#fff7ea',
                        },
                        headerTintColor: '#001e48',
                        headerTitleStyle: {
                            fontSize: 24,
                            fontWeight: 'bold',
                            fontFamily: 'Poppins-extra-bold',
                        },
                        headerRight: () => <HeaderRightButton />,
                    }}
                />
            </Stack.Navigator>
            <Toast/>
        </NavigationContainer>
    );
};

export default App;