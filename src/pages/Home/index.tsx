import {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TextInput, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import Icon from 'react-native-vector-icons/Feather';

import {Cards} from '../../components/Cards';
import {GameCard } from '../../components/GameCard';

import {CardProps, CaterogiesProps} from '../../types/homeCard.type';

import api from '../../services/api';

export function Home(){
    const [gameList , setGameList] = useState<CardProps[] | undefined>([]);
    const [caterogyList , setCategoryList] = useState<CaterogiesProps[] | undefined>([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{

        fetchGames();
        fetchCategories();
        
      }, []);

      async function fetchGames(){
        try{
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
        }
    }

    async function fetchCategories(){
        
        try {
            setLoading(true);
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
            setLoading(false);
        }

    }
    

    const [input, setInput] = useState('');
    return(
        <SafeAreaView style={styles.container}>
            {/* Parte da Logo e do Icon BookMark */}
            <View style={styles.logoContainer}>
                <Text style={styles.logoTitle}>Games<Text style={{color: '#2c8eff'}}>HUB</Text></Text>
                <View style={styles.saveArea}>
                    <Icon name='bookmark' size={25} color={"#fff"} />
                </View>
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
                <Icon name='search' size={30} color={"#2c8eff"}
                    style={{marginLeft: 20}}
                />
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
        paddingHorizontal: 10
    },
    logoContainer:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: "center",
        paddingTop: 20,
        justifyContent: 'space-between',
        marginBottom: 20
    },
    logoTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'Roboto',
        color: "#Fff",
    },
    saveArea:{
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