import React from 'react';

const Cedula = ({ planet }) => (
  Object.keys(planet).map((ele) => {
    if (ele !== 'residents') {
      return (
        <td key={Object.values(planet[ele])}>
          {Object.values(planet[ele])}
        </td>
      );
    }
    return null;
  })
);


export default Cedula;
