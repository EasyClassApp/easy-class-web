import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
import uiReducer from './uiReducer';
import professorReducer from './professorReducer';
import alunoReducer from './alunoReducer';

const rootReducer = combineReducers({
  authData: authReducer,
  usersData: userReducer,
  professoresData: professorReducer,
  professorData: professorReducer,
  alunosData: alunoReducer,
  uiData: uiReducer,
});

export default rootReducer;
