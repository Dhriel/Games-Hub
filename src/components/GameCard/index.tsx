import {View, Text, Pressable, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/Feather';
import {CardProps} from '../../types/homeCard.type';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParamsList} from '../../routes';

import useStorage from '../../hooks/useStorage';

interface GameCardProps {
    data : CardProps,
    buttonActive?: boolean;
}


export function GameCard({data, buttonActive} : GameCardProps){
    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();
    const {deleteItem} = useStorage();

    async function handleDelete(){
        await deleteItem(data);
        navigation.navigate('Favorites');

    }

    return(
        <Pressable style={styles.container} 
            onPress={()=>{
                navigation.navigate('Detail', {slug: data.slug});
            }}
        > 
               {data.url && data.url != null && (
                <Image 
                    source={{uri: data.url}}
                    style={styles.gameImage}
                />
               )}
           <View style={styles.infoArea}>
                <Text style={styles.title}>{data.name}</Text>
                <View style={{flexDirection: 'row', alignItems: "center"}}>
                    <Icon name='star' size={25} color="#FABB1E" />
                    <Text style={{color: "#fff", fontSize: 16, fontWeight: '500'}}>{data.rating}/5</Text>
                </View>
            </View>
           <View style={styles.overlay} />
            {buttonActive && (
                <TouchableOpacity style={styles.iconArea} onPress={handleDelete}>
                <   Icon2 name='trash' size={25} color={"#fff"} />
                </TouchableOpacity>
            )}
        </Pressable>
    )
}

const styles  = StyleSheet.create({
    container:{
        width: '100%',
        height: 169,
        marginBottom: 15,
        borderRadius: 6,
    },
    gameImage:{
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 6
    },
    infoArea:{
        position: 'absolute',
        bottom: 10,
        zIndex: 99,
        paddingHorizontal: 10
    },
    title:{
        fontWeight: '700',
        fontSize: 25,
        color: "#FFFFFF",
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.315)', // Altere o valor do último número para aumentar ou diminuir a opacidade
      },
      iconArea:{
        padding: 14,
        backgroundColor: "#E72F49",
        borderRadius: 30,
        position: 'absolute',
        top: 10,
        right: 10,

    },
})