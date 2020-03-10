import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { filterOther } from '../store/actions';

const Selectors = (
  {
    selects, i, getFilterOther, filters,
  },
) => (
    <div>
      <select id="values" onChange={(e) => getFilterOther(e, i)}>
        {
          i === 0
            ? <option value="">Todos</option>
            : <option value="">Escolha um comparador</option>
        }
        {
          selects.map((num) => (
            filters.some(({ numeric_values: { column } }) => column === num)
              ? null
              : <option key={num} value={num}>{num}</option>
          ))
        }
      </select>
      {i === 1 ? <input type="number" placeholder="Digite um valor numerico" onChange={(e) => getFilterOther(e, 2)} /> : ''}
    </div>
  );

const mapDispatchToProps = (dispatch) => (
  {
    getFilterOther: (e, i) => dispatch(filterOther(e, i)),
  }
);

const mapStateToProps = ({
  data: {
    filters,
  },
}) => ({
  filters,
});


export default connect(mapStateToProps, mapDispatchToProps)(Selectors);

Selectors.propTypes = {
  selects: PropTypes.instanceOf(Array).isRequired,
  getFilterOther: PropTypes.func.isRequired,
  i: PropTypes.number.isRequired,
  filters: PropTypes.instanceOf(Array).isRequired,
};

Selectors.defaultProps = {
};
