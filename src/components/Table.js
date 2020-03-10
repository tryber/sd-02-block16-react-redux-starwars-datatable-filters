import React, { Component } from 'react';
import { connect } from 'react-redux';

class Table extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    setTimeout( () => console.log('state do render', this.props.data), 5000);
    return (
      <div>
        StarWars Datatable with Filters
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps)(Table);
