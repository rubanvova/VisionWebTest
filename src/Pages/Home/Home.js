/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

const User = ({ email, name, surname }) => (
  <div>
    <div>{name}</div>
    <div>{surname}</div>
    <div>{email}</div>
  </div>
);

const Home = (props) => {
  React.useEffect(() => {
    props.loadData();
  }, []);

  const { user } = props;

  return (
    <div>
      <div>home</div>
      <button onClick={props.logout}>Logout</button>
      {user ? <User {...user} /> : null}
    </div>
  );
};

export default Home;
