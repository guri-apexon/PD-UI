# Environment Setup

1. Install NodeJS
		`https://nodejs.org/en/download/`

2. Install `yarn`: 
		**command** : `npm install -g yarn`

3. Install `pm2`: 
		**command** : `npm install -g pm2`

4. Take git clone
		`https://gitlabrnds.quintiles.com/protocol-dig/pd-ui`

5. Go inside `pd-ui` folder

6. Create `protocols` folder with `shared access to everyone`

7. Create `. env` file. File content given below.

8. Install Application dependencies: 
		**command**: `yarn`

9. Create Build: 
		**command**: `yarn` 

10. Run Application: 
		**command**: `pm2 start server.js` 

11. Save Application to handle system restart: 
		**command**: `pm2 save` 

## What if Processes Don’t Start on Boot?

We had issues getting PM2 itself and the managed processes to be restored on system boot and the reason was wrong permissions. PM2 itself should be started with system boot which requires root privileges to be kicked off with other system services. However, the application processes run within the scope of another system user, let’s call him  `nodeuser`.

We solved the boot issue by passing the  `-u nodeuser`  parameter to PM2’s  `startup`  command. That concretely defined  `nodeuser`  as the user for which we want to resurrect the saved processes.

```bash
$ pm2 startup -u nodeuser

```

PM2 will generate a new startup script and you need to execute the snippet with root privileges again.

# Note
in .env file Please Change 
**REACT_APP_ENV** and **NODE_ENV** values based on the environment
Possible values
>dev
>svt
>uat
>prod

# .env File

# possible envs dev, svt, uat, prod
REACT_APP_ENV=dev
NODE_ENV=dev
PORT=3000

Set your database/API connection information here
API_KEY=**************************
API_URL=**************************

# DEV
ELASTIC_DEV_URL=http://ca2spdml04q:9200/pd-index-3
CIMS_DEV_URL=https://ca2utmsa04q.quintiles.net:8080/v1

# SVT
ELASTIC_SVT_URL=http://ca2spdml04q:9200/pd-index
CIMS_SVT_URL=https://ca2utmsa04q.quintiles.net:8080/v1

# UAT
ELASTIC_UAT_URL=http://ca2spdml04q:9200/pd-index
CIMS_UAT_URL=https://ca2utmsa04q.quintiles.net:8080/v1

# PROD
ELASTIC_PROD_URL=http://ca2spdml04q:9200/pd-index
CIMS_PROD_URL=https://ca2utmsa04q.quintiles.net:8080/v1

CIMS_API_VER=v1
CIMS_USER=pd_app
CIMS_PWD=pd_app1
