import { Text, Pressable, StyleSheet} from 'react-native';

export function Cards({category} : {category: string} ){
    return( 
       <Pressable style={styles.container}>
            <Text style={{color: "#fff", fontSize: 16}}>{category}</Text>
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