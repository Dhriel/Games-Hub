import {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Pressable, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParamsList} from '../../routes/index';

import {CardProps} from '../../types/homeCard.type';
import {GameCard} from '../../components/GameCard';
import useStorage from '../../hooks/useStorage';

export function Favorites(){
    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();
    const [gameList, setGameList] = useState<CardProps[]>([]);
    const {getItem} = useStorage();

    useEffect(()=>{
        fetchGames();
    },[gameList])

    async function fetchGames(){
       const list = await getItem();
        
        setGameList(list);
        console.log(list);
    }

    return(
        <View style={styles.container}>
            <View style={styles.headerArea}>
                <Pressable onPress={()=> navigation.goBack()}>
                    <Icon name='arrow-left' size={40} color={"#fff"} />
                </Pressable>
                <Text style={styles.title}>Favorites</Text>
            </View>
            
            <FlatList
                    data={gameList}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => (<GameCard data={item} buttonActive={true}/>)}
                    style={{marginTop: 10,}}
            />
        </View>

    )
}

const styles  = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#050B18",
        paddingHorizontal: 10
    },
    headerArea: {
        flexDirection: 'row',
        alignItems:'center',
        marginTop: 20
    },
    title: {
        fontWeight: 'bold',
        marginLeft: 20,
        fontSize: 25,
        color: '#fff'
    }
})