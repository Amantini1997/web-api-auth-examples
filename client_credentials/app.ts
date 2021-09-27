/**
 * This is an example of a basic node.js script that performs
 * the Client Credentials oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#client_credentials_flow
 */
import { Errback, Response } from 'express';

const request = require('request'); // "Request" library

const client_id = process.env.CLIENT_ID; // Your client id
const client_secret = process.env.CLIENT_SECRET; // Your secret

// your application requests authorization
const authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

request.post(authOptions, (err: Errback, res: Response, body: any) => {
  if (!err && res.statusCode === 200) {

    // use the access token to access the Spotify Web API
    const token = body.access_token;
    const options = {
      url: 'https://api.spotify.com/v1/users/jmperezperez',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      json: true
    };
    request.get(options, (err: Errback, res: Response, body: any) => console.log(body));
  }
});
