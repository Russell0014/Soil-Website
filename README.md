<div align="center">
  <img src="client/public/logo.png" alt="Soil Logo" height="80px">
  <h1>SOIL</h1>
</div>

SOIL is a student-made website built with React. It's a place for users to learn about organic foods, getting diet tips & recipes. It's easy to use, with features like signing up, managing profiles, using a shopping cart, and diet planning.

# Main Features

- Landing Page: A welcoming first impression for users, providing an overview of the application.
- Diet Planner: Lets users create their own profile and gives them recipes depending on when chosen health goals.
- Garden Helper: A feature that provides users with a guide on organic gardening in their backyard, helping them grow their own organic vegetables.
- Specials: Showcases purchasable products with indicators for special offers.
- Profile: A personalized space for users to manage their account details and customize their diet plan.
- Login and Sign Up: Lets users create their own account or log into an existing one.
- Backend API

## Usage

1. Clone the repo.
2. Create `server/.env` file containing

3. Navigate into `s4018548-s4007180-a2/client` & `s4018548-s4007180-a2/server`
4. Install dependencies, `npm i`
5. Start the server, `npm start`

## .env File

Your `.env` file should look like this:

```md
URI=MYSQL_URI
```

## Tests

- To test the backend of the website, first follow the [Usage guide](#usage)

1. Once all set up navigate into `/server/tests`
2. Run `npm run test`

- How were the tests set up?

  - Using jest we implemented generic and some edge case requests and mocked what a generic and valid return would be

- For more detail regarding the individual unit tests:

  - Refer to `server/tests/cartTests.js` about the shopping cart features
  - Refer to `server/tests/reviewTests.js` about the review features

## Dependencies

- [React](https://reactjs.org/)
- [React-Bootstrap](https://react-bootstrap.github.io/)
- [React-Router-Dom](https://reactrouter.com/web/guides/quick-start)
- [React-Toastify](https://fkhadra.github.io/react-toastify/introduction/)
- [Sequelize](https://sequelize.org/)
- [Axios](https://axios-http.com/)
- [Express](https://expressjs.com/)
- [mySQL](https://www.mysql.com/)
- [Cors](https://www.npmjs.com/package/cors)

## Acknowledgements

- Icons from [Icons8](https://icons8.com/) & [heroicons](https://heroicons.com/)
- Images from [Unsplash](https://unsplash.com/)
- Logo made with [Logo Maker](https://logo.com/)

## Made by

- [Russell Sheikh](https://github.com/Russell0014)
- [Mark Castillo](https://github.com/2trill2code)
