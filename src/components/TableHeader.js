import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { sortColumn } from '../actions';

function changeOrder(event, orderColumn) {
  const title = event.target.innerHTML;
  orderColumn(title);
}

function TableHeader({ orderColumn }) {
  const titles = [
    'name',
    'population',
    'orbital_period',
    'diameter',
    'climate',
    'gravity',
    'terrain',
    'rotation_period',
    'surface_water',
    'films',
    'created',
    'edited',
    'url',
  ];

  return (
    <tr>
      {titles.map((title) => (
        <th key={title}>
          <button type="button" onClick={(e) => changeOrder(e, orderColumn)}>{title}</button>
        </th>
      ))}
    </tr>
  );
}

TableHeader.propTypes = {
  orderColumn: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  orderColumn: (value) => dispatch(sortColumn(value)),
});

export default connect(null, mapDispatchToProps)(TableHeader);
