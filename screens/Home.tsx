/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Item from '../components/Item';

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

function Home(): JSX.Element {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(1);

  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
      .then(res => res.json())
      .then(resJson => {
        setData(prev => [...prev, ...resJson.results]);
        setIsLoading(false);
      })
      .catch(() => {
        Alert.alert('Something went wrong! Try again.');
      });
  }, [page]);

  const handleReset = () => {
    Alert.alert('The launch state has been reset.');
    handleRefresh();
  };

  const handleRefresh = () => {
    setData([]);
    setPage(1);
  };

  const handleLoadMore = () => setPage(page + 1);

  return (
    <View style={[styles.container, backgroundStyle]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Button title="Reset" onPress={handleReset} />
      <FlatList
        data={data}
        renderItem={({item}) => <Item {...item} />}
        keyExtractor={(_, idx) => `${idx}`} // Replaced `item.id` with `idx` due to duplicate IDs
        onRefresh={handleRefresh}
        refreshing={isLoading}
        ListEmptyComponent={() => ListEmptyComponent(isLoading)}
        ListFooterComponent={ActivityIndicator}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
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
