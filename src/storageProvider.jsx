import cookie from 'js-cookie';

const ACCESS_TOKEN_KEY = 'accessToken';

export const setTokens = (tokens) => {
  cookie.set(ACCESS_TOKEN_KEY, tokens.token, {
    expires: tokens.expires_in / 1440,
  });
};

export const getTokens = () => {
  const parsedTokens = {};
  try {
    const accessToken = cookie.get(ACCESS_TOKEN_KEY);

    if (accessToken) {
      parsedTokens.accessToken = accessToken;
    }

  } catch (err) {
  } finally {
    // eslint-disable-next-line no-unsafe-finally
    return parsedTokens;
  }
};

export const deleteTokens = () => {
  cookie.remove(ACCESS_TOKEN_KEY);

};
