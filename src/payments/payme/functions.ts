export default async function getPaymeHeaders() {
  const authHeaders = new Headers();
  authHeaders.append('Content-Type', 'application/json');
  authHeaders.append('X-Auth', process.env.PAYME_ID);

  return authHeaders;
}
