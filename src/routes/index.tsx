
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Home } from '../pages/Home';
import { Categorys } from '../pages/Categorys';
import { Favorites } from '../pages/Favorites';
import { Detail } from '../pages/Detail';


export type StackParamsList = {
    Home: undefined,
    Categorys: undefined,
    Favorites: undefined,
    Detail: undefined,
}

const Stack  = createNativeStackNavigator<StackParamsList>();


export function Routes(){
    return(
        <Stack.Navigator>
            <Stack.Screen name='Home' component={Home}
                options={{headerShown: false}}
            />
            <Stack.Screen name='Categorys' component={Categorys}/>
            <Stack.Screen name='Favorites' component={Favorites}/>
            <Stack.Screen name='Detail' component={Detail}/>
        </Stack.Navigator>
    )
}