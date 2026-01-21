import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Button, Text, View } from "react-native";

type Item = {
    id: string;
    brand: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export default function Counter(){
    const [data, setData] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:4000/product/')
        .then(res => res.json())
        .then(json => {setData(json);
        })
        .catch(err => {
            console.error(err);
        })
        .finally(()=>{
            setLoading(false);
        })
    },[]);

    if(loading) {
        return <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><ActivityIndicator size='large' /></View>;
    }

    return (
        <View style={{
            flex:1,
            justifyContent:'center',
            alignItems:'center'
        }}>
            <Text>{data[0].brand}</Text>
            <Button title="Go Back" onPress={()=>router.back()}></Button>
        </View>
    );
}