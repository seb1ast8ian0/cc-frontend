import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool } from "amazon-cognito-identity-js";
import { SignupCredentials } from "./AuthCredentialsInterfaces";

const cognitoPoolData = {
    UserPoolId: 'us-east-1_vnfE66yLP',
    ClientId: '4l3fa1vlvt8oqgns1drcpanmnp',
};
  
const userPool = new CognitoUserPool(cognitoPoolData);

const cognitoSignin = async (username: string, password: string) => {
    const cognitoUser = getCognitoUser(username);

    const authenticationData = {
        Username: username,
        Password: password,
    };

    const authenticationDetails = new AuthenticationDetails(authenticationData);

    return new Promise<string>((resolve, reject) => {
        cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
            const accessToken = result.getAccessToken().getJwtToken();
            resolve(accessToken);
        },
        newPasswordRequired: () => {
            console.log('New password required');
        },
        onFailure: (err) => {
            console.log(err.message || JSON.stringify(err));
            reject(err);
        },
        });
    });
};

const cognitoSignup = async (credentials: SignupCredentials) => {
    const attributeList = [
        new CognitoUserAttribute({ Name: 'name', Value: credentials.name }),
        new CognitoUserAttribute({ Name: 'email', Value: credentials.email }),
    ];

    return new Promise<CognitoUser>((resolve, reject) => {
        userPool.signUp(credentials.username, credentials.password, attributeList, [], (err, result) => {
            if (err) {
                console.log(err.message || JSON.stringify(err));
                reject(err);
            } else {
                const cognitoUser = result?.user;
        
                if (!cognitoUser) {
                    reject(new Error('Cognito user is null'));
                } else {
                    resolve(cognitoUser);
                }
            }
        });
      });      
};

const cognitoVerifyUser = async (username: string, verificationCode: string) => {

    const cognitoUser = getCognitoUser(username);

    return new Promise((resolve, reject) => {
                    
        if (verificationCode) {
            console.log("verificationCode", verificationCode);

            cognitoUser.confirmRegistration(verificationCode, true, function(err, result) {
                if (err) {
                    console.log(err.message || JSON.stringify(err));
                    reject(err);
                }
                console.log('User verified! ' + result);
                resolve(null);
            });

        } else {
            console.log('Verification code is required');
            reject(new Error('Verification code is required'));
        }

    });

}

const cognitoResendCode = async (username: string) => {
    const cognitoUser = getCognitoUser(username);

    cognitoUser.resendConfirmationCode((error, result) => {
        return new Promise((resolve, reject) => {
            if(error){
                reject(error);
            }
            resolve(null);
        });
    });

}

const getCognitoUser = (username: string) => {
    const userData = {
        Username: username,
        Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    return cognitoUser;

}

export {cognitoSignin, cognitoSignup, cognitoVerifyUser, cognitoResendCode}