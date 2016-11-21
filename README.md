# Ionic-playground

Some tests made to learn Ionic (and Cordova)

Everything from Jun 2015


## Dependences:

* Nodejs (npm)
* Cordova
* Ionic
* Bower
* Gulp


## Quick Start

* Install Nodejs from homebrew (OSX)
```sh
# You can use their installer from their website (https://nodejs.org/download/)
# Or with Homebrew installed
$ brew install node
```

* Install other dependencies
```sh
# On windows, just remove "sudo"
# This will install cordova, ionic, bower and gulp globally
$ sudo npm install -g cordova ionic bower gulp
```

* Build the project and run
```sh
# If necessary, "ionic add platform <android/ios>"
$ ionic add platform android

# This will compile everything and build an .apk
$ ionic build android

# This will compile everything if out-to-date and run on an android device
# But if there is no android device connected to deploy, then ionic will run on emulator
$ ionic run android
```

* Test locally
```sh
$ ionic serve
```


## Thanks
Leonardo Guidolin   
- @leonardoguidolin
