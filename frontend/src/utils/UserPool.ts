import { CognitoUserPool, ICognitoUserPoolData } from "amazon-cognito-identity-js";

const poolData: ICognitoUserPoolData = {
    UserPoolId: "us-east-1_ynGetmtCt",
    ClientId: "3fljqagv55l8c6tf7jca9tk7ih"

}
export default new CognitoUserPool(poolData);