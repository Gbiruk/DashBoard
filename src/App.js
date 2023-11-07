import { Space } from "antd";
import "./App.css";
import { ApolloProvider } from '@apollo/client';
import { InMemoryCache, createHttpLink } from '@apollo/client';
import { ApolloClient } from '@apollo/client';
import React from "react";
import { addSignUp } from './quires.js/quireis';
import AppFooter from "./Components/AppFooter";
import AppHeader from "./Components/AppHeader";
import PageContent from "./Components/PageContent";
import SideMenu from "./Components/SideMenu";
const httpLink = createHttpLink({
  uri: 'http://localhost:4000/', // Your Node.js server GraphQL endpoint
  credentials: 'include',
});

// Create an Apollo Client with an authorization header
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {
        username: '',
        password: '',
        phone: '',
        email: '',
      },
      isLoggedIn: false,
      isFormClicked: false,
    };

    this.client = new ApolloClient({
      uri: 'http://localhost:4000',
      cache: new InMemoryCache(),
    });
    this.submitForm = this.submitForm.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }


  handleInputChange = (e, fieldName) => {
    const { formData } = this.state;
    const updatedFormData = { ...formData, [fieldName]: e.target.value };
    this.setState({ formData: updatedFormData });
  };


  async submitForm(e) {
    e.preventDefault();
    const { formData } = this.state;
  
    try {
      const result = await this.client.mutate({
        mutation: addSignUp,
        variables: {
          username: formData.username,
          password: formData.password,
          phone: formData.phone,
          email: formData.email,
        },
      });
  console.log('Mutation result:', result);
      if (result.errors) {
        console.error('GraphQL errors:', result.errors);
      }
  
      if (result.networkError) {
        console.error('Network error:', result.networkError);
      }
    } catch (error) {
      console.error('Error adding user:', error.message);
    }
  }
  

  handleLogin = () => {
    // Simulate login logic, setLoggedIn(true) when login is successful
    this.setState({ isLoggedIn: true });
  };

  handleFormClick = () => {
    // Toggle isFormClicked and reset isLoggedIn to false when switching from SignUp to Login form
    this.setState((prevState) => ({
      isFormClicked: !prevState.isFormClicked,
      isLoggedIn: false,
    }));
  };
  
    render() {
      const { isLoggedIn, isFormClicked } = this.state;
  
      return (
        <ApolloProvider client={client}>
        <div className="App">

          <AppHeader />
          <SideMenu></SideMenu>
          {isLoggedIn ? (
            <>
              <div className="SideMenuAndPageContent">
                <SideMenu></SideMenu>
                <PageContent></PageContent>
              </div>
              <AppFooter />
            </>
          ) : (
            <div className="login-container">
              {isFormClicked ? (
                <div className="forms">
               
                  <form className='formSubmited' onSubmit={this.submitForm}>
       <div>
          <label htmlFor='username'>Username</label>
          <input type='text' onChange={(e) => this.handleInputChange(e, 'username')} placeholder='enter the username' name='username' className='username'></input>
        </div>
         <div>
          <label htmlFor='password'>Password</label>
          <input type='text'onChange={(e) => this.handleInputChange(e, 'password')} placeholder='enter the password' name='password'></input>
          </div>
          <div>
          <label htmlFor='phone'>phone</label>
          <input type='text'onChange={(e) => this.handleInputChange(e, 'phone')} placeholder='enter the Phone' name='phone'></input>
          </div>
          <div>
          <label htmlFor='email'>email</label>
          <input type='text'onChange={(e) => this.handleInputChange(e, 'email')} placeholder='enter the password' name='email'></input>
          </div>
          <div className='formbtn'>
            <button type="submit" className='btn1'> Login</button>
            <button onClick={this.handleFormClick} className='btn2' type='submit'>SignUp</button>
          </div>
         
        </form>
      
       
        </div>
      ) : (
        <div className="forms">
        <form className='formSubmited'>
          <div>
          <label htmlFor='username'>Username</label>
          <input type='text' placeholder='enter the username' name='username' className='username'></input>
          </div>
          <div>
          <label htmlFor='password'>Password</label>
          <input type='text' placeholder='enter the password' name='email'></input>
          </div>
          <div className='formbtn'>
            <button onClick={this.handleLogin} className='btn1'>Login</button>
            <button onClick={this.handleFormClick} className='btn2'>SignUp</button>
          </div>
       
        </form>
        </div>
      )}
    </div>
  )}

  <AppFooter />
</div>
</ApolloProvider>
  );
}
}

export default App;