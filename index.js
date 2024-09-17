import React from "react";
import { View, Text } from "react-native";
import SearchableList from "./components/searchable-list";
import ListRow from "/components/list-row";
import { useSelector, useDispatch } from "react-redux";
import { fetchData, sampleSelectors } from "./redux/main-slice";
import styles from "./styles";
import ParsedDate from "./util/date";
import { icons } from "icon-library";

const SampleListItem = ({ item, index }) => {
  const displayItem = async () => {
    console.log("Item: " + item);
  };

  return (
    <ListRow
      index={index}
      title={item.title}
      titleStyles={styles.title}
      subTitle={`Last Updated: ${new ParsedDate(item.updatedAt).toString()}`}
      rightIcon={{
        iconEnum: icons.go_arrow,
        styles: { paddingRight: 3 },
      }}
      onPress={displayItem}
    />
  );
};

const SamplePage = (props) => {
  const sampleData = useSelector(sampleSelectors.selectAll);
  const dispatch = useDispatch();

  return (
    <SearchableList
      data={sampleData}
      fetchData={() => dispatch(fetchData())}
      emptyListMessage="No data to display."
      renderListItem={(itemProps) => (
        <SampleListItem {...itemProps} parentId={props.componentId} />
      )}
    />
  );
};

export default SamplePage;
