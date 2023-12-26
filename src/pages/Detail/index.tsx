import {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Pressable, Image, FlatList, ScrollView, Dimensions, Linking, TouchableOpacity, Modal, ActivityIndicator} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/MaterialIcons'

import {GameDetailsProps, PlatformStoresProps} from '../../types/homeCard.type';

import {RouteProp, useRoute, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParamsList} from '../../routes/index';

import {Cards} from '../../components/Cards';

import {DescriptionModal} from './components/Modal';

import api from '../../services/api';

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
    
    const [gameList, setGameList] = useState<GameDetailsProps[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{

        fetchGame();

    },[])

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

            list.push({
                name: response.data.name,
                id: response.data.id,
                description: response.data.description_raw,
                rating: response.data.rating,
                background: response.data.background_image,
                backgroundAdditional: response.data.background_image_additional,
                platforms: platformList,
                stores: storesList,
                genres: genresList,
                link: response.data.website
            });

            setGameList(list);
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

    if(loading) {
        return(
            <View style={{
                flex: 1, justifyContent: 'center', alignItems: "center", backgroundColor: "#050B18", marginBottom: 10
            }}>
                <ActivityIndicator size='large' color='#2c8eff'/>
            </View>
        )
    }

    return(
        <ScrollView showsVerticalScrollIndicator={false}>
            <SafeAreaView style={styles.container}>

                {/*  Voltar e Salvar */}
                <View style={styles.iconContainer}>
                    <Pressable style={styles.iconArea} onPress={()=> navigation.goBack()}>
                        <Icon name='arrow-left' size={30} color={"#fff"} />
                    </Pressable>
                    <Pressable style={styles.iconArea}>
                        <Icon name='bookmark' size={30} color={"#fff"} />
                    </Pressable>
                </View>

                {/* Scroll de Imagens */}
                <ScrollView horizontal={true}
                    style={{ flexGrow:0 }}
                >
                    <View style={styles.scrollImage}>
                        {gameList && gameList.length > 0 &&(
                            <Image
                                source={{uri: gameList[0].background}}
                                style={styles.image}
                            />
                        )}
                    </View>

                    <View style={styles.scrollImage}>
                        {gameList && gameList.length > 0 &&(
                            <Image
                                source={{uri: gameList[0].backgroundAdditional}}
                                style={styles.image}
                            />
                        )}
                    </View>
                </ScrollView>

                {/* Open WebSite Icon */}
                    <Pressable style={styles.websiteArea} 
                        onPress={()=> openWebSite(gameList[0].link)}
                    >
                        <Icon name='airplay' size={27} color={"#fff"} />
                    </Pressable>
                

                <View style={{paddingHorizontal: 10}}>

                    {/* Rating  e Name */}
                    {gameList && gameList.length > 0 && (
                        <View style={{marginBottom: 10}}>
                            <View style={{flexDirection: 'row', alignItems: "center", marginTop: 15}}>
                                <Icon2 name='star' size={25} color="#FABB1E" />
                                <Text style={styles.title}>{gameList[0].rating}/5</Text>
                            </View>
                            <Text style={styles.title}>{gameList[0].name}</Text>
                        </View>
                    )}

                    {/* Genres  */}
                    <Text style={styles.title}>Genres</Text>
                    {gameList && gameList.length > 0 && gameList[0].genres && (
                        <FlatList
                            data={gameList[0].genres}
                            renderItem={({item}) => (<Cards data={item}/>)}
                            keyExtractor={item=>item.id}
                            horizontal
                            contentContainerStyle={{marginTop: 8, marginBottom: 20}}
                        />
                    )}

                    {/* Description */}
                    <Text style={styles.title}>Description</Text>
                    <View style={{marginBottom: 15}}>
                            {gameList && gameList.length > 0 &&gameList[0].description && (
                                <Text style={{color:"#ccc"}} 
                                    numberOfLines={5}
                                    ellipsizeMode='tail'
                                >
                                    {gameList[0].description}
                                </Text>
                            )}
                        <TouchableOpacity style={styles.button}
                            onPress={()=> setModalVisible(!modalVisible)}
                        >
                            <Text style={{color: "#Fff"}}>Read full description</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Platform  */}
                    <Text style={styles.title}>Platform</Text>
                    <View style={styles.PlatStoreContainer}>
                            {gameList && gameList.length > 0 && gameList[0].platforms && (
                                gameList[0].platforms.map((item) => (
                                    <View key={item.id} style={styles.cardsStyle}>
                                        <Cards data={item} color='#0F172A' />
                                    </View>
                                ))
                            )}
                    </View>

                    {/* Stores  */}
                    <Text style={styles.title}>Stores</Text>
                    <View style={styles.PlatStoreContainer}>
                        {gameList && gameList.length > 0 && gameList[0].stores && (
                            gameList[0].stores.map((item) => (
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
                    {gameList && gameList.length > 0 && gameList[0].description && (
                        <DescriptionModal description={gameList[0].description} 
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