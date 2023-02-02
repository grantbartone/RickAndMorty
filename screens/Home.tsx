/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  Alert,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Item from '../components/Item';
import {characterApi} from '../services/character';

const ListEmptyComponent = (isLoading: boolean) => {
  if (isLoading) {
    return null;
  }

  return (
    <View style={styles.emptyList}>
      <Text>Pull to load data</Text>
    </View>
  );
};

/* This branch uses Redux Toolkit (RTK) Query to fetch the first page of character data to display
 * is the FlatList along with Detail screen navigation. It needs work to propertly store the data
 * in the Redux store, support pagination, pull-to-refresh, and the Reset button.
 */
function Home(): JSX.Element {
  const {data, error, isLoading} =
    characterApi.endpoints.getCharacterByPage.useQuery('1');

  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  // const handleReset = () => {
  //   Alert.alert('The launch state has been reset.');
  //   handleRefresh();
  // };

  // const handleRefresh = () => {
  //   setData([]);
  //   setPage(1);
  // };

  // const handleLoadMore = () => setPage(page + 1);

  if (error) {
    Alert.alert('Something went wrong! Try again.');
    return null;
  }

  return (
    <View style={[styles.container, backgroundStyle]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      {/* <Button title="Reset" onPress={handleReset} /> */}
      <FlatList
        data={data?.results || []}
        renderItem={({item}) => <Item {...item} />}
        keyExtractor={(_, idx) => `${idx}`} // Replaced `item.id` with `idx` due to duplicate IDs
        // onRefresh={handleRefresh}
        refreshing={isLoading}
        ListEmptyComponent={() => ListEmptyComponent(isLoading)}
        // ListFooterComponent={ActivityIndicator}
        // onEndReached={handleLoadMore}
        // onEndReachedThreshold={0.5}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
