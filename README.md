 Notes CLI

A small command-line notes app built with Node.js. It runs in your terminal, shows a numbered
menu, and lets you add notes, view them, delete them by ID, and search through them.

Notes are held in memory for the current session only — nothing is written to disk, so when you
exit the app the notes are gone.

Requirements

- Node.js 18 or newer (uses ES modules and the built-in `node:readline` module)
- No third-party dependencies, so there is nothing to install

Running the app

From the project folder:

bash
node notes.js


You will see the menu:

1: Add Notes
2: View Notes
3: Delete Note
4: Search Notes
5: Exit
Choose an option:


Type the number of the option and press Enter.

Menu options

| `1` | Add Notes | Prompts `Enter Note:` and stores the text you type. |
| `2` | View Notes | Lists every note as `id:note`. If there are none, it says `No Notes Yet,Add Notes.` |
| `3` | Delete Note | Prompts `Enter Note ID:`, removes the note with that ID, and echoes what was deleted. |
| `4` | Search Notes | Prompts `Search Notes:` and lists every note containing that text. |
| `5` | Exit | Closes the app. |
| anything else | — | Prints `Incorrect Input` and shows the menu again. |

Every option except Exit returns to the menu, so you can keep working without restarting.

Example session

Choose an option: 1
Enter Note: buy milk
Note buy milk
Choose an option: 1
Enter Note: Call mom
Note Call mom
Choose an option: 2

 Created Notes:
1:buy milk
2:Call mom
Choose an option: 4

Search Notes: MILK

 Found 1 matching note(s):
1:buy milk
Choose an option: 3
Enter Note ID: 2
Deleted  [ 'Call mom' ]
Choose an option: 5
Thanks for using Notes App

How IDs work

A note's ID is its position in the list, starting at `1` — the same numbers shown by View Notes.
IDs are recalculated every time you look at the list, so after deleting a note the ones below it
shift up:

1:buy milk
2:Call mom
3:Walk the dog

Deleting ID `2` leaves `buy milk` as `1` and `Walk the dog` as `2`. Always check the current list
before deleting if you are not sure of the ID.

How search works

Search matches note text in two ways:

-searching `MILK` finds `buy milk` because it is case i nsentitive
— a search term matches anywhere inside a note, so `milk` finds
  `buy milk on the way home`.

Results are printed in the same `id:note` format as View Notes, and the IDs shown are the ones
currently valid for Delete Note If nothing matches you will see:

 No notes found for "pizza".

An empty search (just pressing Enter) is rejected with `Enter something to search for.` instead of
listing everything.