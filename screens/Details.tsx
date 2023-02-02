import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {ItemProps} from '../components/Item';

const Details = ({route}: {route: any}) => {
  const {
    item,
    appearancesPerSeason,
  }: {item: ItemProps; appearancesPerSeason: any} = route.params;
  const {image, name, status, gender, species, type, origin, location} = item;

  const renderSeasonAppearances = () => {
    const seasonsText = [];
    for (const season in appearancesPerSeason) {
      seasonsText.push(`Season ${season}: ${appearancesPerSeason[season]}`);
    }
    return seasonsText.map((season, key) => <Text key={key}>{season}</Text>);
  };

  return (
    <View style={styles.container}>
      <Image source={{uri: image}} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.info}>Status: {status}</Text>
      <Text style={styles.info}>Species: {species}</Text>
      {type ? <Text style={styles.info}>Type / Subspecies: {type}</Text> : null}
      <Text style={styles.info}>Gender: {gender}</Text>
      <Text style={styles.info}>Origin: {origin?.name}</Text>
      <Text style={styles.info}>Location: {location?.name}</Text>
      <View>
        <Text style={styles.appearancesTitle}>Appearances per Season</Text>
        <View style={styles.appearancesList}>{renderSeasonAppearances()}</View>
      </View>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  image: {width: 250, height: 250},
  name: {fontSize: 30, paddingBottom: 20},
  info: {fontSize: 20, paddingBottom: 10},
  appearancesTitle: {fontSize: 20, paddingTop: 20},
  appearancesList: {alignItems: 'center'},
});
