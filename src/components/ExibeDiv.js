import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class ExibeDiv extends React.Component {
  render() {
    const { arrayNumericFilters, dispatch } = this.props;

    return (
      <div>
        {arrayNumericFilters.map((objetoDeFiltro) => (
          <div>
            <span className="filtros-show">
              {`${objetoDeFiltro.column} | ${objetoDeFiltro.comparison} | ${objetoDeFiltro.value} `}
            </span>
            <button
              type="button"
              onClick={() => dispatch({ type: 'REMOVER_FILTRO', coluna: objetoDeFiltro.column })}
            >
              X
            </button>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  arrayNumericFilters: state.filters.slice(1).map((obj) => obj.numericValues),
});

ExibeDiv.propTypes = {
  dispatch: propTypes.func.isRequired,
  arrayNumericFilters: propTypes.instanceOf(Array).isRequired,
};

export default connect(mapStateToProps)(ExibeDiv);
