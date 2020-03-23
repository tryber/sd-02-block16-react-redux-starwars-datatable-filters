import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

const PlanetList = ({ filterResults }) => {
  function tableTHead() {
    return (
      <thead>
        <tr>
          {Object.keys(filterResults[0] || []).map((key) => {
            if (key !== 'residents') {
              return (
                <th key={key}>
                  {key}
                </th>
              );
            }
            return null;
          })}
        </tr>
      </thead>
    );
  }

  function tableTBody() {
    const residentsIndex = Object.keys(filterResults[0] || []).findIndex((element) => element === 'residents');
    // console.log(filterResults);
    // console.log(filters);

    return (
      filterResults.map((value) => (
        <tbody key={value.name}>
          <tr>
            {Object.values(value).map((element, index) => {
              if (index !== residentsIndex) {
                return (
                  <td key={index}>
                    {element}
                  </td>
                );
              }
              return null;
            })}
          </tr>
        </tbody>
      ))
    );
  }

  return (
    <div>
      <table>
        {tableTHead()}
        {tableTBody()}
      </table>
    </div>
  );
};

const mapStateToProps = () => ({
  data: {
    results,
  },
  filterReducer: {
    filterResults,
    filters,
  },
}) => ({
  filterResults,
  results,
  filters,
});

export default connect(mapStateToProps)(PlanetList);

PlanetList.propTypes = {
  filterResults: propTypes.instanceOf(Array).isRequired,
  results: propTypes.instanceOf(Array).isRequired,
};
