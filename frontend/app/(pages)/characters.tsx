import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import PageTemplate from "../../components/PageTemplate";
import {Loading, Error} from "../../components/Loading"
import { useApolloClient, useQuery } from '@apollo/client';
import {TextSearch, SelectorFilter} from "../../components/Input";
import { View, Text } from "../../components/Themed";
import { GridView } from '../../components/Views';
import {ListCharacters, ListCharacterOptions} from '../../queries/queries.graphql';


export default function CharacterFilters() {  
  const client = useApolloClient()
  const [name, onChangeName] = React.useState('');
  const [specie, onChangeSpecie] = React.useState('empty');
  const [gender, onChangeGender] = React.useState('empty');
  const [status, onChangeStatus] = React.useState('empty');

  const { loading, error, data } = useQuery(ListCharacterOptions);
  if (loading) return <Loading/>;
  if (error) return <Error error={error.message}/>;

  const species = data.species.map((v: { name: string; }) => {return v.name});
  const genders = data.genders.map((v: { name: string; }) => {return v.name});
  const statuses = data.statuses.map((v: { name: string; }) => {return v.name});

  client.cache.reset();
  return (
    <PageTemplate imageSource="/assets/images/characters.png">
      <GridView>
        <TextSearch onSubmitEditing={onChangeName}/>
        <SelectorFilter onValueChange={onChangeSpecie} values={species}/>
        <SelectorFilter onValueChange={onChangeGender} values={genders}/>
        <SelectorFilter onValueChange={onChangeStatus} values={statuses}/>
      </GridView>
      <Characters
          name={name}
          specie={(specie == 'empty' ? undefined : specie)}
          gender={(gender == 'empty' ? undefined : gender)}
          status={(status == 'empty' ? undefined : status)}
      />
    </PageTemplate>
  )
}

function Characters({name, specie, gender, status}: {name: string, specie: string | undefined, gender: string | undefined, status: string | undefined}) {
  const { loading, data, error } = useQuery(ListCharacters, {
    fetchPolicy: 'network-only',
    variables: {
      offset: 0,
      limit: 10,
      fname: name,
      fspecie: specie,
      fgender: gender,
      fstatus: status
    }
  });

  if (loading) return <Loading/>
  if (error) return <Error error={error.message}/>;

  const characters = data.characters.map((c: { name: string, id: string }) => {
    return <Text key={c.id}>{c.name}</Text>
  })

  return (
      <View style={styles.characterContainer}>
        {characters}
      </View>
  )
}

const styles = StyleSheet.create({
  characterContainer: {

  },
  container: {
    marginTop: 20
  },
})