import readline from "node:readline";
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const notes = [];

function showMenu() {
  console.log("1: Add Notes");
  console.log("2: View Notes");
  console.log("3: Delete Note");
  console.log("4: Search Notes");
  console.log("5: Exit");
  rl.question("Choose an option:", handleInput);
}

function findNotes(term) {
  const query = term.trim().toLowerCase();
  if (!query) return [];
  return notes
    .map((note, index) => ({ id: index + 1, note }))
    .filter(({ note }) => note.toLowerCase().includes(query));
}

function handleInput(input) {
  const option = input.trim();

  if (option === "1") {
    rl.question("\nEnter Note:", (note) => {
      notes.push(note);
      console.log("Note", note);
      showMenu();
    });
  } else if (option === "2") {
    console.log("\n Created Notes:");
    if (notes.length <= 0) {
      console.log("\n No Notes Yet,Add Notes.");
      return showMenu();
    }
    notes.forEach((note, index) => {
      console.log(`${index + 1}:${note}`);
    });
    showMenu();
  } else if (option === "3") {
    rl.question("Enter Note ID: ", (note) => {
      const id = note.trim();
      if (!id || notes.length <= 0 || id > notes.length) {
        console.log("\n Invaild id");
        return showMenu();
      }
      const deleted = notes.splice(Number(id) - 1, 1);
      console.log("Deleted ", deleted);

      showMenu();
    });
  } else if (option === "4") {
    rl.question("\nSearch Notes: ", (term) => {
      if (!term.trim()) {
        console.log("\n Enter something to search for.");
        return showMenu();
      }
      const matches = findNotes(term);
      if (matches.length <= 0) {
        console.log(`\n No notes found for "${term.trim()}".`);
        return showMenu();
      }
      console.log(`\n Found ${matches.length} matching note(s):`);
      matches.forEach(({ id, note }) => {
        console.log(`${id}:${note}`);
      });
      showMenu();
    });
  } else if (option === "5") {
    console.log("Thanks for using Notes App");
    rl.close();
  } else {
    console.log("Incorrect Input");
    showMenu();
  }
}

showMenu();