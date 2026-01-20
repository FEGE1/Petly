import { Text, View, StyleSheet, ScrollView, TextInput, Image, ImageSourcePropType, Pressable } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { SafeAreaView } from "react-native-safe-area-context";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { UserCircleIcon, Notification01Icon, StarsIcon, Search01Icon, Video01Icon, ShoppingBag01Icon, StarIcon, PencilIcon, Home, Robot01Icon, FavouriteIcon, UserSharingIcon } from "@hugeicons/core-free-icons";

export default function Product(){
    const {title, value} = useLocalSearchParams<{
        title?: string,
        value?: string
    }>();

    const valueNumber = Number(value);

    return( 
    <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
        <Pressable onPress={()=> router.back()}>
            <Text>{title}</Text>
            <Text>{value}</Text>
        </Pressable>    
    </View>
    );  
}