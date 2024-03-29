import { View, Text } from "react-native";
import { CheckBox } from "react-native-btr";

export const MyCheckBox = ({isChecked,setChecked}) => {
    const toggleCheckbox = () => {
        setChecked(!isChecked);
    }
    
    return (
        <View style={{ flexDirection: 'row'}}>
            <CheckBox checked={isChecked}
            color='#00b14f'
            onPress={toggleCheckbox}/>
            <Text style={{fontSize:16,paddingLeft:8}}>Tôi là Nhà Tuyển Dụng</Text>
        </View>
    )
}