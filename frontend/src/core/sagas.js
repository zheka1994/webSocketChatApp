// saga watcher - нужен для слежения за actions при выполнении action выполняется определенное действие
// saga worker описывпется бизнес логика приложений (работа с асинхронным кодом)
// saga effects - вспомогательные функции, которые создают объекты, внутри которых описаны тнструкции выполнения каких то действий (выполняются непосредственно внутри саги)
// эффект take срабатывает один раз при запуске action, эффект takeEvery срабатывает каждый раз при выполнении action
// эффект takeLatest - осуществляет вызов только последней переданной функции, takeLeading - вызывает только первую сагу, отменив вызов последующих, если первая находится в процессе выполнения
// эффект select - вызов store прямо в саге
// эффект put делает dispatch данных в хранилище
// эффект call позволяет передать функцию (для мока) и дальнейшие параметры в нее другими аргументами
// блокирующие эффеты take и call
// fork - параллелизм в сагах

import { all } from 'redux-saga/effects';
import loginPageWatcher from '../pages/loginPage/loginPageWatcher';
import chatPageWatcher from '../pages/chatPage/chatPageWatcher';


export default function* appSaga() {
    yield all([
        ...loginPageWatcher,
        ...chatPageWatcher
    ]);
}