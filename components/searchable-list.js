import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, Switch } from "react-native";
import { SearchBar } from "react-native-elements";
import { SwipeListView } from "react-native-swipe-list-view";

const defaultSeachBarOptions = {
  placeholder: Jargon.searchable_list_placeholder,
  searchProp: "title",
};

const SearchableList = ({
  data,
  fetchData,
  searchBar = defaultSeachBarOptions,
  renderListItem,
  emptyListMessage,
}) => {
  const [search, setSearch] = useState("");
  const [displayData, setDisplayData] = useState(data);
  const [reloading, setReloading] = useState(false);

  useEffect(() => {
    setDisplayData(data);
  }, [data]);

  const searchBarOptions = Object.assign({}, defaultSeachBarOptions, searchBar);

  const reloadData = async () => {
    setReloading(true);
    setSearch("");
    await fetchData();
    setReloading(false);
  };

  async function filterDataBySearchTerm(text) {
    setSearch(text);

    const toDisplay = data.filter((item) => {
      return contains(item, searchBarOptions.searchProp, text);
    });

    setDisplayData(toDisplay);
  }

  return (
    <SafeAreaView style={listStyles.container}>
      <SearchBar
        placeholder={searchBarOptions.placeholder}
        onChangeText={(text) => filterDataBySearchTerm(text)}
        value={search}
        clearIcon={search.length > 0}
      />
      <SwipeListView
        keyExtractor={(item) => `${item.id}`}
        ListEmptyComponent={<Text>{emptyListMessage}</Text>}
        refreshing={reloading}
        onRefresh={reloadData}
        data={displayData}
        renderItem={(itemProps) =>
          renderListItem({
            ...itemProps,
          })
        }
      />
    </SafeAreaView>
  );
};

export default SearchableList;
