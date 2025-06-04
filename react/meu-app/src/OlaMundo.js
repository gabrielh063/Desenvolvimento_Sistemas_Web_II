import React from 'react';

export default class OlaMundo extends React.Component {
  render() {
    return (
      <div>
        <h1>Olá, Mundo! {this.props.nome}</h1>
        
      </div>
    );
  }
}   