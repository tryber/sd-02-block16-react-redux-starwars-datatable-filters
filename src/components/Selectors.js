import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setSessionStorage } from '../store/actions/selectors';

const Selectors = (
  {
    selects, i, setSelectedValues, filters,
  },
) => {
  console.log(filters);
  return (
    <div>
      <select id="values" onChange={(e) => setSelectedValues(e, i)}>
        {
          i === 0
            ? <option value="">Todos</option>
            : <option value="">Escolha um comparador</option>
        }
        {
          selects.map((value) => <option value={value} key={value}>{value}</option>)
        }
      </select>
      {i === 1 ? <input type="number" placeholder="Digite um valor numerico" onChange={(e) => setSelectedValues(e, 2)} /> : ''}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setSelectedValues: (e, i) => dispatch(setSessionStorage(e, i)),
});

const mapStateToProps = ({
  selectors: {
    selectedValues,
  },
  table: {
    filters,
  },
}) => ({
  filters,
  selectedValues,
});


export default connect(mapStateToProps, mapDispatchToProps)(Selectors);

Selectors.propTypes = {
  setSelectedValues: PropTypes.func.isRequired,
  selects: PropTypes.instanceOf(Array).isRequired,
  i: PropTypes.number.isRequired,
  filters: PropTypes.instanceOf(Array).isRequired,
};

Selectors.defaultProps = {
};
