import AsyncStorage from  '@react-native-async-storage/async-storage';
import {CardProps} from '../types/homeCard.type';
const key = '@game'


const useStorage = () => {


    const getItem = async () : Promise<CardProps[]> =>{
        try{
            const gameList = await AsyncStorage.getItem(key);
            return gameList && JSON.parse(gameList) || [];
        }catch(err){
            console.log(err);
            return [];
        }

    }

    const saveItem = async (data: CardProps) =>{
            
            let gameList =  await getItem();
            console.log(data.id);

            let findGame = gameList.find(item => item.id === data.id);

            if(findGame) {
                return;
            }

        
            gameList.push(data);
            await AsyncStorage.setItem(key, JSON.stringify(gameList));
    }

    const deleteItem = async (data: CardProps) =>{
        try{
            let gameList = await getItem();
            let filterList = gameList.filter(item => item.id != data.id);
            AsyncStorage.setItem(key, JSON.stringify(filterList));
        }catch(err){
            console.log(err);
        }

    }

    return {
        getItem,
        saveItem,
        deleteItem
    }
}


export default useStorage;



