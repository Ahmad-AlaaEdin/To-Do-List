import * as React from "react";
import { View, FlatList } from "react-native";
import { Button, Menu, Divider, PaperProvider } from "react-native-paper";

const MenuBtn = ({ setSelected, selected }) => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  const data = [
    {
      id: 1,
      title: "No Category",
    },
    {
      id: 2,
      title: "Study",
    },
    {
      id: 3,
      title: "Work",
    },
    {
      id: 4,
      title: "Personal",
    },
  ];
  return (
    <View style={{}}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Button textColor="#7DABF6" onPress={openMenu}>
            Choose Category
          </Button>
        }
        anchorPosition="bottom"
        contentStyle={{
          backgroundColor: "white",
        }}
      >
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <Menu.Item
              onPress={() => {
                setSelected(item.title);
              }}
              title={item.title}
              titleStyle={{
                color: selected === item.title ? "#7DABF6" : "#484B50",
              }}
            />
          )}
        />
      </Menu>
    </View>
  );
};

export default MenuBtn;
