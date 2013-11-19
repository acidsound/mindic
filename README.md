# mindic

minimalistic dictionay

## How to install
```
# If meteor and meteorite are already installed
cd /path/to/project/
mrt install
meteor
```

## demo
[mindic_dev](http://mindic.meteor.com) - hosting from meteor.com
### Features

* Comprehensible folder structure
* TDD / BDD with [laika](http://arunoda.github.io/laika/)
* Multi page apps with [iron-router](https://github.com/EventedMind/iron-router)
* A way to load fixtures (as of now no external packages used for that)
* meteor-boilerplate console tool, which helps on creating views, routes and so on


### Folder structure

```
client/ 				# Client folder
    compatibility/      # Libraries which create a global variable
    config/             # Configuration files (on the client)
	lib/                # Library files that get executed first
    routes/             # All routes(*)
    startup/            # Javascript files on Meteor.startup()
    stylesheets         # LESS files
    subscriptions/      # Collection subscriptions(*)
    modules/            # Meant for components, such as form and more(*)
	views/			    # Contains all views(*)
	    common/         # General purpose html templates
model/  				# Model files, for each Meteor.Collection(*)
private/                # Private files
public/                 # Public files
server/					# Server folder
    fixtures/           # Meteor.Collection fixtures defined
    lib/                # Server side library folder
    publications/       # Collection publications(*)
    startup/            # On server startup
tests/					# Test files, can be run with laika
meteor-boilerplate		# Command line tool
```

(*) = the command line tool creates files in these folders

### Packages used

* standard-app-packages
* preserve-inputs
* less
* jQuery
* underscore
* handlebar-helpers
* iron-router
* bootstrap 3
* accounts-password
* accounts-ui
* appcache (개발중엔 제거)
