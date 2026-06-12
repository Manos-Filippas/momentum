import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AmbientBackground from '../components/AmbientBackground';

export default function AmbientDemo() {
  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Ambient Background — Light</Text>
      <View style={styles.preview}>
        <AmbientBackground colorScheme="light" style={styles.fill} />
      </View>

      <Text style={styles.heading}>Ambient Background — Dark</Text>
      <View style={styles.preview}>
        <AmbientBackground colorScheme="dark" style={styles.fill} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: '#888',
  },
  content: {
    padding: 24,
    gap: 12,
  },
  heading: {
    fontSize: 13,
    fontWeight: '600',
    color: '#fff',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  preview: {
    height: 320,
    borderRadius: 20,
    overflow: 'hidden',
  },
  fill: {
    flex: 1,
    borderRadius: 20,
  },
});
