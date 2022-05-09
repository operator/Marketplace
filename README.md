## Marketplace by Operator
| Build your very own marketplace app, powered by the new Operator e-commerce protocol.

The Marketplace by Operator is a production-ready application that you can use to jump-start your own e-commerce app development.


- 10,000+ products available to sell
- Your favorite brands
- Discover products from trusted brands
- Easily checkout through a merchants existing store.
- Built on top of the [Operator Protocol](https://operator.com)


The Marketplace is built using the Operator Open Product API. A public database powered by the blockchain that lets anyone view product information and earn rewards for affiliate sales.


# Getting Started with The Marketplace App

1.Clone the app from the git repository

2.Copy the .env.example file to .env and change the REACT_APP_API_TOKEN value to your personal user token. Then delete the .env.example file

3.Run npm install on your command line

4.For development, run npm start

5.For production, run npm build

6.When deploying to hosting service: set two config variables for the hosting site to match the one in your .env folder with REACT_APP_API_TOKEN equaling your user token, and REACT_APP_API_BASE_URL=https://operator-node-app-32192-prod.herokuapp.com/

7.If deployling to Heroku, set the buildpack to this react buildpack https://github.com/mars/create-react-app-buildpack
