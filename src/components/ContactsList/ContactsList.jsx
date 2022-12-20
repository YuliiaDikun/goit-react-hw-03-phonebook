import PropTypes from 'prop-types';
import {
  Title,
  List,
  Item,
  Contact,
  Button,
  Warning,
} from './ContactsList.styled';

export const ContactsList = ({ contacts, deleteContact }) => {
  return (
    <>
      <Title>Contacts 📃</Title>
      {contacts.length ? (
        <List>
          {contacts.map(({ id, name, number }) => {
            return (
              <Item key={id}>
                <Contact>
                  {name} {number}
                </Contact>

                <Button onClick={() => deleteContact(id)} type="button">
                  ❌
                </Button>
              </Item>
            );
          })}
        </List>
      ) : (
        <Warning>No results...</Warning>
      )}
    </>
  );
};

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.string),
  deleteContact: PropTypes.func,
};
