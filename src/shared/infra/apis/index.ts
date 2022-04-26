import axios from 'axios';

const apiRiotBr1 = axios.create({
  baseURL: process.env.URL_RIOT_BR1,
  headers: { 'X-Riot-Token': String(process.env.X_Riot_Token) },
});

const apiRiotAmericas = axios.create({
  baseURL: process.env.URL_RIOT_AMERICAS,
  headers: { 'X-Riot-Token': String(process.env.X_Riot_Token) },
});

export { apiRiotBr1, apiRiotAmericas };
