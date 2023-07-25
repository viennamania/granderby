// helpers/getServerSideProps.js

import { authFromServer } from '@/utils/services/useAuth';
import { GetServerSidePropsContext } from 'next';

export default async function myGetServerSideProps(
  context: GetServerSidePropsContext
) {
  const { req, res } = context;
  const { token } = req.cookies;

  console.log('API_URL', process.env.API_URL);

  const settingsResponse = await fetch(process.env.API_URL + `/api/settings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      method: 'get',
    }),
  });

  ////console.log("settingsResponse", settingsResponse);

  const settings = await settingsResponse.json();

  if (token) {
    const hasToken = await authFromServer(token);

    if (hasToken) {
      const { _id: id } = await authFromServer(token);

      const response = await fetch(
        process.env.API_URL + `/api/user?method=getOne`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            _id: id,
          }),
        }
      );
      const data = await response.json();
      if (data.status) {
        return {
          user: data.user,
          settings: settings.settings[0],
        };
      }
    } else {
      return {
        user: null,
        settings: settings.settings[0],
      };
    }
  } else {
    return {
      user: null,
      settings: settings.settings[0],
    };
  }
}
