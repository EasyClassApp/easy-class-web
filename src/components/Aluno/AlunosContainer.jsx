import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CSSModules from 'react-css-modules';
import Authentication from '../shared/Authentication';
import styles from '../../../styles/custom/User/user-container.sass';
import { fetchAlunoList } from '../../actions';

class AlunosContainer extends Component {
  componentWillMount() {
    this.props.fetchAlunoList();
  }

  render() {
    const { alunoList } = this.props;
    return (
      <div styleName="container">
        <div styleName="title">Alunos</div>
        <table styleName="table">
          <tbody>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Responsável</th>
              <th>Matéria de maior dificuldade</th>
            </tr>
            {alunoList.map(aluno => <tr key={aluno._id}><td>{aluno.nome}</td><td>{aluno.email}</td><td>{ aluno.responsavel ? 'Responsável' : 'Não Responsável' }</td><td>{ aluno.materiaDificuldade ? aluno.materiaDificuldade.nome : 'nenhuma' }</td></tr>)}
          </tbody>
        </table>
      </div>
    );
  }
}

AlunosContainer.propTypes = {
  fetchAlunoList: PropTypes.func.isRequired,
  alunoList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators({ fetchAlunoList }, dispatch);
const mapStateToProps = ({ alunosData }) => ({ alunoList: alunosData.alunos });

export const styledComponent = CSSModules(AlunosContainer, styles, { allowMultiple: true });
const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(styledComponent);
export default Authentication(connectedComponent);
