import React, { Component } from 'react';
import { connect } from 'react-redux';

function acertaTitulo(aaa) {
  const palavras = aaa.split('_');
  const palavrasCapitalizadas = palavras.map(palavra => `${palavra[0].toUpperCase()}${palavra.substr(1)}`);
  const titulo = palavrasCapitalizadas.join(' ');
  return titulo;
}

class Table extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data } = this.props;
    const keysPlanet = Object.keys(data[0]);
    const indexResidents = keysPlanet.indexOf('residents');
    const keysTable = keysPlanet.slice(0, indexResidents).concat(keysPlanet.slice(indexResidents + 1));
    return (
      <div>
        <h1>StarWars Datatable with Filters</h1>
        <table>
          <tr>
            {keysTable.map(key => <th>{acertaTitulo(key)}</th>)}
          </tr>
          {data.map((planet) => {
            const valuesPlanet = Object.values(planet);
            const valuesTable = valuesPlanet.slice(0, indexResidents).concat(valuesPlanet.slice(indexResidents + 1));
            return (
              <tr>
                {valuesTable.map(value => {
                  if (Array.isArray(value)) {
                  return <td>{value.map(item => <div>{item}</div>)}</td>;
                  }
                  return <td>{value}</td>;
                })}
              </tr>
            );
          })}
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps)(Table);
