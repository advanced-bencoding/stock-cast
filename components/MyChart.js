import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

export default function MyChart({data}){
    return(
        <LineChart
                data={data}
                width={Dimensions.get('window').width}
                height={400}
                withDots={false}
                withInnerLines={false}
                chartConfig={{
                    backgroundColor: '#e26a00',
                    backgroundGradientFrom: '#fb8c00',
                    backgroundGradientTo: '#ffa726',
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                      borderRadius: 16,
                      width: 1,
                    },
                    propsForDots:{
                      strokeWidth: 0.1
                    }
                  }}
            />
    )
}