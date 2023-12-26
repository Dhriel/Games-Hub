import {View, Text, StyleSheet, Pressable} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';


interface DescriptionModalProps{
    description: string;
    closeModal: () => void;
}

export function DescriptionModal({description, closeModal} : DescriptionModalProps){
    return(
        <View style={styles.container}>
            <View style={styles.headerArea}>
                <Pressable style={styles.iconArea} onPress={closeModal}>
                    <Icon name='arrow-left' size={30} color={"#fff"} />
                </Pressable>
                <Text style={styles.title}>Description</Text>
            </View>
            <Text style={styles.desc}>{description && description}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1, 
        backgroundColor:"#0F172A",
        paddingHorizontal: 10,
        paddingTop: 20,
    },
    desc:{
        color :"#ccc",
        fontSize: 16
    },
    iconArea:{
        padding: 8,
        backgroundColor: "#050B18",
        borderRadius: 30,
        width: 50,
        position: 'absolute',
        zIndex: 99
    },
    title:{
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 35,
        color: "#fff",
    },
    headerArea:{
        marginBottom: 30
    }

})