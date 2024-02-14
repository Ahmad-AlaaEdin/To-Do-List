import { FlatList, Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";

const Pie = ({ values, total }) => {
  const colors = ["#4584ED", "#699DF0", "#8EB6F4", "#B5CEF7"];
  const pieData = values.map((item, index) => ({
    ...item,
    color: colors[index % colors.length],
  }));
  console.log(values);
  const renderDot = (color) => {
    return (
      <View
        style={{
          height: 10,
          width: 10,
          borderRadius: 5,
          backgroundColor: color,
          marginRight: 10,
        }}
      />
    );
  };

  const renderLegendComponent = () => {
    return (
      <FlatList
        data={pieData}
        renderItem={({ item }) => (
          <View
            style={{ flexDirection: "row", alignItems: "center", width: 120 }}
          >
            {renderDot(item.color)}
            <Text style={{ color: "black" }}>
              {item.category}{" "}
              <Text style={{ color: "#4584ED" }}>{item.value}</Text>
            </Text>
          </View>
        )}
      />
    );
  };

  return (
    <View
      style={{
        width: "100%",
        flex: 1,
      }}
    >
      <View
        style={{
          marginVertical: 10,
          padding: 16,
          borderRadius: 20,
          backgroundColor: "#EBF5FE",
        }}
      >
        <Text style={{ color: "#6B7076", fontSize: 16, fontWeight: "bold" }}>
          Pending Tasks in Categories
        </Text>
        <View style={{ padding: 20, alignItems: "center" }}>
          <PieChart
            data={pieData}
            donut
            strokeColor="#EBF5FE"
            strokeWidth={2}
            sectionAutoFocus
            radius={90}
            innerRadius={60}
            innerCircleColor={"#EBF5FE"}
          />
        </View>
        {renderLegendComponent()}
      </View>
    </View>
  );
};
export default Pie;
