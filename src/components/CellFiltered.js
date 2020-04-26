import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class CellFiltered extends Component {

  render() {
    const { dataMockFilter } = this.props;
    return (
      dataMockFilter.results.sort((a, b) => a.name < b.name ? -1 : 1).map((element) => (
        <tbody key={element.name}>
          <tr>
            {Object.values(element).map((item, index) => {
              if (index !== 9) {
                return (
                  <td key={item}>{item}</td>
                );
              }
              return null;
            })}
          </tr>
        </tbody>
      ))
    );
  }
}

const mapStateToProps = ({
  loadReducer: { dataMockFilter } }) => ({
    dataMockFilter,
  });

export default connect(mapStateToProps)(CellFiltered);

CellFiltered.propTypes = {
  dataMockFilter: PropTypes.instanceOf(Object).isRequired,
};
