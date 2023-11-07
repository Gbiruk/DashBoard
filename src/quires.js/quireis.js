import { gql } from 'apollo-boost';

const addSignUp = gql`
  mutation($username: String!, $password: String!, $phone: String!, $email: String!) {
    addSignUp(
      username: $username
      password: $password
      phone: $phone
      email: $email
    ) {
      username
      password
      phone
      email
    }
  }
`


export {addSignUp };
