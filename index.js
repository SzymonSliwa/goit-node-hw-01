const { Command } = require("commander");
const readline = require("readline");
const contacts = require("./contacts");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      console.time("listContacts");
      const listOfContacts = await contacts.listContacts();
      console.timeEnd("listContacts");
      console.table(listOfContacts);

      break;

    case "get":
      console.time("getContactById");
      const getContact = await contacts.getContactById(id);
      console.timeEnd("getContactById");
      console.table(getContact);

      break;

    case "add":
      console.time("addContact");
      const addContact = await contacts.addContact(name, email, phone);
      console.timeEnd("addContact");
      console.table(addContact);

      break;

    case "remove":
      console.time("removeContact");
      const removeContact = await contacts.removeContact(id);
      console.timeEnd("removeContact");
      console.table(removeContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
