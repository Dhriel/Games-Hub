import {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Pressable, Image, FlatList, ScrollView, Dimensions, Linking, TouchableOpacity, Modal, ActivityIndicator} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/MaterialIcons'

import {GameDetailsProps, PlatformStoresProps, CardProps} from '../../types/homeCard.type';

import {RouteProp, useRoute, useNavigation, useIsFocused} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParamsList} from '../../routes/index';

import {Cards} from '../../components/Cards';

import {DescriptionModal} from './components/Modal';

import api from '../../services/api';

import useStorage from '../../hooks/useStorage';

type RouteDetailParams = {
    Detail: {
        slug: string;
    }
}

type DetailRoutePros = RouteProp<RouteDetailParams, 'Detail'>;

const WidthScreen = Dimensions.get('window').width;

export function Detail(){
    const route = useRoute<DetailRoutePros>();
    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();
    const isFocused = useIsFocused();
    
    const [gameList, setGameList] = useState<GameDetailsProps>();
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const {saveItem} = useStorage();

    useEffect(()=>{

        fetchGame();

    },[isFocused])

    async function fetchGame(){
        setLoading(true);
        let platformList, storesList, genresList : PlatformStoresProps[] = [];
        try{
            const response = await api.get(`games/${route.params.slug}?key=9234ee884c68423db619251811fb709b`);
            
            if(response.data){
                platformList = response.data.platforms.map((item: any)=>({
                    id: item.platform.id,
                    name: item.platform.name
                }));

                storesList = response.data.stores.map((item: any)=>({
                    id: item.store.id,
                    name: item.store.name
                }));

                genresList = response.data.genres.map((item: any)=>({
                    id: item.id,
                    name: item.name
                }));
            }

            let list = [] as GameDetailsProps[]
            
            let aditionalImage = response.data.background_image_additional  ? response.data.background_image_additional : '';
            

            setGameList({
                name: response.data.name,
                id: response.data.id,
                description: response.data.description_raw,
                rating: response.data.rating,
                background: response.data.background_image,
                backgroundAdditional: aditionalImage,
                platforms: platformList,
                stores: storesList,
                genres: genresList,
                link: response.data.website
            });
            console.log(list[0].genres.length);
        }catch(err){
            console.log(err)
        }finally{
            setLoading(false);
        }
    }

    function openWebSite(url: string){
        Linking.openURL(`${url}`)
    }

    function handleCloseModal(){
        setModalVisible(false);
    }

    function handleSave(){
        try{
            if (gameList){
                const newData : CardProps = {
                    name: gameList.name,
                    rating: gameList.rating,
                    url: gameList.background,
                    slug: route.params.slug,
                    id: gameList.id
                }
                saveItem(newData);
            }
        }catch(err){
            console.log('Deu erro!');
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
        <ScrollView showsVerticalScrollIndicator={false}>
            <SafeAreaView style={styles.container}>

                <View style={styles.iconContainer}>
                    <Pressable style={styles.iconArea} onPress={()=> navigation.goBack()}>
                        <Icon name='arrow-left' size={30} color={"#fff"} />
                    </Pressable>
                    <TouchableOpacity style={styles.iconArea} onPress={handleSave}>
                        <Icon name='bookmark' size={30} color={"#fff"} />
                    </TouchableOpacity>
                </View>

                <ScrollView horizontal={true}
                    style={{ flexGrow:0 }}
                >

                    {gameList &&(
                        <View style={[styles.scrollImage, {
                            width: gameList.backgroundAdditional ?  WidthScreen - 50 : WidthScreen
                        }]}>
                            <Image
                                source={{uri: gameList.background}}
                                style={styles.image}
                            />
                        </View>
                    )}


                        {gameList && gameList.backgroundAdditional && (

                            <View style={styles.scrollImage}>
                                <Image
                                    source={{uri: gameList.backgroundAdditional}}
                                    style={styles.image}
                                />
                            </View>
  
                        )}

                </ScrollView>

                    {gameList  && gameList.link && (
                        <Pressable style={styles.websiteArea} 
                            onPress={()=> openWebSite(gameList.link)}
                        >
                            <Icon name='airplay' size={27} color={"#fff"} />
                        </Pressable>
                )}
                

                <View style={{paddingHorizontal: 10}}>


                    {gameList  && (
                        <View style={{marginBottom: 10}}>
                            <View style={{flexDirection: 'row', alignItems: "center", marginTop: 15}}>
                                <Icon2 name='star' size={25} color="#FABB1E" />
                                <Text style={styles.title}>{gameList.rating}/5</Text>
                            </View>
                            <Text style={styles.title}>{gameList.name}</Text>
                        </View>
                    )}


                    {gameList && gameList.genres &&
                        <>
                            <Text style={styles.title}>Genres</Text>
                            <FlatList
                                data={gameList.genres}
                                renderItem={({item}) => (<Cards data={item}/>)}
                                keyExtractor={item=>item.id}
                                horizontal
                                contentContainerStyle={{marginTop: 8, marginBottom: 20}}
                            />
                        </>
                    }


                    <Text style={styles.title}>Description</Text>
                    <View style={{marginBottom: 15}}>
                            {gameList && gameList.description && (
                                <Text style={{color:"#ccc"}} 
                                    numberOfLines={5}
                                    ellipsizeMode='tail'
                                >
                                    {gameList.description}
                                </Text>
                            )}
                        <TouchableOpacity style={styles.button}
                            onPress={()=> setModalVisible(!modalVisible)}
                        >
                            <Text style={{color: "#Fff"}}>Read full description</Text>
                        </TouchableOpacity>
                    </View>


                    <Text style={styles.title}>Platform</Text>
                    <View style={styles.PlatStoreContainer}>
                            {gameList && gameList.platforms && (
                                gameList.platforms.map((item) => (
                                    <View key={item.id} style={styles.cardsStyle}>
                                        <Cards data={item} color='#0F172A' />
                                    </View>
                                ))
                            )}
                    </View>

                    <Text style={styles.title}>Stores</Text>
                    <View style={styles.PlatStoreContainer}>
                        {gameList && gameList.stores && (
                            gameList.stores.map((item) => (
                                <View key={item.id} style={styles.cardsStyle}>
                                    <Cards data={item} color='#0F172A' />
                                </View>
                            ))
                        )}
                    </View>

                </View>

                <Modal
                    visible={modalVisible}
                    transparent={true}
                >
                    {gameList && gameList.description && (
                        <DescriptionModal description={gameList.description} 
                            closeModal={handleCloseModal}
                        />
                    )}
                </Modal>
            </SafeAreaView>
        </ScrollView>
    
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor:"#050B18",
    },
    iconContainer:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        width: '100%',
        paddingHorizontal: 10,
        paddingTop: 20,
        marginBottom: 15,
        zIndex: 99
    },
    iconArea:{
        padding: 10,
        backgroundColor: "#050B18",
        borderRadius: 30
    },
    scrollImage:{
        width: WidthScreen - 50,
        height: 260,
    },
    image:{
        width: '100%', 
        height: '100%', 
        resizeMode: 'cover',
    },
    websiteArea:{
        backgroundColor: "#E72F49",
        padding: 10,
        borderRadius: 30,
        width: 55,
        height: 55,
        position: 'absolute',
        zIndex: 99,
        right: 10,
        top: 235,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title:{
        fontWeight: '700',
        fontSize: 20,
        color: "#FFFFFF",
    },

    PlatStoreContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 8,
        marginBottom: 20,
    },
    cardsStyle: {
        width: 'auto', 
        marginVertical: 2, 
        marginHorizontal: 0
    },
    button:{
        width: '100%',
        height: 29,
        backgroundColor: '#0E5C88',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        marginTop: 6
    },
    logoTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'Roboto',
        color: "#Fff",
    },

})