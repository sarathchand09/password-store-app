# password-store-app
simple password store app where you can store and retrieve passwords built with react + electronjs+node + nedb + express = MERN Stack!

#running without docker
update package.json url http:backend:5000 to http:localhost:5000

# start backend

go to package.json  run target server-start

# start frontend

go to package.json, change proxy from backend to localhost,  run target start

# build exe

go to package.json, run target electron-pack, copy setup from build to exe folder. make sure its setup.exe only. 
