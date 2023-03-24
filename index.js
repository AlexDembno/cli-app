const {
  contactsPath,
  listContacts,
  getContactById,
  removeContact,
  addNewContact,
} = require("./contacts");

const { program } = require("commander");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await listContacts();
      return console.table(allContacts);

    case "get":
      const getContact = await getContactById(id);
      return console.table(getContact);

    case "add":
      const addContact = await addNewContact(name, email, phone);
      return console.table(addContact);

    case "remove":
      const deleteContact = await removeContact(id);
      return console.table(deleteContact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

program
  .option("--action, <type>")
  .option("--id, <type>")
  .option("--name, <type>")
  .option("--email, <type>")
  .option("--phone, <type>");

program.parse();

const options = program.opts();

invokeAction(options);
