import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from "react-native";

const EventCard = ({ event }) => (
  <View style={styles.eventCard}>
    <Text style={styles.eventTitle}>{event.name_event}</Text>
    <Text>{`Severity: ${event.sevetity}`}</Text>
    <Text>{`Description: ${event.description}`}</Text>
    <Text>{`Report: ${event.report}`}</Text>
  </View>
);

const EventListComponent = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEventsFromAPI();
  }, []);

  const fetchEventsFromAPI = async () => {
    try {
      const response = await fetch(
        "https://server-ems-rzdd.onrender.com/event"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
      const data = await response.json();
      console.log("Events data:", data);
      setEvents(data.data || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching events:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  if (!Array.isArray(events) || events.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No events found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {events.map((event, index) => (
        <EventCard key={`${event.id_event}_${index}`} event={event} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: "#fff",
  },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  eventCard: {
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
});

export default EventListComponent;
