import Mapbox, {
  Camera,
  CircleLayer,
  Images,
  LineLayer,
  LocationPuck,
  MapView,
  ShapeSource,
  SymbolLayer,
} from '@rnmapbox/maps';
import { OnPressEvent } from '@rnmapbox/maps/lib/typescript/src/types/OnPressEvent';
import { featureCollection, point } from '@turf/helpers';
import * as Location from 'expo-location';
import { useState } from 'react';

import { getDirections } from '../services/directions';

import pin from '~/assets/pin.png';
import scooterData from '~/data/scooters.json';

Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_KEY || '');

const Map = () => {
  const [direction, setDirection] = useState();

  const points = scooterData.map((item) => point([item.long, item.lat]));

  const directionCoordinate = direction?.routes?.[0]?.geometry.coordinates;

  const onPointPress = async (event: OnPressEvent) => {
    const myLocation = await Location.getCurrentPositionAsync();

    const newDirection = await getDirections(
      [myLocation.coords.longitude, myLocation.coords.latitude],
      [event.coordinates.longitude, event.coordinates.latitude]
    );

    setDirection(newDirection);
  };

  return (
    <MapView style={{ flex: 1 }} styleURL="mapbox://styles/mapbox/satellite-streets-v12">
      <Camera followZoomLevel={14} followUserLocation />
      <LocationPuck puckBearingEnabled puckBearing="heading" pulsing={{ isEnabled: true }} />
      <ShapeSource
        id="scooters"
        cluster
        clusterRadius={30}
        shape={featureCollection(points)}
        onPress={onPointPress}>
        <SymbolLayer
          id="clusters-count"
          filter={['has', 'point_count']}
          style={{
            textField: ['get', 'point_count'],
            textSize: 16,
            textColor: 'white',
            textAnchor: 'center',
            textFont: ['Open Sans Bold'],
          }}
        />
        <CircleLayer
          id="clusters"
          filter={['has', 'point_count']}
          belowLayerID="clusters-count"
          style={{
            circlePitchAlignment: 'map',
            circleColor: '#42E100',
            circleRadius: 20,
            circleOpacity: 1,
            circleStrokeWidth: 2,
            circleStrokeColor: 'white',
          }}
        />
        <SymbolLayer
          id="scooter-icons"
          belowLayerID="clusters-count"
          filter={['!', ['has', 'point_count']]}
          style={{ iconSize: 0.5, iconImage: 'pin', iconAllowOverlap: true, iconAnchor: 'bottom' }}
        />
        <Images images={{ pin }} />
      </ShapeSource>
      {directionCoordinate && (
        <ShapeSource
          id="routeSource"
          lineMetrics
          shape={{
            properties: {},
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: directionCoordinate,
            },
          }}>
          <LineLayer
            id="exampleLineLayer"
            style={{
              lineColor: '#42E100',
              lineCap: 'round',
              lineJoin: 'round',
              lineWidth: 7,
            }}
          />
        </ShapeSource>
      )}
    </MapView>
  );
};

export default Map;
