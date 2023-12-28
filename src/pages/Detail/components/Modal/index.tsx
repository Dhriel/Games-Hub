import {View, Text, StyleSheet, Pressable, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import Icon from 'react-native-vector-icons/Feather';


interface DescriptionModalProps{
    description: string;
    closeModal: () => void;
}

export function DescriptionModal({description, closeModal} : DescriptionModalProps){
    return(
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.headerArea}>
                    <Pressable style={styles.iconArea} onPress={closeModal}>
                        <Icon name='arrow-left' size={30} color={"#fff"} />
                    </Pressable>
                    <Text style={styles.title}>Description</Text>
                </View>
                <Text style={styles.desc}>{description && description}</Text>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#0F172A",
        paddingHorizontal: 10,
        paddingTop: 20,
        flex: 1
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