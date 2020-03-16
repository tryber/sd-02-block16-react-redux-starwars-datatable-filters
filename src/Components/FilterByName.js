import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Button from './Button';
import './filterBy.css';

class FilterByName extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.list = React.createRef();
    this.dropdown = false;
  }

  componentDidMount() {
    this.drop();
    this.ref.current.addEventListener('click', () => {
      this.drop();
    });
  }

  drop() {
    this.dropdown = !this.dropdown;
    if (this.dropdown) {
      this.list.current.style.display = 'none';
    } else {
      this.list.current.style.display = 'flex';
    }
  }

  render() {
    const { filters, id } = this.props;
    const { name } = filters[id].numericValues;
    return (
      <div className="comp_filter">
        <div className="container">
          <i className="material-icons" ref={this.ref}>
            filter_list
          </i>
          <p>{name}</p>
        </div>
        <div className="list" ref={this.list}>
          <Button name="population" btn="population" id={id} />
          <Button name="orbital_period" btn="orbital period" id={id} />
          <Button name="diameter" btn="diameter" id={id} />
          <Button name="rotation_period" btn="rotation period" id={id} />
          <Button name="surface_water" btn="surface water" id={id} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  filters: state.filter.filters,
});

FilterByName.propTypes = {
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      numericValues: PropTypes.shape({
        name: PropTypes.string,
        condition: PropTypes.string,
        input: PropTypes.number,
      }).isRequired,
    }).isRequired,
  ),
  id: PropTypes.number.isRequired,
};

FilterByName.defaultProps = {
  filters: [
    {
      numericValues: {
        name: '',
        condition: '',
        input: undefined,
      },
    },
  ],
};

export default connect(mapStateToProps)(FilterByName);
