import { Component } from 'react';

import { ThemeProvider } from 'styled-components';
import { GlobalStyleComponent } from 'styles/GlobalStyles';
import { theme } from 'styles/theme';

import { Container } from './Container/Container.styled';
import { Title } from './Title/Title';
import { LoginForm } from './Form/Form';
import { ContactsList } from './ContactsList/ContactsList';
import { InputSearch } from './InputSearch/InputSearch';
export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };
  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('component did update');
    console.log(prevProps);
    console.log(prevState);
    console.log(this.state);
    if (prevState.contacts !== this.setState.contacts) {
      console.log('contacts update');
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }
  addContact = newContact => {
    const isInList = this.state.contacts.some(
      contact => contact.name === newContact.name
    );
    if (isInList) {
      alert('Already in list!');
      return;
    }
    this.setState(({ contacts }) => ({
      contacts: [...contacts, newContact],
    }));
  };
  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };
  filterContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact => contact.name.includes(filter));
  };
  render() {
    const contactsToMarkUp = this.filterContacts();
    return (
      <ThemeProvider theme={theme}>
        <Container>
          <Title />
          <LoginForm onAddContact={this.addContact} />

          <InputSearch
            onChange={e => this.setState({ filter: e.target.value })}
          />
          <ContactsList
            contacts={contactsToMarkUp}
            deleteContact={this.deleteContact}
          />
        </Container>

        <GlobalStyleComponent />
      </ThemeProvider>
    );
  }
}
