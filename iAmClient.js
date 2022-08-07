// snippet-start:[iam.JavaScript.createclientv3]
import { IAMClient } from "@aws-sdk/client-iam";
// Set the AWS Region.
const REGION = "us-east-1"; // For example, "us-east-1".
// Create an IAM service client object.
const iamClient = new IAMClient({ region: REGION });
export { iamClient };