# PLEASE READ DESCRIPTION FOR BETTER UNDERSTANDING

# DESCRIPTION
# PULL LOCATION is combination of config.toml file "build_dir" and first 8 character of "token"

# Example
# Suppose your builds_dir = "D:\\Projects\\PD\\deploy\\UI"  and
# token = "DSqjFzgyJM6j52z7VVTn"
# Then PULL_LOCALION will be :
# /d/Projects/PD/deploy/UI/DSqjFzgy/0/protocol-dig/pd-ui
# DEPLOY_LOCATION is your choice

# dev 
#PULL_LOCALION="/d/Projects/PD/deploy/UI/DSqjFzgy/0/protocol-dig/pd-ui"
#DEPLOY_LOCATION="/d/UI/pd-ui"

# test
PULL_LOCALION="/d/Projects/PD/deploy/UI/pd-ui-git/"
DEPLOY_LOCATION="/d/Projects/PD/deploy/UI/pd-ui/"

# Copy Everything from "PULL_LOCALION" to "DEPLOY_LOCATION"
cp -R $PULL_LOCALION/* $DEPLOY_LOCATION/

# Change the directory to "DEPLOY_LOCATION"
cd $DEPLOY_LOCATION

# INSTALL dependencies
npm install

# Create Build
if npm run build; then
    echo "build Successfull"
else
    echo "build failed"

fi

#PM2
if npm run stop; then
    npm run deploy
    echo "Deployment Successfull"
else
    npm run deploy
    echo "Deployment Successfull"
fi