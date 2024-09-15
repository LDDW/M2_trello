import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function BoardCard() {
  return (
    <View style={styles.container}>
      <Text>BoardCard</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#F6F8FC',
        marginBottom: 8,
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#EFF1F7',
        height: 80,
    }  
})