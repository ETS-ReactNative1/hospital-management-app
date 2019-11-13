import AppConst from 'src/AppConst';
import AppData from 'src/AppData';
import { ME } from 'src/utils/graphqlQueries';
import cacheImage from 'src/utils/cacheImage';

export default async () => {
  try {
    const data = await fetch(`${AppConst.SERVER_URL}/graphql`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${AppData.accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: ME.loc.source.body
      })
    });
    const {
      data: { me }
    } = await data.json();
    if (me.avatar) {
      me.avatar = await cacheImage(me.avatar);
    }
    return me;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};
