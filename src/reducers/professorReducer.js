import { PROFESSOR_LIST_FETCHED, PROFESSOR_FETCHED } from '../actions/types';

const initialState = {
  professores: [],
  professor: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PROFESSOR_LIST_FETCHED: {
      return {
        ...state,
        professores: action.professores,
      };
    }
    case PROFESSOR_FETCHED: {
      return {
        ...state,
        professor: action.professor,
      };
    }

    default:
      return state;
  }
};
