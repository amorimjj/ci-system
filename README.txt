To run it you yout need
	node
	gulp

To build this project, you’ll need run:
	npm install;
	bower install;

This application is started by:
	node --harmony ./server.js

Test using grulp+jasmin. You can run using:
	gulp specs; #Tests result are showing in console. It was made thinking to use in deploy’s script

Issues:
	Layout is broken in small screens;
	Chart wasn't implemented;
	Animations isn't smooth;
	Doesn't have project manager or selector;
	Doesn't have integration with source code repository;
	Backend doesn’t save data in mongodb, just in memory. Simple to change, but I prioritized what was required;
