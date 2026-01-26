import { useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import PagerView from "react-native-pager-view";

import MEDICAL from "./(main)/medical";
import HOME from "./index";

import { FavouriteIcon, Home, Robot01Icon, UserSharingIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { BlurView } from "expo-blur";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

export default function MainLayout(){
    const pagerRef = useRef<PagerView>(null);
    const [page, setPage] = useState(0);

    const goToPage = (index: number) => {
        pagerRef.current?.setPage(index);
        setPage(index);
    }

    return(
        <View style={{flex:1}}>
            <PagerView
                style={{flex:1}}
                ref={pagerRef}
                initialPage={0}
                onPageSelected={(e)=> setPage(e.nativeEvent.position)}
            >
                <View key='home' style={{flex:1}}>
                    <HOME />
                </View>
                <View key='medical' style={{flex:1}}>
                    <MEDICAL />
                </View>
            </PagerView>
            <View style={[styles.nav_bar,{backgroundColor:'transparant',overflow:'hidden'}]}>
                <BlurView intensity={35} tint="light" style={StyleSheet.absoluteFill}/>
                <Pressable
                    onPress={()=>goToPage(0)}
                >
                    <Pressable 
                        onPress={()=>goToPage(0)}
                        style={[styles.row_align_center,{
                            justifyContent:'flex-start',
                            alignSelf: 'flex-start',
                            gap:6,
                            paddingHorizontal:scale(12),
                            paddingVertical:scale(8),
                            backgroundColor: '#161616',
                            borderRadius: 25,
                        }]}
                    >
                    <HugeiconsIcon icon={Home} size={moderateScale(23)} color='#fff'/>
                    <Text style={{fontSize:moderateScale(16), fontWeight: 400, color: '#fff'}}>Home</Text>
                    </Pressable>
                </Pressable>
                <HugeiconsIcon icon={Robot01Icon} size={moderateScale(23)}/>
                <HugeiconsIcon icon={FavouriteIcon} size={moderateScale(23)}/>
                <HugeiconsIcon icon={UserSharingIcon} size={moderateScale(23)}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    row_align_center:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    nav_bar:{
        position: 'fixed',
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        marginHorizontal:scale(40),
        bottom: verticalScale(25),
        backgroundColor: '#e5e5e5',
        borderRadius: 60,
        paddingHorizontal: scale(12),
        paddingVertical:verticalScale(8),
        borderColor: '#fff',
        borderWidth: scale(2),
        shadowColor: '#000',
        shadowRadius: 25,
        shadowOpacity:0.2,
        shadowOffset:{width:0,height:20}
    },
})