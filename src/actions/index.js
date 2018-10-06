/* eslint-disable */
import axios from 'axios';
import history from '../history';
import * as actionTypes from './types';

const BASE_URL = `${SERVER_URL}/api`;

function mapErrorsFromResponse(errorResponse) {
  if (errorResponse && errorResponse.response && errorResponse.response.data && errorResponse.response.data.errors) {
    return Object.keys(errorResponse.response.data.errors).map(key => errorResponse.response.data.errors[key].msg);
  }

  return ['Ocorreu um erro'];
}

/* AUTH */
export function signIn(email, password) {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${BASE_URL}/signin`, { email, password });
      dispatch({ type: actionTypes.SIGNED_IN, auth: response.data });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('loggedInUser', JSON.stringify(response.data.user));

      history.push('/professores');
    } catch (error) {
      dispatch({ type: actionTypes.SIGNED_IN_ERROR, authErrors: mapErrorsFromResponse(error) });
    }
  };
}

export function signOut() {
  return (dispatch) => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');

    dispatch({ type: actionTypes.SECTION_SELECTED, selectedSection: undefined });
    dispatch({ type: actionTypes.SIGNED_OUT });
  };
}

export function clearAuthErrors() {
  return (dispatch) => {
    dispatch({ type: actionTypes.CLEAR_AUTH_ERRORS });
  };
}

/* USUARIO */
export function fetchUserList() {
  return async (dispatch) => {
    try {
      const responseAlunos = await axios.get(`${BASE_URL}/aluno`);
      const responseProfessores = await axios.get(`${BASE_URL}/professor`);
      const responseData = [...responseAlunos.data, ...responseProfessores.data];

      dispatch({ type: actionTypes.USER_LIST_FETCHED, users: responseData });
    } catch (error) {
      dispatch({ type: actionTypes.USER_LIST_FETCHED_ERROR, fetchedUsersErrors: mapErrorsFromResponse(error) });
    }
  };
}

/* ALUNO */
export function fetchAlunoList() {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${BASE_URL}/aluno`);
      dispatch({ type: actionTypes.ALUNO_LIST_FETCHED, alunos: response.data });
    } catch (error) {
      dispatch({ type: actionTypes.ALUNO_LIST_FETCHED_ERROR, fetchedAlunosErrors: mapErrorsFromResponse(error) });
    }
  };
}

/* PROFESSOR */
export function fetchProfessorList() {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${BASE_URL}/professor`);
      dispatch({ type: actionTypes.PROFESSOR_LIST_FETCHED, professores: response.data });
    } catch (error) {
      dispatch({ type: actionTypes.PROFESSOR_LIST_FETCHED_ERROR, fetchedProfessoresErrors: mapErrorsFromResponse(error) });
    }
  };
}

export function fetchProfessor(idProfessor) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${BASE_URL}/professor/${idProfessor}`);
      dispatch({ type: actionTypes.PROFESSOR_FETCHED, professor: response.data });
    } catch (error) {
      dispatch({ type: actionTypes.PROFESSOR_FETCHED_ERROR, fetchedProfessorErrors: mapErrorsFromResponse(error) });
    }
  };
}

export function validateProfessor(professor) {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${BASE_URL}/professor/validate`, professor)
      dispatch({ type: actionTypes.PROFESSOR_VALIDATE, validationResponse: response.data });

      history.push('/aprovacao-professor');
    } catch (error) {
      dispatch({ type: actionTypes.PROFESSOR_VALIDATE_ERROR, fetchedValidationErrors: mapErrorsFromResponse(error) });
    }
  }
}

/* UI */
export function setSelectedSection(selectedSection) {
  return (dispatch) => {
    dispatch({ type: actionTypes.SECTION_SELECTED, selectedSection });
    history.push(`/${selectedSection}`);
  };
}
