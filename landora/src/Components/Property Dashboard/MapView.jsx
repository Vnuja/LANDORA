import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 40.7128,
  lng: -74.006,
};

const MapView = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Property Locations</Typography>
        <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
          <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
            <Marker position={center} />
          </GoogleMap>
        </LoadScript>
      </CardContent>
    </Card>
  );
};

export default MapView;
