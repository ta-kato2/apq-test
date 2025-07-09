import { gql } from '@apollo/client';

export const GET_ALL_USERS = gql`
  query GetAllUsers($name: String) {
    users(name: $name) {
      id
      name
      email
      age
    }
  }
`;

export const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
      age
    }
  }
`;

export const GET_ALL_PRODUCTS = gql`
  query GetAllProducts($name: String) {
    products(name: $name) {
      id
      name
      price
      description
      inStock
    }
  }
`;

export const GET_PRODUCT = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
      id
      name
      price
      description
      inStock
    }
  }
`;

export const GET_COMBINED_DATA = gql`
  query GetCombinedData($userName: String, $productName: String) {
    users(name: $userName) {
      id
      name
      email
    }
    products(name: $productName) {
      id
      name
      price
      inStock
    }
  }
`;