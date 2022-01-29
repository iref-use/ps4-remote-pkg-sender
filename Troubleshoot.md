# PS4 Remote PKG Sender v2 - Troubleshooting


## I have White Screen of Dead
This happens in general with the portable Version on Windows.  
Please try to use the unpacked version. That works for sure and has been tested.  
This issue is fixed in v2.4.3. If you still get an error, please report.  

## I can't run the app because Mac blocks the app
Because I haven't signed my app yet with a paid apple certificate that happens.  
Once you tried to open it mac blocks it, that is correct.
You can check your System `Preferences > Security > General`  
There should be the app listed as blocked. You can explicity allow it then to run.  
Don't worry. My app is clean and open source.  Once I get money for the certificate I will fix that.  

## I can't run the app because windows blocks the app
Even windows need a paid certificate to have it signed. Same circumstance as on mac.  
Extend the window and allow the app to be run.  
Again. Don't worry. My app is clean. Once I get money for the certificate I will fix that.  

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

##### Option c)  
Sometimes a restart just fixes connection issues, specially on windows.  
Restart your PC and PS4, try again. Some users reported back that this helped.  

##### Option d)  
There is something arround with the latest update of the GoldHen.  
I am not sure yet but I can not debug this down as I am still on 5.05.  

Check the PS4 API Logs and see if you get any response.  
If the response for Check PS4 works, but you don't proceed on the install request  
then you might be affected on the latest update of GoldHen (for sure).  

I assume that because there was a latest update and since then some users reported back install issues.  
Try another HEN edition as this was initially working from HENv1.8 until GoldHen 2.0 for sure.  
If nothing helps, try another PKG Sender - I guess they will not work eithier.  

A working GoldHen 2.0 (old one) can be found on e.g. nightkinghost.  

##### Option e)  
You can try another Installation type. Try using IPI and FTP untill my app does support  
it natively or the RPIOOSDK. Support for both target apps will done soon.  


## I get a long Error Code  
This will be patched in the v2.4.2 but for the completenes here they are.  
Thoose Error Codes are not documented yet but I've patched the known ones which are:   
`2157510681` Task doesn't exists -> RPI can't find any task associated with the id
`2157510663` already installed  -> delete the app
`2157510677` it seems to be installed already (duplicate?)  -> delte old app chunks
`2157510789` not enough storage  
`2157510920` not known yet

## unable to set up prerequisites for package  
Thanks to marcussacana we could debug this error down.
This error will be responded from the Remote Package Installer when there is  
a HTTP Protocoll error on the serving point.  In case of the RPS v2, just in case  
it will accour, just restart the server in another Port.

If you get the error message from any other package sender, this is due
the lack of missing multipart stream support.  

## My RPI crashes on console  
This happend to a couple of users when we try to hit to hard on the RPI.  
RPI cann't handle to much concurrent requests and crashes after a while  
especially when you try to install something big 100GB+ PKG files or
installing multiple files at once and have a low update interval value.  

It may help if you leave the interval value arround 2-3 secs because
updating progress info is also a request that will be sent upon the interval.  

In v2.4.2 you can still send as many install request as you want, that is not limited yet,  
but consider the fact that once the installation progress started the RPI has no work to do with it.  
Download still continues on PS4 even if you jump out of RPI! Keep that in mind!  

## Server not starting  
If you see that your server is on error, please check the Server Window for the logs.  
It will give you a specific error message what happend.  Mostly it is a blocked port.  
Just change the Port and press apply, refresh or just i/o button to close and start the server.  

## Cannot Install HB-Store items directly  
Until the refactored version of the HB-Store goes public you can download the App,  
put it on your base_path folder and install it on the regular way.  

## Application doesn't close  
Closing windows doesn't kill the App.  
This is intented to not accidently kill the server.  
If you want to close the application fully you have to go  
through the Menu `Application > Quit`.  
