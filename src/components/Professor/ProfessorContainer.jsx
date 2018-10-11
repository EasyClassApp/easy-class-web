/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CSSModules from 'react-css-modules';
import Authentication from '../shared/Authentication';
import styles from '../../../styles/custom/User/user-container.sass';
import { fetchProfessor, validateProfessor } from '../../actions';

class ProfessorContainer extends Component {
  componentWillMount() {
    this.props.fetchProfessor(this.props.match.params.id);
    console.log(this.props);
    console.log(this.props.match.params.id);
  }

  constructor(props) {
    super(props);

    this.enviarRevisao = this.enviarRevisao.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
        nome: false,
        email: false,
        endereco: false,
        lattes: false,
        diploma: false,
        biografia: false,
        dataNascimento: false
    };
  }

  handleChange(event) {
    const target = event.target;
    this.setState({
      [target.name]: target.checked
    })
  }

  enviarRevisao() {
    let camposInvalidos = [];
    let revisado = true;
    for (let key in this.state) {
      if (!this.state[key]) {
        camposInvalidos.push(key)
        revisado = false;
      }
    }
    let professor = this.props.professor;

    if(!revisado) {
      alert("Professor ainda tem campos a serem revisados. Escreva um e-mail para o professor para notificá-lo.");
    } else {
      alert("Cadastro revisado. O professor " + professor.nome + " poderá acessar o aplicativo normalmente.");
    }

    professor.camposInvalidos = camposInvalidos;
    professor.revisado = revisado;
    this.props.validateProfessor(professor);
  }

  render() {
    const checkboxStyle = {
      marginLeft: 20,
      marginRight: 10,
    };

    const buttonMargin = {
      margin: 10,
    };

    function CheckboxRevisado(name, object) {
      return (
        <span>
          <input type="checkbox" style={checkboxStyle} name={name} checked={object.state.value} onChange={object.handleChange}/>
          <label id={name} className="checkbox" htmlFor={name}>Revisado</label>
        </span>
      );
    }
    let { professor } = this.props;
    console.log("Professor");
    console.log(professor);
    return (
      <div>
        <div styleName="container">
          <div styleName="title">Professor</div>
          <h5>Nome</h5>
          <input type="text" value={professor.nome} /> {CheckboxRevisado('nome', this)}
          <h5>Email</h5>
          <input type="text" value={professor.email} /> {CheckboxRevisado('email', this)}
          <h5>Endereço</h5>
          <input type="text" value={professor.endereco} /> {CheckboxRevisado('endereco', this)}
          <h5>Lattes</h5>
          <input type="text" value={professor.lattes} /> {CheckboxRevisado('lattes', this)}
          <h5>Diploma</h5>
          <input type="text" value={professor.diploma} /> {CheckboxRevisado('diploma', this)}
          <h5>Biografia</h5>
          <input type="text" value={professor.biografia} /> {CheckboxRevisado('biografia', this)}
          <h5>Data Nascimento</h5>
          <input type="date" value={professor.dataNascimento}/> {CheckboxRevisado('dataNascimento', this)}
        </div>
        <div>
          <button className="button is-success" style={buttonMargin} onClick={this.enviarRevisao}>Enviar Revisão</button>
        </div>
      </div>
    );
  }
}

ProfessorContainer.propTypes = {
  validateProfessor: PropTypes.func.isRequired,
  fetchProfessor: PropTypes.func.isRequired,
  professor: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => bindActionCreators({ fetchProfessor, validateProfessor }, dispatch);
const mapStateToProps = ({ professorData }) => ({ professor: professorData.professor });

export const styledComponent = CSSModules(ProfessorContainer, styles, { allowMultiple: true });
const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(styledComponent);
export default Authentication(connectedComponent);
