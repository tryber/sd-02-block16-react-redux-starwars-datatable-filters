import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import resultAPI from '../store/loadAction';
import planetAction from '../store/planetAction';
import HeadTable from './Headtable';
import Celltable from './Celltable';
import SelectCondition from './SelectCondition';
import SelectDropDown from './SelectDropDown';
import './Table.css';

const filterPlanet = (e, dataPlanet, data) => {
  const planet = e.target.value;
  dataPlanet(planet, data);
};

class Table extends Component {

  componentDidMount() {
    const { dataAPI } = this.props;
    dataAPI();
  }

  render() {
    const { onLoad, data, dataPlanet } = this.props;
    if (!onLoad) return <p>Loading...</p>;
    return (
      <div>
        <input type="text" onChange={(e) => filterPlanet(e, dataPlanet, data)} />
        <SelectDropDown />
        <SelectCondition />
        <input type="number" onChange={(e) => console.log(e.target.value)}/>
        <div>StarWars DataTable with Filters</div>
        <table>
          <HeadTable />
          <Celltable />
        </table>
      </div>
    );
  }
}

const mapStateToProps = ({ loadReducer: { data, onLoad } }) => ({ data, onLoad });

const mapDispatchToProps = (dispatch) => ({
  dataAPI: () => dispatch(resultAPI()),
  dataPlanet: (planet, data) => dispatch(planetAction(planet, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);

Table.propTypes = {
  dataAPI: PropTypes.func.isRequired,
  dataPlanet: PropTypes.func.isRequired,
  onLoad: PropTypes.bool.isRequired,
  data: PropTypes.instanceOf(Object).isRequired,
};

Table.defaultProps = {
  data: [],
};
