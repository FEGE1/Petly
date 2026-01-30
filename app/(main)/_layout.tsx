import { useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import PagerView from "react-native-pager-view";

import CARE from './care';
import HOME from "./home";
import HOTELS from './hotels';
import MEDICAL from "./medical";

import { ApartmentIcon, HairDryerIcon, HealtcareIcon, Store01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { BlurView } from "expo-blur";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

import type { IconSvgElement } from "@hugeicons/react-native";

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
                    <MEDICAL isActive={page === 1}/>
                </View>
                <View key='care' style={{flex:1}}>
                    <CARE />
                </View>
                <View key='hotels' style={{flex:1}}>
                    <HOTELS />
                </View>
            </PagerView>
            <SafeAreaView style={{position:'absolute',bottom:0,backgroundColor:'transparent',width:'100%'}}>
                <View style={[styles.nav_bar]}>
                    <BlurView intensity={10} tint="light" style={StyleSheet.absoluteFill}/>
                    <NavItem icon={Store01Icon} title="Shop" active={page === 0 && true} onPress={()=>{goToPage(0)}}/>
                    <NavItem icon={HealtcareIcon} title="Medical" active={page === 1 && true} onPress={()=>{goToPage(1)}}/>
                    <NavItem icon={HairDryerIcon} title="Care" active={page === 2 && true} onPress={()=>{goToPage(2)}}/>
                    <NavItem icon={ApartmentIcon} title="Hotels" active={page === 3 && true} onPress={()=>{goToPage(3)}}/>
                </View>
            </SafeAreaView>
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
        backgroundColor:'#ffffff9c',
        overflow:'hidden',
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        marginHorizontal:scale(25),
        borderRadius: scale(2000),
        paddingVertical:verticalScale(2),
        borderColor: '#ffffff9b',
        borderWidth: scale(.8),
        shadowColor: '#000',
        shadowRadius: 25,
        shadowOpacity:0.1,
        shadowOffset:{width:0,height:20}
    },
    nav_item_active:{
        justifyContent:'flex-start',
        alignSelf: 'flex-start',
        gap:scale(2),
        paddingHorizontal:scale(12),
        backgroundColor: '#00000012',
        borderRadius: scale(2000),
        paddingVertical:scale(12),
        marginHorizontal:scale(2)
    }
})

type NavItemProps={
    icon: IconSvgElement;
    title: string;
    active: boolean;
    onPress: ()=> void;
}

function NavItem({icon,title,active=false,onPress}:NavItemProps){
    return(
    <Pressable
        onPress={onPress}
        style={[styles.row_align_center, active ? styles.nav_item_active:null, {paddingHorizontal: scale(20),}]}
    >
        <HugeiconsIcon icon={icon} size={moderateScale(23)} color={active?'#a83271':'#000'}/>
        {active && (<Text numberOfLines={1} style={{fontSize:moderateScale(14), fontWeight: 400, color: '#a83271'}}>{title}</Text>)}
    </Pressable>
    );    
}