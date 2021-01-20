import React, { ReactElement } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Header from '../components/ui/Header';

interface MatchParams {
  username: string;
}

const Profile = (props: RouteComponentProps<MatchParams>): ReactElement => {
  return (
    <div>
      <Header />
      {props.match.params.username}
    </div>
  );
};

export default Profile;
