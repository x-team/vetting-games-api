import axios from "axios";

export default async function githubUserEmails(
  accessToken: string
): Promise<Email[]> {
  return (
    await axios.get<Email[]>("https://api.github.com/user/emails", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  ).data;
}

export interface Email {
  email: string;
  primary: boolean;
  verified: boolean;
  visibility: string | null;
  [k: string]: unknown;
}
