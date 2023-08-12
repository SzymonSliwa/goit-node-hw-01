const fs = require("node:fs").promises;
const path = require("node:path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve(__dirname, "./db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = await JSON.parse(data);
    return contacts;
  } catch (err) {
    console.log(`"Error reading file:", ${err.message}`);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contactById = await contacts.find(({ id }) => id === contactId);
    return contactById;
  } catch (err) {
    console.log(
      `There is no contact with id ${contactId} in database, ${err.message}`
    );
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const updatedContacts = await contacts.filter(
      (contact) => contact.id !== contactId
    );
    await fs.writeFile(
      contactsPath,
      JSON.stringify(updatedContacts, null, 2),
      "utf8"
    );
    console.log(`Contact with the given id: ${contactId} has been deleted`);
    return updatedContacts;
  } catch (err) {
    console.log(
      `There is no contact with id ${contactId} in database, ${err.message}`
    );
  }
}

async function addContact(name, email, phone) {
  try {
    const contactsList = await listContacts();
    const newContact = { id: nanoid(), name: name, email: email, phone: phone };
    const updatedContacts = [...contactsList, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));

    return updatedContacts;
  } catch (err) {
    console.log(
      `Unable to add contact with id ${contactId} to database, ${err.message}`
    );
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
