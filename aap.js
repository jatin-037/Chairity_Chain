import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

const EventDetails = ({ eventId }) => {
  const [eventDetails, setEventDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://api.example.com/data`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Data received:', data);
        setEventDetails(data);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        setError(error?.message || 'An unknown error occurred');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [eventId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin" size={48} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!eventDetails) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>No event details available.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="shadow-xl">
        <CardHeader>
          <h2 className="text-2xl font-bold">{eventDetails.title}</h2>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-gray-600">{eventDetails.description}</p>
          <p>
            <strong>Date:</strong> {new Date(eventDetails.date).toLocaleDateString()}
          </p>
          <p>
            <strong>Time:</strong> {eventDetails.time}
          </p>
          <p>
            <strong>Location:</strong> {eventDetails.location}
          </p>
        </CardContent>
        <div className="p-4">
          <Button onClick={() => alert("Back to events list")}>Back to Events</Button>
        </div>
      </Card>
    </div>
  );
};

export default EventDetails;
