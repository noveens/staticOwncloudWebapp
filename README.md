This is a sample text-file saving and retreiving static web app which uses the package `js-owncloud-client`<br>
Link To Library: http://www.github.com/noveens/js-owncloud-client/ 

## Dependencies:
1. Bower (For downloading `js-owncloud-client`)<br>
   To Install Bower: `$ sudo npm i -g bower`

## Steps to install:
1. `$ bower intall js-owncloud-client`
2. At the owncloud instance you want to communicate with, pull the latest master
3. Login to the OC instance, Go to settings -> Personal -> Security -> Add domain
4. Add the domain name of the virtual host / localhost you'll be cloning this into (Don't forget to add "http://")
5. Open localhost or the virtual host, and voila.

## Features:
1. The whole webpage is static.
2. The "index.html" will show you all the files at your instance.
3. Each file is clickable, and when clicked shows the file contents.
4. Blue cards are folders, which on cllicking will go to that directory.
5. The New File Button at the top right also pops up a text editor to save a file at your OC instance.
