import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  SectionList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
// import TimerContext from '../context/TimerContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Actions from '../components/Actions';

function TimerListScreen() {
  const [timers, setTimers] = useState([]);
  const [expandedSections, setExpandedSections] = useState({});
  //const { state, dispatch } = useContext(TimerContext);
  //console.log(state.timers)

  console.log(timers);

  useEffect(() => {
    const loadTimers = async () => {
      const storedTimers = await AsyncStorage.getItem('timers');
      console.log(storedTimers, 'ths is stored timers in local storage');
      if (storedTimers) {
        const timers = JSON.parse(storedTimers);
        setTimers(timers);
      }
    };

    loadTimers();
  }, []);

  const groupTimers = () => {
    const grouped = timers.reduce((result, timer) => {
      (result[timer.category] = result[timer.category] || []).push(timer);
      return result;
    }, {});

    return Object.keys(grouped).map(category => ({
      title: category,
      data: grouped[category],
    }));
  };

  const toggleSection = sectionTitle => {
    setExpandedSections(prevState => ({
      ...prevState,
      [sectionTitle]: !prevState[sectionTitle],
    }));
  };

  return (
    <View style={styles.container}>
      <SectionList
        sections={groupTimers()}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.timerItem}>
            <Text>{item.name}</Text>
            <Text>{item.remaining}s remaining</Text>
            <Text>Status: {item.status}</Text>
          </View>
        )}
        renderSectionHeader={({section}) => (
          <View>
            <TouchableOpacity onPress={() => toggleSection(section.title)}>
              <Text style={styles.categoryHeader}>
                {section.title}
                <Image
                  source={
                    expandedSections[section.title] ? icons.up : icons.down
                  }
                  style={styles.arrowIcon}
                />
              </Text>
            </TouchableOpacity>
            <Actions category={section.title} />
          </View>
        )}
        renderSectionFooter={({section}) => {
          return expandedSections[section.title] ? null : (
            <View style={{height: 0}} />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  timerItem: {
    marginBottom: 10,
  },
  categoryHeader: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 10,
  },
});

export default TimerListScreen;
