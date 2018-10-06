/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CSSModules from 'react-css-modules';
import { Link } from 'react-router-dom';
import Authentication from '../shared/Authentication';
import styles from '../../../styles/custom/TeacherApproval/teacher-approval-container.sass';
import { fetchProfessorList } from '../../actions';

class AprovacaoProfessorContainer extends Component {
  componentWillMount() {
    this.props.fetchProfessorList();
  }

  render() {
    function urlProfessor(id) {
      return `/aprovacao-professor/${id}`;
    }

    function professorBotao(professor) {
      return <Link to={urlProfessor(professor._id)} className="btn btn-primary">Revisar Cadastro</Link>;
    }

    let { professorList } = this.props;
    professorList = professorList.filter(professor => (!professor.revisado));
    return (
      <div styleName="container">
        <div styleName="title">Aprovação de Professores</div>
        <table styleName="table">
          <tbody>
            <tr>
              <th>Nome do Professor</th>
              <th>Email do Professor</th>
              <th>Ação</th>
            </tr>
            {professorList.map(professor => <tr key={professor._id}><td>{professor.nome}</td><td>{professor.email}</td><td>{professorBotao(professor)}</td></tr>)}
          </tbody>
        </table>
      </div>
    );
  }
}

AprovacaoProfessorContainer.propTypes = {
  fetchProfessorList: PropTypes.func.isRequired,
  professorList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators({ fetchProfessorList }, dispatch);
const mapStateToProps = ({ professoresData }) => ({ professorList: professoresData.professores });

export const styledComponent = CSSModules(AprovacaoProfessorContainer, styles, { allowMultiple: true });
const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(styledComponent);
export default Authentication(connectedComponent);

