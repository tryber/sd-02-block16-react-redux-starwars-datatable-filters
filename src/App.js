import React from 'react';
import { connect } from 'react-redux';
import Table from './components/Table';

class App extends React.Component {
  render() {
    const { isLoading, error } = this.props;
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    return (
      <div className="App">
        <header className="App-header">
          <Table />
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.data.isLoading,
  error: state.data.error,
});

export default connect(mapStateToProps)(App);
