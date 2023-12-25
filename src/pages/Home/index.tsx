import {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TextInput, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import Icon from 'react-native-vector-icons/Feather';

import {Cards} from '../../components/Cards';
import { GameCard } from '../../components/GameCard';

type ListProps = {
    id: string;
    category: string;
}

const list: ListProps[] = [
    { id: '1', category: 'All Games' },
    { id: '2', category: 'Arcade' },
    { id: '3', category: 'Action' },
    { id: '4', category: 'Sports' },
    { id: '5', category: 'Adventure' },
    { id: '6', category: 'Indie' },
    { id: '7', category: 'Art' },
    { id: '8', category: 'Romance' },
    { id: '9', category: 'School' },
  ];

export function Home(){
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
                data={list}
                keyExtractor={item => item.id}
                renderItem={({item}) => (<Cards category={item.category}/>)}
                showsHorizontalScrollIndicator={false}
                horizontal
                style={{flexGrow: 0, marginBottom: 15}}
                
                />
            </View>
            
            {/* Componente de Games */}


                <FlatList
                    data={list}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => (<GameCard category={item.category}/>)}
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