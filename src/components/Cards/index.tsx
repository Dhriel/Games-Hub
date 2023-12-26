import { Text, Pressable, StyleSheet} from 'react-native';
import {CaterogiesProps} from '../../types/homeCard.type';

interface CardProps {
    data: CaterogiesProps;
    color?: string;
}

export function Cards({data, color} : CardProps){
    return( 
       <Pressable style={[styles.container, {backgroundColor: color ? `${color}` : '#64748B'}]}>
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