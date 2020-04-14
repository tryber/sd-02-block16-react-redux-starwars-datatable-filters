import PropTypes from 'prop-types';

const planetsPropTypes = {
  planets: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      rotation_period: PropTypes.string,
      orbital_period: PropTypes.string,
      diameter: PropTypes.string,
      surface_water: PropTypes.string,
      climate: PropTypes.string,
      gravity: PropTypes.string,
      terrain: PropTypes.string,
      populatio: PropTypes.string,
      created: PropTypes.string,
      edited: PropTypes.string,
      url: PropTypes.string,
      films: PropTypes.arrayOf(
        PropTypes.string,
      ),
    }),
  ),
};

const planetsDefault = {
  planets: [{
    name: '',
    rotation_period: null,
    orbital_period: null,
    diameter: null,
    surface_water: '',
    climate: '',
    gravity: '',
    terrain: '',
    populatio: '',
    created: '',
    edited: '',
    url: '',
    films: PropTypes.arrayOf(
      '',
    ),
  }],
};

const filtersPropTypes = {
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    }).isRequired,
    PropTypes.shape({
      numericValues: PropTypes.shape({
        name: PropTypes.string,
        condition: PropTypes.string,
        input: PropTypes.string,
      }).isRequired,
    }).isRequired,
    PropTypes.shape({
      order: PropTypes.shape({
        name: PropTypes.string,
        asc: PropTypes.string,
      }),
    }).isRequired,
  ),
};

const filtersDefault = {
  filters: [
    {
      name: '',
    },
    {
      numericValues: {
        name: '',
        condition: '',
        input: undefined,
      },
    },
    {
      order: {
        name: '',
        asc: '',
      },
    },
  ],
};

export {
  planetsPropTypes,
  planetsDefault,
  filtersPropTypes,
  filtersDefault,
};
