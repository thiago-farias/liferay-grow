import ClayCard from '@clayui/card';
import ClayLayout from '@clayui/layout';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';

import AppContext from '@/AppContext';
import DropDown from '@/components/drop-down/DropDown';
import Header from '@/components/header';
import Sidebar from '@/components/sidebar';
import useLang from '@/hooks/useLang';
import { Me } from '@/types';

const defaultSteps = [
  {
    name: 'knowledge-areas',
    path: '/profile',
    pathDynamic: '/profile/:user',
    symbol: 'books',
  },
  {
    name: 'teams',
    path: '/profile/teams',
    pathDynamic: '/profile/:user/teams',
    symbol: 'users',
  },
];

type IProfileWrapper = {
  me: Me;
  steps?: Array<any>;
};

export const ProfileWrapper: React.FC<IProfileWrapper> = ({
  children,
  steps = defaultSteps,
  me,
}) => {
  const {
    profile: { avatar_url, location, name },
  } = me;

  const {
    state: {
      user: { loggedUser },
    },
  } = useContext(AppContext);

  const belongsToMe = me.id === loggedUser?.user?.id;

  const router = useRouter();
  const i18n = useLang();

  const login = router.query.login;

  const dynamicSteps = steps.map((step) => {
    if (login) {
      return {
        ...step,
        path: step.pathDynamic.replace(':user', login as string),
      };
    }

    return step;
  });

  const teamsName =
    me.growMap?.userDetails?.teams?.map(({ name }) => name) || [];

  return (
    <>
      <Header
        actions={
          me.growMap &&
          belongsToMe && [
            {
              action: () => router.push('/profile/office-details'),
              name: i18n.get('edit-profile'),
            },
          ]
        }
      >
        <Header.Avatar draggable={false} src={avatar_url} />
        <Header.Info>
          <Header.Title>{name}</Header.Title>
          {me?.growMap?.userDetails && (
            <>
              <p>
                {i18n.sub('x-of-x', [
                  me.growMap?.userDetails?.role?.name,
                  teamsName.join(', '),
                ])}
              </p>
              {me.growMap?.userDetails?.office ? (
                <p>{`${me.growMap?.userDetails.office.city} / ${me.growMap?.userDetails.office.country}`}</p>
              ) : (
                location
              )}
            </>
          )}
        </Header.Info>
      </Header>

      <ClayLayout.Row className="mt-4">
        <ClayLayout.Col size={3}>
          <ClayCard className="p-4">
            <Sidebar steps={dynamicSteps} />
          </ClayCard>
        </ClayLayout.Col>
        <ClayLayout.Col size={9}>
          <ClayCard className="p-4">{children}</ClayCard>
        </ClayLayout.Col>
      </ClayLayout.Row>
    </>
  );
};

export const Profile: React.FC<React.HTMLAttributes<HTMLElement>> = ({
  children,
}) => {
  return (
    <ClayLayout.ContainerFluid className="profile mt-4">
      {children}
    </ClayLayout.ContainerFluid>
  );
};

export default Profile;
