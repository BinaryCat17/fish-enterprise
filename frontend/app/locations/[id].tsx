import { StyleSheet, Image, TouchableHighlight } from 'react-native';
import { Link, useLocalSearchParams } from "expo-router";
import EntityTemplate from "../../components/EntityTemplate";
import { useQuery } from "@apollo/client";
import { View, Text } from '../../components/Themed';
import { Loading, Error } from "../../components/Loading";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { GridView } from '../../components/Views';
import Card from '../../components/Card';
import { Button } from '../../components/Input';
import {LocationInfo} from '../../queries/entity.graphql';

function CharacterCard({name, id, specie}: {name: string, id: string, specie: string}) {
  return (
    <Card title={name} imageName={name} imageHeight={168} id={id} entity='characters'>
        <Text style={styles.cardSpecial}>{specie}</Text>
    </Card>
  )
}

export default function LocationEntity() {
  const { id } = useLocalSearchParams();
  const { loading, data, error } = useQuery(LocationInfo, { 
    variables: {
      offset: 0,
      limit: 12,
      id: id
    }
  });
  if (loading) return <Loading/>
  if (error) return <Error error={error.message}/>;
  const location = data.locations[0];

  const residents = location.residents.map((c: { name: string, id: string, specie: {name: string} }) => {
    return <CharacterCard key={c.id} name={c.name} id={c.id} specie={c.specie.name}/>
  })

    return (
    <EntityTemplate>
      <View style={styles.characterContainer}>
        <View>
            <Text style={styles.header}>{location.name+'('+location.dimension.name+')'}</Text>
            <View style={styles.info}>
              <View>
                  <Text style={styles.infoTitle}>Type</Text>
                  <Text style={styles.infoDescription}>{location.type.name}</Text>
              </View>
              <View>
                  <Text style={styles.infoTitle}>Dimension</Text>
                  <Text style={styles.infoDescription}>{location.dimension.name}</Text>
              </View>
            </View>
        </View>
        <GridView rowLen={4}>
          {residents}
        </GridView>
      </View>
    </EntityTemplate>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 20
  },
  characterContainer: {
    marginTop: 25,
    width: '100%'
  },
  header: {
    marginTop: 10,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: "400",
    fontSize: 36,
    lineHeight: 42,
    textAlign: 'center'
  },
  cardSpecial: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 21,
    color: "rgba(0,0,0,0.6)"
  },
  button: {
    width: 200,
    marginTop: 25,
    alignSelf:'center'
  },
  info: {
    flexDirection:'row',
    justifyContent: 'center',
    gap:200,
    marginTop: 25,
    marginBottom: 100
  },
  infoTitle: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 24,
    color: '#081F32;'
  },
  infoDescription: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
    color: '#6E798C'
  },
})