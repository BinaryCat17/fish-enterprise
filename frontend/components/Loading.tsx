import { ActivityIndicator } from 'react-native';
import { Text } from './Themed';


export function Loading() {
    return (
        <ActivityIndicator/>
      )
}

export function Error({error}: {error: string}) {
  return (
      <Text>`Error! ${error}`;</Text>
    )
}