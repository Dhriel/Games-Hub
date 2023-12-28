import { Text, Pressable, StyleSheet} from 'react-native';
import {CaterogiesProps} from '../../types/homeCard.type';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParamsList} from '../../routes/index';

interface CardProps {
    data: CaterogiesProps;
    color?: string;
}

export function Cards({data, color} : CardProps){
    
    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

    function handleCategory(): void{
        navigation.navigate('Categories', data);
    }

    return( 
       <Pressable style={[styles.container, {backgroundColor: color ? `${color}` : '#64748B'}]}
        onPress={handleCategory}
       >
            <Text style={{color: "#fff", fontSize: 16}}>{data.name}</Text>
       </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 36,
        padding: 8,
        borderRadius: 8,
        marginRight: 10,
    }
})