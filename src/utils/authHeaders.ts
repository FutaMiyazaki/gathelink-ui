import { parseCookies } from 'nookies'

type AuthHeaders = {
  'access-token': string
  client: string
  uid: string
}

export const authHeaders = (): AuthHeaders => {
  const cookie = parseCookies()
  const headers = {
    'access-token': cookie.accessToken,
    client: cookie.client,
    uid: cookie.uid,
  }

  return headers
}
