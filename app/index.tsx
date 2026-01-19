import { Text, View, StyleSheet, ScrollView, TextInput } from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { SafeAreaView } from "react-native-safe-area-context";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { UserCircleIcon, Notification01Icon, StarsIcon, Search01Icon, Video01Icon, ShoppingBag01Icon, StarIcon, PencilIcon, Home, Robot01Icon, FavouriteIcon, UserSharingIcon } from "@hugeicons/core-free-icons";

export default function Index() {
  return (
    <SafeAreaView style={{flex:1}} edges={["top"]}>
      <ScrollView>
        <View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop:verticalScale(10),
            marginHorizontal: scale(15)
            }}>
            <View style = {{
              flexDirection: 'row',
              alignItems: 'center',
              gap: scale(10)
            }}>
              <HugeiconsIcon icon={UserCircleIcon} size ={scale(40)} />
              <View style={{gap:verticalScale(2)}}>
                <Text style={{fontSize: moderateScale(18), fontWeight: 400}}>Hi Ege</Text>
                <Text style={{fontSize: moderateScale(11), color: 'grey', fontWeight: 400}}>Good Morning,</Text>
              </View>
            </View>
            <View style={{backgroundColor: '#e0e0e0', borderRadius: scale(100), padding: scale(8)}}>
              <HugeiconsIcon icon={Notification01Icon} size={scale(20)} />
            </View>
          </View>
          <Text style={{fontSize: moderateScale(25), marginTop: verticalScale(20), marginRight:scale(70),marginHorizontal: scale(15)}}>What are you craving today, buddy?</Text>
          {/* search bar */}
          <View style={{gap:scale(15),marginHorizontal: scale(15),paddingVertical:verticalScale(20),flexDirection:'row',alignItems:'center'}}>
            {/* search bar left */}
            <View style={[styles.search_bar]}>
              <HugeiconsIcon icon={Search01Icon} />
              <TextInput placeholder="What are you craving today?" style={{paddingVertical:verticalScale(12),flex:1}}></TextInput>
            </View>
            {/* search bar right */}
            <View style={[
              styles.circle, 
              {backgroundColor:'#e0e0e0', 
              padding: scale(8), 
              borderColor:'white', 
              borderWidth:scale(2),
              shadowColor: '#000',
              shadowRadius:5,
              shadowOffset:{width:0,height:2},
              shadowOpacity: 0.15
              }]}>
              <HugeiconsIcon icon={StarsIcon} color={'purple'}/>
            </View>
          </View>
          <Text style={{fontSize: moderateScale(15), fontWeight: 500,marginHorizontal: scale(15)}}>Browse by Type</Text>
          {/* Type List */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{gap:scale(10),paddingVertical:verticalScale(20)}} >
            <View style={{ width: scale(8) }} />
            <TypeCard title='Video' icon={Video01Icon}/>
            <TypeCard title='Shoping' icon={ShoppingBag01Icon}/>
            <TypeCard title='Favourite' icon={StarIcon}/>
            <TypeCard title='Education' icon={PencilIcon}/>
            <TypeCard title='Explore' icon={Search01Icon}/>
            <TypeCard title='deneme' icon={Search01Icon}/>
            <TypeCard title='deneme' icon={Search01Icon}/>
            <TypeCard title='deneme' icon={Search01Icon}/>
            <View style={{ width: scale(8) }} />
          </ScrollView>
          <Text style={{fontSize: moderateScale(15), fontWeight: 500,marginHorizontal: scale(15)}}>Smart Meal Picks</Text>
          {/* Picks List */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{gap:scale(12)}} >
            <View style={{ width: scale(5) }} />
            <PickCard title='Protein Power Salad' icon={Video01Icon} value="280 Kcal"/>
            <PickCard title='Shoping' icon={ShoppingBag01Icon} value="300 Kcal"/>
            <PickCard title='Favorite' icon={StarIcon} value="150 Kcal"/>
            <PickCard title='Education' icon={PencilIcon} value="500 Kcal"/>
            <PickCard title='Explore' icon={Search01Icon} value="1250 Kcal"/>
            <View style={{ width: scale(5) }} />
          </ScrollView>
        </View>
      </ScrollView>
      <View style={[styles.nav_bar]}>
        <View style={[styles.row_align_center,{
          justifyContent:'flex-start',
          alignSelf: 'flex-start',
          gap:6, 
          paddingHorizontal:scale(12), 
          paddingVertical:scale(8), 
          backgroundColor: '#161616',
          borderRadius: 25,
          }]}>
          <HugeiconsIcon icon={Home} size={moderateScale(23)} color='#fff'/>
          <Text style={{fontSize:moderateScale(16), fontWeight: 400, color: '#fff'}}>Home</Text>
        </View>
        <HugeiconsIcon icon={Robot01Icon} size={moderateScale(23)}/>
        <HugeiconsIcon icon={FavouriteIcon} size={moderateScale(23)}/>
        <HugeiconsIcon icon={UserSharingIcon} size={moderateScale(23)}/>
      </View>
    </SafeAreaView> 
  );
}

const styles = StyleSheet.create({
  row_align_center:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  column_align_center:{
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  circle:{
    borderRadius:2000
  },
  search_bar:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:'#e0e0e0',
    paddingRight:scale(20),
    paddingLeft: scale(10),
    borderRadius: 25,
    borderWidth: moderateScale(2),
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset:{width: 0, height: 10},
    shadowOpacity: 0.05,
    shadowRadius: 25,
    gap:scale(5)
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
  }
})

type TypeCardProps = {
  title: string;
  icon: any;
}
function TypeCard({title, icon}: TypeCardProps){
  return(
    <View style={[styles.column_align_center,{gap:verticalScale(6)}]}>
      <View style={{
        justifyContent: 'center', 
        alignItems:'center',
        backgroundColor:'#e0e0e0', 
        padding: scale(14), 
        borderRadius: 20,
        borderWidth: scale(2), 
        borderColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 3,
        shadowOffset: {width:0, height:4}
        }}>
        <HugeiconsIcon icon={icon} size={moderateScale(30)}/>
      </View>
      <Text style={{color:'#696969',fontSize:moderateScale(14),fontWeight:400}}>{title}</Text>
    </View>
  );
}

type PickCardProps = {
  title: string;
  icon: any;
  value: string;
}
function PickCard({title, icon}: PickCardProps){
  return(
    <View style={[styles.column_align_center,{gap:verticalScale(6),paddingVertical:scale(20)}]}>
      <View style={{
        justifyContent: 'center', 
        alignItems:'center',
        backgroundColor:'#e0e0e0', 
        padding: scale(14), 
        borderRadius: 20,
        borderWidth: scale(2), 
        borderColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: {width:0, height:4},
        gap:verticalScale(5)
        }}>
        <Text style={{fontSize:moderateScale(14),fontWeight:400}}>{title}</Text>
        <HugeiconsIcon icon={icon} size={moderateScale(200)}/>
      </View>
      
    </View>
  );
}