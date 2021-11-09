MODE=$1
read -r -d '' BASE_COMMAND << EOM

sonar-scanner \
  -Dsonar.host.url=$SONAR_SERVER \
  -Dsonar.login=$SONAR_LOGIN_TOKEN \
  -Dsonar.projectKey=$SONAR_PROJECT_KEY \
  -Dsonar.sources=src/ \
  -Dsonar.sourceEncoding=UTF-8 \
  -Dsonar.branch.name=$CI_COMMIT_REF_NAME \
  -Dsonar.exclusions=node_modules/*,coverage/*,src/features/**/**/*.test.js,src/features/**/**/**/*.test.js,src/features/**/**/**/**/*.test.js,src/test-utils,src/features/Container/Protocols/CompareCard.js,src/features/Container/Protocols/CompareCardNew.js,src/features/Container/Protocols/compareTable.js,src/features/Container/Protocols/Documents_back.js,src/features/Container/Search/Data/row.data.js,src/features/Container/Search/Data/row.js,src/features/Container/Search/Data/search.metadata.js,src/utils/api.js,src/App.js,src/App.test.js,src/AppConstant/AppConstant.js,src/index.js,src/Routes/routes.test.js,src/Routes/routesConstant.js,src/SessionOut.js,src/test-utils/test-utils.js,src/utils/utilFunction.js \
  -Dsonar.coverage.exclusions=node_modules/*,coverage/*,src/features/**/**/*.test.js,src/features/**/**/**/*.test.js,src/features/**/**/**/**/*.test.js,src/test-utils,src/features/Container/Protocols/CompareCard.js,src/features/Container/Protocols/CompareCardNew.js,src/features/Container/Protocols/compareTable.js,src/features/Container/Protocols/Documents_back.js,src/features/Container/Search/Data/row.data.js,src/features/Components/Dashboard/QCTable.js,src/features/Components/Dashboard/ProtocolTable.js, src/features/Container/Search/Data/row.js,src/features/Container/Search/Data/search.metadata.js,src/utils/api.js,src/App.js,src/App.test.js,src/AppConstant/AppConstant.js,src/index.js,src/Routes/routes.test.js,src/Routes/routesConstant.js,src/SessionOut.js,src/test-utils/test-utils.js,src/utils/utilFunction.js \
  -Dsonar.javascript.lcov.reportPaths=./coverage/lcov.info \
  -Dsonar.javascript.xunit.reportPath=./coverage/clover.xml \
  -Dsonar.gitlab.ref_name=$CI_COMMIT_REF_NAME \
  -Dsonar.gitlab.url=https://$CI_SERVER_HOST \
  -Dsonar.gitlab.user_token=$SONAR_LOGIN_TOKEN \
  -Dsonar.gitlab.project_id=$CI_PROJECT_URL
EOM
if [ "$MODE" == "merge_request" ]; then
  eval "$BASE_COMMAND \
  -Dsonar.gitlab.commit_sha=$(git log --pretty=format:%H "origin/$CI_MERGE_REQUEST_TARGET_BRANCH_NAME..$CI_COMMIT_SHA" | tr '\n' ',') \
  -Dsonar.gitlab.unique_issue_per_inline=true \
  -Dsonar.gitlab.ci_merge_request_iid=$CI_MERGE_REQUEST_IID \
  -Dsonar.gitlab.merge_request_discussion=true"
elif [ "$MODE" == "branch" ]; then
  eval "$BASE_COMMAND -Dsonar.gitlab.commit_sha=$CI_COMMIT_SHA"
fi
