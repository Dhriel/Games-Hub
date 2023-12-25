import {View, Text, Pressable, Image, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {CardProps} from '../../types/homeCard.type';



export function GameCard({data} : {data: CardProps}){
    return(
        <View style={styles.container}> 
                <Image 
                    source={{uri: data.url}}
                    style={styles.gameImage}
                />
           <View style={styles.infoArea}>
                <Text style={styles.title}>{data.name}</Text>
                <View style={{flexDirection: 'row', alignItems: "center"}}>
                    <Icon name='star' size={25} color="#FABB1E" />
                    <Text style={{color: "#fff", fontSize: 16, fontWeight: '500'}}>{data.rating}/5</Text>
                </View>
            </View>
           <View style={styles.overlay} />
        </View>
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
})