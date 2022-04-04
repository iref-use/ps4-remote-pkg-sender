# PS4 Remote PKG Sender v2  
[![ko-fi](https://img.shields.io/badge/Buy%20me%20a%20Shisha%20on-Ko--fi-red)](https://ko-fi.com/M4M082WK8)
[![os](https://img.shields.io/badge/platform-windows%20%7C%20macos%20%7C%20linux-lightgrey)](#)
[![commits_since_release](https://img.shields.io/github/commits-since/gkiokan/ps4-remote-pkg-sender/v2.7.2)](#)
[![version](https://img.shields.io/github/package-json/v/gkiokan/ps4-remote-pkg-sender)](#)
[![last_commit](https://img.shields.io/github/last-commit/gkiokan/ps4-remote-pkg-sender)](#)

This application has been highly inspired by @irefuse and is a full refactored version of the orginal repo.  

Based on Electron, Webpack, Vue, Express, Axios, Element-UI and Node this does not have any extra
dependencies. With this we can createa a cross platform application that works on mac, linux and Windows
and provides a nice GUI.  

![PS4 Package Sender Main Application Windows](https://media.discordapp.net/attachments/933730584721780806/959908370565959750/new_cover_ported.jpg)

[![Full Changelog](https://img.shields.io/badge/Checkout%20-All%20Changelogs-yellow)](Changelog.md)

[![Troubleshooting Guide](https://img.shields.io/badge/Checkout%20-Troubleshooting%20Guide-brightgreen)](Troubleshoot.md)

## New features in v2.*
The refactored Version provides a better GUI and technicall more ordered features.  
* Configure your server with your base path
* Prepare Custom Server Configuration (build-in express, apache, nginx, custom, ...)  
* Controll the Server application by click and have it running in the background  
* Closing windows doesn't stop the Server but stops if you quit the application.   
* Show a list of all Server side listed PKG's  
* Miscs download link to flatZ PS4 Remote Package Installer homebrew  
* Extended Menu and Tray Icon  
* Separate Server Window (Logs, Server Routes, Controls)
* Separate PS4 API Logs Window  
* Catch any possible Error on Request or Response with the RPI on your PS4  
* Scan base path (deep scan support) directory for fPKG's and serve them with the server  
* Search for titles through your found files    
* Add Served files to your Queue and install them on your PS4  
* Processing Center reflects any status changes in your server list, too     
* Set custom timeout and update interval with a slider
* Added Seperate Changelog file and Troubleshooting Guide
* Add a FAQ and Troubleshooting Area
* Configuration values for timeout and heartbeat  
* Implement HB Store and direct install fPKG's  
* Queue scanner (start next file in the queue after one is finished)

## ToDo's for the future
* Search your PS4 automatically in the current network (WIP)  
* Implement Auto-updater  
* Import / Export Configuration  
* Serve as global Server Host and provide Server Files over Internet   
* Save PS4 (local, wlan, wan, internet) and make them chooseable  
* Read CUSA from file hex values instead of title  
* Preview CUSAxxxxx Game title covers  

## How To  
So there you have it. How can you use it?  

### on PS4
1.) Start HEN v1.8+  
2.) Start flatZ Remote Package Installer  

### on PC  
1.) Start PS4 Package Sender V2   
2.) Switch to Config and select your Networkinterface (IP Adress)  
2.1) Choose a Server Port if necessary and apply or restart the server  
3.) Choose your base path where your files are settled  
4.) Switch to Server and add your files to the queue (Processing Center)  
5.) Start your install process with any of your files.  

## Troubleshooting  
Your PS4 and PC have to be on the same Network.  
If you have connection issues, check your Router or Firewall.  
If you get timeout, RPI is not running on your PS4 or PS4 IP Adress is wrong or timeout to low.   
If you get Playstation not available error, check RPI on PS4 and restart it.  
If you get the White Screen of Dead, use the unpacked version.  
If you think there is an issue, please report it.  
[Checkout the full Troubleshooting Guide](Troubleshoot.md)

## Credits
Thanks to flatz, Specter, xvortex, and all initial developers for their efford on the scene.  
Thanks to my primary testers CyB1K, mtnjustme, Masamune3210, hypermist.  
Thanks to Sam Daniel for the first full fledged Tutorial on windows and mac.  
Thanks to the awesome community and everyone else on their feedback that I am missing here.  
Mega thanks to my wife having patience while I develop this awesome tool.  

## Support  
If you want to Support me and my development, you can do this here.  
That high quality application development is done in my free time and takes much effort.  
There are so many nice features that are on my todo (black)-list that are not done yet.  
I'd like to invest more time into this Tool and provide you one of the best Tools ever.  

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/M4M082WK8)

## Disclaimer
This tool is a Proof of Concept (PoC) on my skills and also part of educational process.  
The PS4 name and PS Logo are trademarks of their respective owners.  
Exclusive approval request to Sony has been made. Until then the fair-use rule comes into effect.   
If there is any law issue, please report that to me directly, I will take immediately action.  

Made with passion and love.  :heart:
