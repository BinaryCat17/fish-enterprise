import React, { useEffect } from 'react';
import { StyleSheet, Image } from 'react-native';
import PageTemplate from "../../components/PageTemplate";
import {Loading, Error} from "../../components/Loading"
import { useApolloClient, useQuery } from '@apollo/client';
import {TextSearch, SelectorFilter, Button} from "../../components/Input";
import { View, Text } from "../../components/Themed";
import { GridView } from '../../components/Views';
import Card from '../../components/Card';
import {ListCharacters, ListCharacterOptions} from '../../queries/lists.graphql';
import { Stack } from 'expo-router';


export default function CharacterFilters() {  
  const client = useApolloClient()
  const [name, onChangeName] = React.useState('');
  const [specie, onChangeSpecie] = React.useState('Specie');
  const [gender, onChangeGender] = React.useState('Gender');
  const [status, onChangeStatus] = React.useState('Status');

  const { loading, error, data } = useQuery(ListCharacterOptions);
  if (loading) return <Loading/>;
  if (error) return <Error error={error.message}/>;

  const species = data.species.map((v: { name: string; }) => {return v.name});
  const genders = data.genders.map((v: { name: string; }) => {return v.name});
  const statuses = data.statuses.map((v: { name: string; }) => {return v.name});

  client.cache.reset();
  return (
    <PageTemplate imageSource="/assets/images/characters.png">
      <GridView rowLen={4}>
        <TextSearch onSubmitEditing={onChangeName}/>
        <SelectorFilter onValueChange={onChangeSpecie} values={species} initialValue='Specie'/>
        <SelectorFilter onValueChange={onChangeGender} values={genders} initialValue='Gender'/>
        <SelectorFilter onValueChange={onChangeStatus} values={statuses} initialValue='Status'/>
      </GridView>
      <Characters
          name={name}
          specie={(specie == 'Specie' ? undefined : specie)}
          gender={(gender == 'Gender' ? undefined : gender)}
          status={(status == 'Status' ? undefined : status)}
      />
    </PageTemplate>
  )
}

function CharacterCard({name, id, specie}: {name: string, id: string, specie: string}) {
  return (
    <Card title={name} imageName={name} imageHeight={168} id={id} entity='characters'>
        <Text style={styles.cardSpecial}>{specie}</Text>
    </Card>

  )
}

function Characters({name, specie, gender, status}: {name: string, specie: string | undefined, gender: string | undefined, status: string | undefined}) {
  const { loading, data, error, fetchMore } = useQuery(ListCharacters, { 
    variables: {
      offset: 0,
      limit: 8,
      fname: name,
      fspecie: specie,
      fgender: gender,
      fstatus: status
    }
  });

  if (loading) return <Loading/>
  if (error) return <Error error={error.message}/>;

  const characters = data.characters.map((c: { name: string, id: string, specie: {name: string} }) => {
    return <CharacterCard key={c.id} name={c.name} id={c.id} specie={c.specie.name}/>
  })

  return (
      <View style={styles.characterContainer}>
        <GridView rowLen={4}>
          {characters}
        </GridView>
        <View style={styles.button}>
          <Button title='Load More' onClick={
            () => {
              console.log(data.characters.length)
              fetchMore({
                variables: {
                  offset: data.characters.length,
                }
              })
        }}/>
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
  characterContainer: {
    marginTop: 25
  },
  container: {
    marginTop: 20
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
  }
})