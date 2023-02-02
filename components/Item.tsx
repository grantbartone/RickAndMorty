import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useMemo} from 'react';
import {useNavigation} from '@react-navigation/native';

interface AppearancesType {
  [season: string]: number;
}

export interface ItemProps {
  image: string;
  name: string;
  status: string;
  episode: string[];
  gender: string;
  type: string;
  species: string;
  origin: {name: string};
  location: {name: string};
}

const Item = (props: ItemProps) => {
  const {image, name, status, episode} = props;
  const navigation = useNavigation<any>();

  const getSeasonByEpisode = (episodeUrl: string) => {
    const episodeNum = Number(episodeUrl.split('/').pop());
    switch (true) {
      case episodeNum <= 11:
        return 1;
      case episodeNum <= 21:
        return 2;
      case episodeNum <= 31:
        return 3;
      case episodeNum <= 41:
        return 4;
      case episodeNum <= 51:
        return 5;
      default:
        return 6;
    }
  };

  const appearancesPerSeason = useMemo(() => {
    const appearances: AppearancesType = {};
    episode.forEach(episodeUrl => {
      const season = `${getSeasonByEpisode(episodeUrl)}`;
      appearances[season] = appearances[season] || 0;
      appearances[season] += 1;
    });
    return appearances;
  }, [episode]);

  const handlePress = () => {
    navigation.navigate('Details', {item: props, appearancesPerSeason});
  };

  const renderSeasonAppearances = () => {
    const seasonsText = [];
    for (const season in appearancesPerSeason) {
      seasonsText.push(`Season ${season}: ${appearancesPerSeason[season]}`);
    }
    return seasonsText.map((season, key) => <Text key={key}>{season}</Text>);
  };

  return (
    <TouchableOpacity style={styles.item} onPress={handlePress}>
      <Image source={{uri: image}} style={styles.rowImage} />
      <View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.status}>Status: {status}</Text>
        <Text>Appearances per Season</Text>
        {renderSeasonAppearances()}
      </View>
    </TouchableOpacity>
  );
};

export default Item;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderColor: '#18b1ca',
    borderWidth: 2,
    borderRadius: 10,
  },
  rowImage: {width: 80, height: 80, marginRight: 10},
  name: {fontSize: 24},
  status: {fontSize: 16, paddingBottom: 10},
  appearances: {flexDirection: 'column'},
});
