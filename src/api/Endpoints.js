// Создаем конечные точки нашего запроса в виде констант
const Endpoints = {
  AUTH: {
    LOGIN: '/ru/data/v3/testmethods/docs/login',
    LOGOUT: '',
  },
  USERDOCS: {
    GET: '/ru/data/v3/testmethods/docs/userdocs/get',
    CREATE: 'ru/data/v3/testmethods/docs/userdocs/create',
    DELETE: '/ru/data/v3/testmethods/docs/userdocs/delete/',
    SET: 'ru/data/v3/testmethods/docs/userdocs/set/',
  },
};
export default Endpoints;
