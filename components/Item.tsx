import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useMemo} from 'react';

interface AppearancesType {
  [season: string]: number;
}

const Item = ({
  image,
  name,
  status,
  episode,
}: {
  image: string;
  name: string;
  status: string;
  episode: string[];
}) => {
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

  const renderSeasonAppearances = () => {
    const seasonsText = [];
    for (const season in appearancesPerSeason) {
      seasonsText.push(`Season ${season}: ${appearancesPerSeason[season]}`);
    }
    return seasonsText.map((season, key) => <Text key={key}>{season}</Text>);
  };

  return (
    <View style={styles.item}>
      <Image source={{uri: image}} style={styles.rowImage} />
      <View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.status}>Status: {status}</Text>
        <Text>Appearances per Season</Text>
        {renderSeasonAppearances()}
      </View>
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    backgroundColor: '#18b1ca',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  rowImage: {width: 80, height: 80, marginRight: 10},
  name: {fontSize: 24},
  status: {fontSize: 16, paddingBottom: 10},
  appearances: {flexDirection: 'column'},
});
