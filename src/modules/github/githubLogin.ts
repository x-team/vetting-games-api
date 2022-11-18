import axios from "axios";

export interface GithubLoginOAuthAccessTokenResponse {
  access_token: string;
  scope: string;
  token_type: string;
}

export interface GithubLoginOAuthAccessTokenResponseError {
  error: string;
  error_description: string;
  error_uri: string;
}

type Response =
  | GithubLoginOAuthAccessTokenResponse
  | GithubLoginOAuthAccessTokenResponseError;

export default async function githubLogin(
  code: string,
  redirectUrl?: string
): Promise<GithubLoginOAuthAccessTokenResponse> {
  try {
    const { data } = await axios.post<Response>(
      "https://github.com/login/oauth/access_token",
      {},
      {
        params: {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
          redirect_uri: redirectUrl,
        },
        headers: {
          Accept: "application/json",
        },
      }
    );

    if ("error" in data) {
      throw new Error(data.error_description);
    }

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
