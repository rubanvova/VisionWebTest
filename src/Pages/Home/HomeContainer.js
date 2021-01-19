import { connect } from 'react-redux';
import Home from './Home';
import { ACTION_LOAD_DATA, CLEAR_STORE } from '../../reducer';

import client, { URL_USER_DATA } from '../../client';
import { KEY_CLINET_ID, ROUTE_LOGIN } from '../../constants';

const mapStateToProps = (state) => ({ user: state.user });

const actionLoadData = (props) => {
  return async (dispatch) => {
    const client_id = localStorage.getItem(KEY_CLINET_ID);
    const { data } = await client
      .get(`${URL_USER_DATA}/${client_id}/`)
      .catch((err) => {
        console.log(err);
        dispatch({ type: CLEAR_STORE });
        props.history.push(ROUTE_LOGIN);
      });
    return dispatch({ type: ACTION_LOAD_DATA, payload: { user: data } });
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  logout: () => {
    dispatch({ type: CLEAR_STORE });
    ownProps.history.push(ROUTE_LOGIN);
  },
  loadData: () => dispatch(actionLoadData(ownProps)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
