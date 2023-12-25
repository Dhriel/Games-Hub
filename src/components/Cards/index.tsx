import { Text, Pressable, StyleSheet} from 'react-native';
import {CaterogiesProps} from '../../types/homeCard.type';


export function Cards({data} : {data: CaterogiesProps} ){
    return( 
       <Pressable style={styles.container}>
            <Text style={{color: "#fff", fontSize: 16}}>{data.name}</Text>
       </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#64748B",
        height: 36,
        padding: 8,
        borderRadius: 8,
        marginRight: 10,
    }
})