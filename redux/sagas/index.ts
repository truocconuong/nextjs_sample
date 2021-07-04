import { all } from 'redux-saga/effects';
import progressSaga from './progress';

export default function* rootSaga() {
  yield all([progressSaga()])
}
