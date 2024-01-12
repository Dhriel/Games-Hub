import {useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator, FlatList} from "react-native";
import Icon from 'react-native-vector-icons/Feather';

import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {StackParamsList} from '../../routes/index';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {CardProps} from '../../types/homeCard.type';

import api from '../../services/api';

import { GameCard } from '../../components/GameCard';

type RouteSearchParams = {
    Search:{
        input: string
    }
}

type SearchRouteProps = RouteProp<RouteSearchParams, 'Search'>

export function Search(){
    const [gameList, setGameList] = useState<CardProps[]>([]);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();
    const routes = useRoute<SearchRouteProps>();
    const [errorMessage, setErrorMessage] = useState('Não encontramos um jogo com esse nome...');
    useEffect(()=>{
        fetchGames();
    },[])

    async function fetchGames(){
        try{
            setLoading(true);
            const response = await api.get(`games?search=${routes.params.input}&key=9234ee884c68423db619251811fb709b`);
            
            if (response.data.results.length === 0) {
                setErrorMessage('Não encontramos um jogo com esse nome...');
                console.log('Nenhum jogo encontrado');
                setLoading(false);
                return;
            }


            if(response.data) {
                let list = [] as CardProps[];
                response.data.results.forEach((item : any)=>{
                    list.push({
                        name: item?.name,
                        rating: item?.rating,
                        url: item?.background_image,
                        slug: item?.slug,
                        id: item?.id
                    });
                })
                setGameList(list);
                setErrorMessage('');
            }else{
                setErrorMessage('Não encontramos um jogo com esse nome...');
            }
        }catch(err){
            console.log(err);
        }finally{
            setLoading(false);
        }
    }

    if(loading) {
        return(
            <View style={{
                flex: 1, justifyContent: 'center', alignItems: "center", backgroundColor: "#050B18",
            }}>
                <ActivityIndicator size='large' color='#2c8eff'/>
            </View>
        )
    }

    return(
        <View style={styles.container}>
            <View style={styles.headerArea}>
                <Pressable onPress={()=> navigation.goBack()}>
                    <Icon name='arrow-left' size={40} color={"#fff"} />
                </Pressable>
                <Text style={styles.title}>Search</Text>
            </View>
            
            { errorMessage && (
                <Text style={{color:"#fff", fontSize: 15, textAlign: "center", marginTop: 20}}>Não encontramos um jogo com esse nome...</Text>
            )}
    
            <FlatList
                    data={gameList}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => (<GameCard data={item}/>)}
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