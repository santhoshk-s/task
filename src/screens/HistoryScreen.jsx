import React, { useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import TimerContext from '../context/TimerContext';
import { exportHistory } from '../utils/export';
import { icons } from '../constants/index';

function HistoryScreen() {
  const { state } = useContext(TimerContext);

  const renderHistory = () => {
    if (state.history.length === 0) {
      return (
        <View style={styles.noHistoryContainer}>
          <Text style={styles.noHistoryText}>No history found</Text>
        </View>
      );
    } else {
      return (
        <FlatList
          data={state.history}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.historyItem}>
              <Text>
                {item.name} - Completed at {item.completedAt}
              </Text>
            </View>
          )}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Timer History</Text>
        <TouchableOpacity style={styles.exportButton} onPress={exportHistory}>
          <Image source={icons.exports} style={styles.exportIcon} />
          <Text style={styles.exportText}>Export</Text>
        </TouchableOpacity>
      </View>

      {renderHistory()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: { fontSize: 20, fontWeight: 'bold' },
  exportButton: {
    flexDirection: 'row',
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  exportIcon: { width: 24, height: 24 },
  exportText: { color: 'white', marginLeft: 5 },
  historyItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ddd' },
  noHistoryContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  noHistoryText: {
    fontSize: 18,
    color: '#666',
    fontStyle: 'italic',
  },
});

export default HistoryScreen;
