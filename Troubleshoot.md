# PS4 Remote PKG Sender v2 - Troubleshooting


## I have White Screen of Dead
This happens in general with the portable Version on Windows.  
Please try to use the unpacked version. That works for sure and has been tested.  

## Playstation not available  
We can not connect to the RPI on PS4.  
Check your Firewall if something blocks your connection from your PC to PS4.  
Ping your PS4 in your Terminal / Commandline with `ping PS4_IP_ADRESS`.  
Restart RPI (Remote Package Installer) and stay on splash screen.  

## I get Timeout error  
Timeout can mean any of the following errors but in generall the PS4 RPI (Remote Package Installer) cannot be connected to.  

##### Option a)  
Try to restart the RPI on your PS4. Sometimes the RPI changes into kinda suspend mode and has no reaction.   
Restarting the RPI helps in most cases.   

##### Option b)  
Timeout on Request because timeout value is to short.  
Set a higher request timeout value before the Sender kills the request when RPI takes to long to respond.  
Mostly seen on the Install Request because the RPI needs to prepare some stuff before it sends a valide Task ID back.  

## I get a long Error Code  
This will be patched in the v2.4.2 but for the completenes here they are.  
Thoose Error Codes are not documented yet but I've patched the known ones which are:   
`2157510681` Task doesn't exists  
`2157510663` already installed  
`2157510677` it seems to be installed already (duplicate?)  
`2157510789` not enough storage  

## unable to set up prerequisites for package  
This error is not documented, too.  
I have no clue yet what causes this error.  
But the error is the explicit error message from the Remote Package Installer,  
so this is not an issue with the app.  

## Server not starting  
If you see that your server is on error, please check the Server Window for the logs.  
It will give you a specific error message what happend.  Mostly it is a blocked port.  
Just change the Port and press apply, refresh or just i/o button to close and start the server.  


## Application doesn't close  
Closing windows doesn't kill the App.  
This is intented to not accidently kill the server.  
If you want to close the application fully you have to go  
through the Menu `Application > Quit`.  
