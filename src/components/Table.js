import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPlanets } from '../store/actions';
import './Table.css';

class Table extends Component {
  componentDidMount() {
    const { callFetchPlanets } = this.props;
    callFetchPlanets();
    console.log(this.props);
  }

  tableHead() {
    const { data } = this.props;
    console.log(data);
    return (
      <thead>
        <tr>
          {
            Object.keys(data[0] || []).map((header) => ((header !== 'residents')
              ? <th className="tableHeader" key={header}>{header}</th>
              : null))
          }
        </tr>
      </thead>
    );
  }

  tableData() {
    const { data } = this.props;
    return (
      data.map((info) => (
        <tbody key={info.name}>
          <tr>
            {Object.values(info).map((body, idx) => {
              if (idx !== 9) {
                return (
                  <td className="tableData" key={body}>{body}</td>
                );
              }
              return null;
            })}
          </tr>
        </tbody>
      )));
  }

  render() {
    const { isFetching } = this.props;
    if (isFetching) return <div><h1 className="title">Loading...</h1></div>;
    return (
      <div>
        <h1 className="title">StarWars Datatable with Filters</h1>
        <table className="containerTable">
          {this.tableHead()}
          {this.tableData()}
        </table>
      </div>
    );
  }
}

const mapStateToProps = ({
  reducerPlanets: {
    data, isFetching,
  },
}) => (
  {
    data, isFetching,
  }
);

const mapDispatchToProps = (dispatch) => ({
  callFetchPlanets: () => dispatch(fetchPlanets()),
});

Table.propTypes = {
  callFetchPlanets: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  data: PropTypes.instanceOf(Array),
};

Table.defaultProps = {
  data: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
