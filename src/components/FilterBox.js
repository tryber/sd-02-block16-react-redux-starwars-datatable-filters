import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { filterButton } from '../store/actions';

const FilterBox = ({ setNewFilter, filters }) => {
  const teste = 1;
  if (teste === 1) {
    return (
      <div>
        <button type="button" onClick={() => setNewFilter()}>Clique para filtrar</button>
      </div>
    );
  }
  return null;
};

const mapDispatchToProps = (dispatch) => ({
  setNewFilter: () => dispatch(filterButton()),
});

const mapStateToProps = ({
  data: {
    filters,
  },
}) => ({
  filters,
});

FilterBox.propTypes = {
  filters: PropTypes.instanceOf(Array).isRequired,
  setNewFilter: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterBox);
