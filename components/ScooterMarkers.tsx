import React from 'react';
import { CircleLayer, Images, ShapeSource, SymbolLayer } from '@rnmapbox/maps';
import { featureCollection, point } from '@turf/helpers';
import scooterData from '~/data/scooters.json';
import { useScooter } from '../providers/ScooterProvider';
import { OnPressEvent } from '@rnmapbox/maps/lib/typescript/src/types/OnPressEvent';
import pin from '~/assets/pin.png';

const ScooterMarkers = () => {
  const { setSelectedScooter } = useScooter();

  const points = scooterData.map((scooter) => point([scooter.long, scooter.lat], { scooter }));

  const onPointPress = async (event: OnPressEvent) => {
    if (event.features[0].properties?.scooter) {
      setSelectedScooter(event.features[0].properties.scooter);
    }
  };
  return (
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
        style={{
          iconSize: 0.5,
          iconImage: 'pin',
          iconAllowOverlap: true,
          iconAnchor: 'bottom',
        }}
      />
      <Images images={{ pin }} />
    </ShapeSource>
  );
};

export default ScooterMarkers;
