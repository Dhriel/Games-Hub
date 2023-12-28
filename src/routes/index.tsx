
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Home } from '../pages/Home';
import { Categories } from '../pages/Categories'
import { Detail } from '../pages/Detail';
import {Search} from '../pages/Search';
import {Favorites} from '../pages/Favorites';

import {CaterogiesProps, CardProps} from '../types/homeCard.type';


export type StackParamsList = {
    Home: undefined,
    Categories: CaterogiesProps,
    Favorites: undefined,
    Detail: {slug: string},
    Search: {input: string};
}

const Stack = createNativeStackNavigator<StackParamsList>();


export function Routes(){
    return(
        <Stack.Navigator 
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name='Home' component={Home}/>
            <Stack.Screen name='Detail' component={Detail}/>
            <Stack.Screen name='Categories' component={Categories}/>
            <Stack.Screen name='Search' component={Search}/>
            <Stack.Screen name='Favorites' component={Favorites}/>

        </Stack.Navigator>
    )
}