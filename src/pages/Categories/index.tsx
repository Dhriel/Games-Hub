import {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, ActivityIndicator, Pressable} from 'react-native';

import {useRoute, RouteProp, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {CaterogiesProps, CardProps} from '../../types/homeCard.type';
import {StackParamsList} from '../../routes/index';

import {GameCard} from '../../components/GameCard';

import Icon from 'react-native-vector-icons/Feather';

import api from '../../services/api';

type RouteCategoriesParams = {
    Categories: CaterogiesProps;
}

type CategoriesRouteProps = RouteProp<RouteCategoriesParams, 'Categories'>

export function Categories(){
    const route = useRoute<CategoriesRouteProps>();
    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();
    const [gameList, setGameList] = useState<CardProps[]>([]);
    const [loading, setLoading] = useState(false);


    useEffect(()=>{
        fetchCategories();

    },[route])

    async function fetchCategories(){
        try{
            setLoading(true);
            const response = await api.get(`games?key=9234ee884c68423db619251811fb709b&genres=${route.params.id}`);

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
                    <Text style={styles.title}>{route.params && route.params.name}</Text>
                </View>

                <FlatList
                    data={gameList}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => (<GameCard data={item} />)}
                    style={{marginTop: 20}}
                />

        </View>
    )
}

const styles = StyleSheet.create({
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