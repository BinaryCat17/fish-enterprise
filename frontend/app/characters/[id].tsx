import { StyleSheet, Image, TouchableHighlight } from 'react-native';
import { Link, useLocalSearchParams } from "expo-router";
import EntityTemplate from "../../components/EntityTemplate";
import { useQuery } from "@apollo/client";
import { View, Text } from '../../components/Themed';
import { Loading, Error } from "../../components/Loading";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { GridView } from '../../components/Views';
import {CharacterInfo} from '../../queries/entity.graphql';

function InfoBox({title, description, footer, entity, id}:
    {title: string, description:string, footer?:string, entity?:string, id?:string}) {
  let footerView = <View/>
  if(footer) {
    footerView = <Text style={styles.infoFooter}>{footer}</Text>
  }
  let arrayView = <View/>
  if(entity && id) {
    arrayView = <Link href={'/'+entity+'/'+id}>
      <TouchableHighlight>
          <FontAwesome size={28} name="angle-right" />
      </TouchableHighlight> 
    </Link>
  }

  return (
    <View style={styles.infoBox}>
      <View>
          <Text style={styles.infoTitle}>{title}</Text>
          <Text style={styles.infoDescription}>{description}</Text>
          {footerView}
      </View>
      <View>
          {arrayView}
      </View>
    </View>
  )
}

export default function CharacterEntity() {
  const { id } = useLocalSearchParams();
  const { loading, data, error } = useQuery(CharacterInfo, { 
    variables: {
      id: id
    }
  });
  if (loading) return <Loading/>
  if (error) return <Error error={error.message}/>;
  const character = data.characters[0];

  const episodes = character.episodes.map((e: { code: string; name: string; date: string; id: string; })=>{
    return <InfoBox key={e.id} title={e.code} description={e.name} footer={e.date} entity='episodes' id={e.id}/>
  })

  return (
    <EntityTemplate>
      <View style={styles.container}>
          <Image source={{uri: '/assets/images/' + character.name + '.png'}} style={[styles.image]}/>
          <Text style={styles.name}>{character.name}</Text>
          <GridView rowLen={2} gap={50}>
              <View>
                  <Text style={styles.titleColumnText}>Information</Text>
                  <View>
                      <InfoBox title='Gender' description={character.gender.name}/>
                      <InfoBox title='Status' description={character.status.name}/>
                      <InfoBox title='Specie' description={character.specie.name}/>
                      <InfoBox title='Origin' description={character.origin}/>
                      <InfoBox title='Type' description={character.type}/>
                      <InfoBox title='Location'
                          description={character.location.name + '(' + character.location.dimension.name + ')'}
                          entity='locations' id={character.location.id}
                      />
                  </View>
              </View>
              <View>
                  <Text style={styles.titleColumnText}>Episodes</Text>
                  <View>
                    {episodes}
                  </View>
              </View>
          </GridView>
      </View>
    </EntityTemplate>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '60%',
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 5,
    borderColor: "rgba(0,0,0,0.05)",
    alignSelf: 'center'
  },
  name: {
    marginTop: 10,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: "400",
    fontSize: 48,
    lineHeight: 56,
    textAlign: 'center'
  },
  infoBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    paddingHorizontal: 15,
    paddingTop: 9,
    paddingBottom: 10,
    alignItems: 'center'
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
  infoFooter: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 10,
    lineHeight: 16,
    color: '#8E8E93'
  },
  titleColumnText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 24,
    color: '#8E8E93',
    marginTop: 30,
    marginBottom: 30
  }
})