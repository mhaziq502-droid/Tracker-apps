// Quiz question banks keyed by module id. Each question has:
//   q: the prompt
//   options: array of answer strings
//   answer: index (into options) of the correct answer
//   explain: short explanation shown after answering
//
// The quiz engine (see views/Quiz.jsx) randomizes BOTH the order of questions
// drawn from the bank AND the order of options within each question, remapping
// the correct-answer index so scoring stays correct.

export const QUIZZES = {
  'clf-c02': [
    {
      q: 'Which AWS pricing model lets you pay only for the compute time you consume with no long-term commitment?',
      options: ['Reserved Instances', 'On-Demand', 'Savings Plans', 'Dedicated Hosts'],
      answer: 1,
      explain: 'On-Demand charges per second/hour with no commitment, ideal for unpredictable workloads.',
    },
    {
      q: 'Under the AWS Shared Responsibility Model, who is responsible for patching the guest operating system on an EC2 instance?',
      options: ['AWS', 'The customer', 'Both equally', 'Neither'],
      answer: 1,
      explain: 'The customer manages the guest OS, including patches, for EC2 (security IN the cloud).',
    },
    {
      q: 'What is an Availability Zone?',
      options: [
        'A single data center',
        'One or more discrete data centers with redundant power and networking within a Region',
        'A global edge cache',
        'A billing boundary',
      ],
      answer: 1,
      explain: 'An AZ is one or more isolated data centers within a Region, designed for fault tolerance.',
    },
    {
      q: 'Which service provides object storage?',
      options: ['Amazon EBS', 'Amazon S3', 'Amazon EFS', 'Amazon FSx'],
      answer: 1,
      explain: 'Amazon S3 is object storage; EBS is block, EFS/FSx are file storage.',
    },
    {
      q: 'Which AWS service helps you estimate monthly costs before deploying?',
      options: ['Cost Explorer', 'AWS Pricing Calculator', 'Trusted Advisor', 'Budgets'],
      answer: 1,
      explain: 'The Pricing Calculator estimates costs up front; Cost Explorer analyzes actual historical spend.',
    },
    {
      q: 'Which support plan is required for a full set of Trusted Advisor checks and 24/7 phone/chat support with production-level response times?',
      options: ['Basic', 'Developer', 'Business', 'Free Tier'],
      answer: 2,
      explain: 'Business support unlocks all Trusted Advisor checks and 24/7 technical support.',
    },
  ],

  'saa-c03': [
    {
      q: 'A web application must remain available even if an entire Availability Zone fails. What is the MOST appropriate design?',
      options: [
        'Run all instances in a single AZ with larger instance types',
        'Deploy instances across multiple AZs behind an Elastic Load Balancer with Auto Scaling',
        'Use a single EC2 instance with an Elastic IP',
        'Store data only in instance store volumes',
      ],
      answer: 1,
      explain: 'Spreading instances across AZs behind an ELB with Auto Scaling provides AZ-level fault tolerance.',
    },
    {
      q: 'Which service best decouples a producer from a consumer so that message spikes do not overwhelm downstream processing?',
      options: ['Amazon SQS', 'Amazon RDS', 'AWS Lambda', 'Amazon Route 53'],
      answer: 0,
      explain: 'SQS buffers messages so consumers process at their own pace, absorbing spikes.',
    },
    {
      q: 'You need sub-millisecond read performance for a DynamoDB table with heavy read traffic. What should you add?',
      options: ['Read replicas', 'DynamoDB Accelerator (DAX)', 'ElastiCache for Redis in front of DynamoDB manually', 'A larger instance'],
      answer: 1,
      explain: 'DAX is a fully managed in-memory cache purpose-built for DynamoDB, giving microsecond reads.',
    },
    {
      q: 'Which storage class is most cost-effective for data accessed less than once a quarter but needing retrieval in minutes to hours?',
      options: ['S3 Standard', 'S3 Standard-IA', 'S3 Glacier Flexible Retrieval', 'S3 One Zone-IA'],
      answer: 2,
      explain: 'S3 Glacier Flexible Retrieval is low-cost archival with minutes-to-hours retrieval.',
    },
    {
      q: 'How should an EC2 application access an S3 bucket most securely?',
      options: [
        'Hard-code IAM user access keys in the app',
        'Attach an IAM role to the EC2 instance',
        'Store keys in a public S3 object',
        'Use the root account credentials',
      ],
      answer: 1,
      explain: 'IAM roles supply temporary, automatically rotated credentials — no long-lived keys to leak.',
    },
    {
      q: 'A company wants the lowest-cost compute for a fault-tolerant, interruptible batch job. Which option fits best?',
      options: ['On-Demand Instances', 'Reserved Instances', 'Spot Instances', 'Dedicated Hosts'],
      answer: 2,
      explain: 'Spot Instances offer the deepest discount and suit interruption-tolerant batch workloads.',
    },
    {
      q: 'Which Route 53 routing policy serves users from the Region that gives them the lowest network latency?',
      options: ['Weighted', 'Geolocation', 'Latency-based', 'Failover'],
      answer: 2,
      explain: 'Latency-based routing directs users to the Region with the lowest measured latency.',
    },
    {
      q: 'To let resources in a private subnet reach the internet for updates WITHOUT allowing inbound connections, you should use:',
      options: ['An Internet Gateway', 'A NAT Gateway', 'A VPC peering connection', 'A customer gateway'],
      answer: 1,
      explain: 'A NAT Gateway allows outbound-initiated internet access while blocking unsolicited inbound traffic.',
    },
  ],

  'dva-c02': [
    {
      q: 'What is the maximum execution timeout for an AWS Lambda function?',
      options: ['5 minutes', '15 minutes', '1 hour', '30 seconds'],
      answer: 1,
      explain: 'Lambda functions can run for up to 15 minutes before timing out.',
    },
    {
      q: 'Which service orchestrates multi-step serverless workflows using state machines?',
      options: ['AWS Step Functions', 'Amazon SQS', 'AWS Batch', 'Amazon SNS'],
      answer: 0,
      explain: 'Step Functions coordinate workflow steps with visual state machines and built-in retries.',
    },
    {
      q: 'Which deployment approach shifts a small percentage of traffic to a new version first to limit blast radius?',
      options: ['In-place', 'Canary', 'All-at-once', 'Recreate'],
      answer: 1,
      explain: 'Canary deployments route a small slice of traffic to the new version before full rollout.',
    },
    {
      q: 'Which AWS service provides managed user sign-up and sign-in for your application?',
      options: ['Amazon Cognito', 'AWS IAM', 'AWS STS', 'AWS KMS'],
      answer: 0,
      explain: 'Cognito user pools provide managed authentication/sign-up; identity pools federate access.',
    },
    {
      q: 'Which tool provides distributed tracing to debug performance across microservices?',
      options: ['AWS X-Ray', 'CloudTrail', 'AWS Config', 'Amazon Inspector'],
      answer: 0,
      explain: 'X-Ray traces requests end-to-end across services to find bottlenecks and errors.',
    },
  ],

  'soa-c02': [
    {
      q: 'Which service records AWS API calls for auditing and governance?',
      options: ['Amazon CloudWatch', 'AWS CloudTrail', 'AWS Config', 'Amazon Inspector'],
      answer: 1,
      explain: 'CloudTrail logs API activity (who did what, when) for audit purposes.',
    },
    {
      q: 'You need to run patch operations across a fleet of EC2 instances without SSH. Which service helps?',
      options: ['AWS Systems Manager', 'AWS CloudFormation', 'Amazon EventBridge', 'AWS Batch'],
      answer: 0,
      explain: 'Systems Manager (Run Command / Patch Manager / Session Manager) manages instances without opening SSH.',
    },
    {
      q: 'Which service tracks configuration changes and evaluates compliance of resources over time?',
      options: ['AWS Config', 'CloudTrail', 'CloudWatch Logs', 'Trusted Advisor'],
      answer: 0,
      explain: 'AWS Config records configuration state and evaluates it against compliance rules.',
    },
    {
      q: 'What does a CloudWatch alarm do when a metric breaches a threshold?',
      options: [
        'Nothing, it only displays',
        'Triggers actions such as notifications or Auto Scaling',
        'Deletes the resource',
        'Rolls back a deployment automatically',
      ],
      answer: 1,
      explain: 'Alarms can trigger SNS notifications, Auto Scaling actions, or other automated responses.',
    },
  ],

  'sap-c02': [
    {
      q: 'Which service enforces guardrails across all accounts in an AWS Organization by restricting the maximum available permissions?',
      options: ['IAM policies', 'Service Control Policies (SCPs)', 'Security groups', 'Permission boundaries'],
      answer: 1,
      explain: 'SCPs set the permission ceiling for member accounts; they do not grant permissions themselves.',
    },
    {
      q: 'A company wants a hub-and-spoke network connecting hundreds of VPCs and on-premises sites. What should they use?',
      options: ['VPC peering mesh', 'AWS Transit Gateway', 'Internet Gateway', 'NAT Gateway'],
      answer: 1,
      explain: 'Transit Gateway centralizes connectivity for many VPCs and hybrid networks, avoiding a peering mesh.',
    },
    {
      q: 'In the 7 Rs of migration, moving an application to AWS with no changes (lift-and-shift) is called:',
      options: ['Replatform', 'Rehost', 'Refactor', 'Repurchase'],
      answer: 1,
      explain: 'Rehost = lift-and-shift with no code changes; Replatform makes a few optimizations.',
    },
    {
      q: 'Which disaster recovery strategy has the LOWEST RTO/RPO but highest cost?',
      options: ['Backup & Restore', 'Pilot Light', 'Warm Standby', 'Multi-Site Active/Active'],
      answer: 3,
      explain: 'Multi-Site Active/Active runs full production in multiple Regions, giving near-zero RTO/RPO at highest cost.',
    },
    {
      q: 'Which service helps set up a secure, governed multi-account landing zone automatically?',
      options: ['AWS Control Tower', 'AWS Config', 'AWS CloudTrail', 'AWS Shield'],
      answer: 0,
      explain: 'Control Tower automates landing-zone setup with best-practice guardrails and account factory.',
    },
  ],

  'devops-c02': [
    {
      q: 'Which AWS service is a fully managed continuous delivery service that orchestrates build, test and deploy stages?',
      options: ['AWS CodePipeline', 'AWS CodeBuild', 'AWS CodeCommit', 'AWS CodeArtifact'],
      answer: 0,
      explain: 'CodePipeline orchestrates the stages; CodeBuild builds, CodeCommit stores source, CodeDeploy deploys.',
    },
    {
      q: 'Which tool defines AWS infrastructure using familiar programming languages like TypeScript or Python?',
      options: ['CloudFormation templates', 'AWS CDK', 'AWS Config', 'Elastic Beanstalk'],
      answer: 1,
      explain: 'The AWS CDK lets you define infrastructure in code and synthesizes CloudFormation.',
    },
    {
      q: 'What is the main benefit of a blue/green deployment?',
      options: [
        'Lower storage cost',
        'Near-instant rollback by shifting traffic back to the old environment',
        'Faster builds',
        'Automatic cost optimization',
      ],
      answer: 1,
      explain: 'Blue/green keeps the old environment live so you can roll back instantly if the new one fails.',
    },
  ],

  'ans-c01': [
    {
      q: 'Which VPC endpoint type is used to privately access Amazon S3 and DynamoDB?',
      options: ['Interface endpoint', 'Gateway endpoint', 'Transit Gateway', 'NAT Gateway'],
      answer: 1,
      explain: 'Gateway endpoints (route-table based) serve S3 and DynamoDB; Interface endpoints use PrivateLink for most others.',
    },
    {
      q: 'Which service provides a dedicated, private physical network connection from on-premises to AWS?',
      options: ['Site-to-Site VPN', 'AWS Direct Connect', 'VPC Peering', 'CloudFront'],
      answer: 1,
      explain: 'Direct Connect provides a dedicated, consistent-bandwidth private link to AWS.',
    },
    {
      q: 'Security groups are ____, while network ACLs are ____.',
      options: ['stateless / stateful', 'stateful / stateless', 'both stateful', 'both stateless'],
      answer: 1,
      explain: 'Security groups are stateful (return traffic auto-allowed); NACLs are stateless and evaluated per rule.',
    },
  ],

  'scs-c02': [
    {
      q: 'Which service provides managed threat detection by analyzing CloudTrail, VPC Flow Logs and DNS logs?',
      options: ['Amazon Inspector', 'Amazon GuardDuty', 'AWS Config', 'Amazon Macie'],
      answer: 1,
      explain: 'GuardDuty continuously analyzes those data sources for malicious or anomalous activity.',
    },
    {
      q: 'Which service automatically discovers and classifies sensitive data such as PII stored in Amazon S3?',
      options: ['Amazon Macie', 'Amazon GuardDuty', 'AWS Shield', 'Amazon Inspector'],
      answer: 0,
      explain: 'Macie uses ML to find and classify sensitive data like PII in S3.',
    },
    {
      q: 'What technique uses a data key encrypted by a KMS key to encrypt large payloads efficiently?',
      options: ['Client-side hashing', 'Envelope encryption', 'TLS termination', 'Tokenization'],
      answer: 1,
      explain: 'Envelope encryption encrypts data with a data key, which is itself encrypted by a KMS key.',
    },
    {
      q: 'Which service rotates database credentials automatically and stores them securely?',
      options: ['AWS Secrets Manager', 'AWS KMS', 'IAM', 'AWS Config'],
      answer: 0,
      explain: 'Secrets Manager stores secrets and can rotate them automatically on a schedule.',
    },
  ],

  'mls-c01': [
    {
      q: 'Which AWS service is the primary platform for building, training and deploying custom machine learning models?',
      options: ['Amazon SageMaker', 'Amazon Rekognition', 'Amazon Comprehend', 'AWS Glue'],
      answer: 0,
      explain: 'SageMaker is the end-to-end ML platform; Rekognition/Comprehend are pre-built AI services.',
    },
    {
      q: 'Which SageMaker inference option is best for infrequent, unpredictable traffic where you want to avoid paying for idle endpoints?',
      options: ['Real-time endpoint', 'Serverless inference', 'Batch transform', 'Multi-model endpoint'],
      answer: 1,
      explain: 'Serverless inference scales to zero and bills per request, ideal for intermittent traffic.',
    },
    {
      q: 'Which SageMaker feature detects bias in data and models and helps explain predictions?',
      options: ['SageMaker Clarify', 'SageMaker Ground Truth', 'SageMaker Pipelines', 'SageMaker Debugger'],
      answer: 0,
      explain: 'Clarify measures bias and provides feature-attribution explainability.',
    },
    {
      q: 'Which service is commonly used to run serverless ETL to prepare data for ML?',
      options: ['AWS Glue', 'Amazon QuickSight', 'Amazon Polly', 'AWS Shield'],
      answer: 0,
      explain: 'AWS Glue is a serverless ETL service for discovering, preparing and transforming data.',
    },
  ],

  'aif-c01': [
    {
      q: 'Which AWS service provides access to multiple foundation models through a single API for generative AI?',
      options: ['Amazon SageMaker', 'Amazon Bedrock', 'Amazon Comprehend', 'Amazon Rekognition'],
      answer: 1,
      explain: 'Bedrock offers managed access to multiple foundation models via one API.',
    },
    {
      q: 'What is "prompt engineering"?',
      options: [
        'Training a model from scratch',
        'Crafting inputs to guide a foundation model toward the desired output',
        'Encrypting model weights',
        'Scaling GPU instances',
      ],
      answer: 1,
      explain: 'Prompt engineering designs the input text/instructions to steer model outputs.',
    },
    {
      q: 'Which service would you use to extract text and data from scanned documents?',
      options: ['Amazon Textract', 'Amazon Polly', 'Amazon Translate', 'Amazon Transcribe'],
      answer: 0,
      explain: 'Textract extracts text, forms and tables from documents; Polly is TTS, Transcribe is STT.',
    },
    {
      q: 'Which is a core principle of responsible AI?',
      options: ['Maximizing model size', 'Fairness and bias mitigation', 'Always using the cheapest model', 'Avoiding documentation'],
      answer: 1,
      explain: 'Responsible AI emphasizes fairness, explainability, privacy, robustness and governance.',
    },
    {
      q: 'In generative AI, what is a "token"?',
      options: [
        'A unit of billing only',
        'A chunk of text (word or sub-word) the model processes',
        'An IAM credential',
        'A type of EC2 instance',
      ],
      answer: 1,
      explain: 'Models process text as tokens (words/sub-words); context windows are measured in tokens.',
    },
  ],
};

export function getQuiz(moduleId) {
  return QUIZZES[moduleId] || [];
}
