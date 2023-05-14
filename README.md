This CLI allows to list tasks, add tasks and automatically sorts them based on preference of the User.
Some features of the CLI- 
1. The tasks given are ordered based on the deadline. The task with the nearest deadline is shown first and so on.
2. The tasks's deadline may be given in two forms. Either number of days remaining or the absolute date of the deadline.

Steps to set up -
1. Clone this repo.
2. Run npm install and make sure you have node installed.
3. If you are using zsh terminal, open it and add tman --op list at the end to see the tasks everytime u open ur terminal.
4. Setup  a cronejob for it automatically reduce the deadlines at a specific time.


Steps to setup a crone job :
1. Open terminal, run cronetab -e
2. Enter the following: 00 24 * * * <output to which node> <path to reduceDeadline.js>.
3. This will set the deadlines to be reduced at 12 am in the morning.
