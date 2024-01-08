import {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TextInput, FlatList, ActivityIndicator, Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import Icon from 'react-native-vector-icons/Feather';

import {Cards} from '../../components/Cards';
import {GameCard } from '../../components/GameCard';
import {CardProps, CaterogiesProps} from '../../types/homeCard.type';

import {StackParamsList} from '../../routes/index';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import api from '../../services/api';


export function Home(){
    const [gameList , setGameList] = useState<CardProps[]>([]);
    const [caterogyList , setCategoryList] = useState<CaterogiesProps[]>([]);
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState('');

    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

    useEffect(()=>{

        fetchGames();
        fetchCategories();
        
    }, []);

    async function fetchGames(){
        try{
            setLoading(true);
            const response = await api.get(`games?page_size=10&key=9234ee884c68423db619251811fb709b`);
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
            console.log(err)
        }finally{
            setLoading(false);
        }
    }

    async function fetchCategories(){
        
        try {
            const response = await api.get(`genres?key=9234ee884c68423db619251811fb709b`);
            let list = [] as CaterogiesProps[]
                response.data.results.forEach((item: any)=> {
                    list.push({
                        id: item?.id,
                        name: item?.name
                    })

                })

                setCategoryList(list);

        }catch(err){
            console.log(err);
        }finally{
        }

    }

    if(loading) {
        return(
            <View style={{
                flex: 1, justifyContent: 'center', alignItems: "center", backgroundColor: "#050B18"
            }}>
                <Text style={styles.logoTitle}>Games<Text style={{color: '#2c8eff'}}>HUB</Text></Text>
                <ActivityIndicator size='large' color='#2c8eff'/>
            </View>
        )
    }

    function handleSearch(){
        if(input === '')return;
        navigation.navigate('Search',{input: input})
    }

    return(
        <SafeAreaView style={styles.container}>
            {/* Parte da Logo e do Icon BookMark */}
            <View style={styles.logoContainer}>
                <Text style={styles.logoTitle}>Games<Text style={{color: '#2c8eff'}}>HUB</Text></Text>
                <Pressable style={styles.iconArea} onPress={()=>navigation.navigate('Favorites')}>
                    <Icon name='bookmark' size={25} color={"#fff"} />
                </Pressable>
            </View>

            {/* Barra de Pesquisa */}
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder='Procurando por um jogo?'
                    value={input}
                    onChangeText={text => setInput(text)}
                    placeholderTextColor={'#fff'}
                    style={styles.inputArea}
                />
                <Pressable onPress={handleSearch}>
                    <Icon name='search' size={30} color={"#2c8eff"}
                        style={{marginLeft: 20}}
                    />
                </Pressable>

            </View>

            {/* Categorias */}
            <View>
                <FlatList
                    data={caterogyList}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => (<Cards data={item}/>)}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    style={{flexGrow: 0, marginBottom: 10}}
                    
                />
            </View>
            
            {/* Componente de Games */}
                <FlatList
                    data={gameList}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => (<GameCard data={item}/>)}
                    style={{marginTop: 10,}}
                    ListHeaderComponent={
                        <Text style={{fontSize: 30, fontWeight: 'bold', color:"#fff"}}>Trending Games</Text>
                    }
                    ListHeaderComponentStyle={{marginBottom: 15}}
                />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1, 
        backgroundColor:"#050B18",
        paddingHorizontal: 10,
        paddingTop: 20,
    },
    logoContainer:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between',
        marginBottom: 15
    },
    logoTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'Roboto',
        color: "#Fff",
    },
    iconArea:{
        padding: 14,
        backgroundColor: "#1F2430",
        borderRadius: 30
    },
    inputContainer:{
        flexDirection: "row",
        alignItems: 'center',
        marginBottom: 25
    },
    inputArea:{
        color: "#fff",
        backgroundColor: "#1F2430",
        borderRadius: 20,
        width: '85%',
        paddingHorizontal: 20,
        paddingVertical: 10
    }
    
})