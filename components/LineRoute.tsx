import React from 'react';
import { LineLayer, ShapeSource } from '@rnmapbox/maps';
import { Position } from '@rnmapbox/maps/lib/typescript/src/types/Position';

const LineRoute = ({ coordinates }: { coordinates: Position[] }) => {
  return (
    <ShapeSource
      id="routeSource"
      lineMetrics
      shape={{
        properties: {},
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates,
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
  );
};

export default LineRoute;
