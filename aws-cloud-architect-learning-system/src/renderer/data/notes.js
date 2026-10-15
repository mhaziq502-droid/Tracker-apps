// Curated, hand-written offline study notes per module. These are the bundled
// fallback shown when the live AWS feed can't be fetched, and they also appear
// as the "Core concepts" study section alongside live content.
//
// Each module maps to an ordered list of topic sections. Each section has an
// id (used for progress tracking), a title, and markdown-ish body content
// rendered by the Notes view.

export const NOTES = {
  'clf-c02': [
    {
      id: 'clf-cloud-value',
      title: 'Cloud value proposition',
      body: [
        'The six advantages of cloud computing: trade capital expense for variable expense, benefit from massive economies of scale, stop guessing capacity, increase speed and agility, stop spending money running/maintaining data centers, and go global in minutes.',
        'CapEx vs OpEx: on-premises requires large upfront capital; cloud shifts spend to pay-as-you-go operational expense.',
        'Elasticity: scale resources up and down automatically to match demand so you only pay for what you use.',
      ],
    },
    {
      id: 'clf-global-infra',
      title: 'AWS global infrastructure',
      body: [
        'Regions are geographic areas; each contains multiple Availability Zones (AZs).',
        'AZs are one or more discrete data centers with redundant power, networking and connectivity — isolated for fault tolerance but linked by low-latency links.',
        'Edge locations / CloudFront points of presence cache content close to users.',
        'Design for high availability by spreading workloads across multiple AZs.',
      ],
    },
    {
      id: 'clf-core-services',
      title: 'Core services at a glance',
      body: [
        'Compute: EC2 (virtual servers), Lambda (serverless functions), Elastic Beanstalk (PaaS), ECS/EKS (containers).',
        'Storage: S3 (object), EBS (block, attached to EC2), EFS (shared file), Glacier (archive).',
        'Database: RDS (managed relational), DynamoDB (NoSQL), Aurora, Redshift (data warehouse), ElastiCache.',
        'Networking: VPC, Route 53 (DNS), CloudFront (CDN), API Gateway, Direct Connect.',
      ],
    },
    {
      id: 'clf-security-pricing',
      title: 'Security model & pricing',
      body: [
        'Shared Responsibility Model: AWS is responsible for security OF the cloud (hardware, global infrastructure); the customer is responsible for security IN the cloud (data, IAM, OS/network/firewall config).',
        'IAM provides users, groups, roles and policies to control access. Follow least privilege.',
        'Pricing fundamentals: pay-as-you-go, pay less when you reserve (Savings Plans / Reserved Instances), pay less with volume. Use the Pricing Calculator and Cost Explorer.',
        'Support plans: Basic, Developer, Business, Enterprise On-Ramp, Enterprise.',
      ],
    },
  ],

  'saa-c03': [
    {
      id: 'saa-well-architected',
      title: 'AWS Well-Architected Framework',
      body: [
        'Six pillars: Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimization, and Sustainability.',
        'As a Solutions Architect you continually trade off these pillars based on business requirements.',
        'Design principles: stop guessing capacity, test at production scale, automate, allow for evolutionary architectures, drive decisions with data, and improve through game days.',
      ],
    },
    {
      id: 'saa-resilient',
      title: 'Designing resilient architectures',
      body: [
        'Multi-AZ for high availability; multi-Region for disaster recovery.',
        'Decouple components with SQS (queues), SNS (pub/sub), and EventBridge (event bus) so failures are isolated.',
        'Elastic Load Balancing (ALB for HTTP/HTTPS, NLB for TCP/UDP, GWLB for appliances) distributes traffic; Auto Scaling adjusts capacity.',
        'DR strategies ordered by cost/RTO: Backup & Restore, Pilot Light, Warm Standby, Multi-Site Active/Active.',
      ],
    },
    {
      id: 'saa-performance',
      title: 'High-performing architectures',
      body: [
        'Choose the right compute: EC2 instance families, Lambda for event-driven, Fargate for serverless containers.',
        'Caching: CloudFront at the edge, ElastiCache (Redis/Memcached) for in-memory, DynamoDB DAX, read replicas for RDS.',
        'Storage selection: S3 for object, EBS gp3/io2 for block, EFS for shared POSIX, FSx for specialized workloads.',
        'Global performance: Route 53 routing policies (latency, geolocation, weighted) and Global Accelerator.',
      ],
    },
    {
      id: 'saa-secure',
      title: 'Secure architectures',
      body: [
        'IAM roles for services instead of long-lived keys; use least privilege and permission boundaries.',
        'Encryption: KMS-managed keys, S3 SSE, EBS/RDS encryption at rest, TLS in transit.',
        'Network isolation: VPC with public/private subnets, security groups (stateful), NACLs (stateless), VPC endpoints to reach AWS services privately.',
        'Protect edge with WAF, Shield (DDoS) and secrets with Secrets Manager / Parameter Store.',
      ],
    },
    {
      id: 'saa-cost',
      title: 'Cost-optimized architectures',
      body: [
        'Right-size instances and use Auto Scaling to avoid over-provisioning.',
        'Pricing models: On-Demand, Spot (up to ~90% off for interruptible work), Savings Plans and Reserved Instances for steady state.',
        'S3 storage classes & lifecycle policies (Standard → IA → Glacier) reduce storage cost.',
        'Use Cost Explorer, Budgets and the Trusted Advisor cost checks to monitor spend.',
      ],
    },
  ],

  'dva-c02': [
    {
      id: 'dva-serverless',
      title: 'Serverless development',
      body: [
        'Lambda: event-driven functions; mind cold starts, timeout (max 15 min), memory/CPU coupling, and concurrency limits.',
        'API Gateway fronts Lambda for REST/HTTP/WebSocket APIs with throttling, caching and authorizers.',
        'DynamoDB single-table design, partition key choice, GSIs/LSIs, and on-demand vs provisioned capacity.',
        'Step Functions orchestrate multi-step workflows with state machines.',
      ],
    },
    {
      id: 'dva-cicd',
      title: 'CI/CD and deployment',
      body: [
        'CodeCommit (git), CodeBuild (build/test), CodeDeploy (deploy), CodePipeline (orchestration).',
        'Deployment strategies: in-place, blue/green, and canary (via CodeDeploy / Lambda aliases + weighted traffic).',
        'SAM and CloudFormation define serverless infrastructure as code.',
      ],
    },
    {
      id: 'dva-sdk-auth',
      title: 'SDKs, auth & observability',
      body: [
        'Use the AWS SDK with IAM roles; prefer temporary credentials via STS.',
        'Cognito for user sign-up/sign-in (user pools) and federated access (identity pools).',
        'X-Ray for distributed tracing; CloudWatch Logs, Metrics and Embedded Metric Format for observability.',
      ],
    },
  ],

  'soa-c02': [
    {
      id: 'soa-monitoring',
      title: 'Monitoring & observability',
      body: [
        'CloudWatch metrics, alarms, dashboards and Logs Insights for querying.',
        'CloudTrail records API activity for auditing and governance.',
        'Config tracks resource configuration changes and compliance.',
      ],
    },
    {
      id: 'soa-automation',
      title: 'Automation & operations',
      body: [
        'Systems Manager: Run Command, Patch Manager, Session Manager, Parameter Store.',
        'Auto Scaling and lifecycle hooks for self-healing fleets.',
        'CloudFormation drift detection and stack management.',
      ],
    },
    {
      id: 'soa-reliability',
      title: 'Reliability & recovery',
      body: [
        'Backups with AWS Backup; RDS automated backups and snapshots.',
        'Health checks and failover with Route 53 and ELB.',
        'Design runbooks and incident response procedures.',
      ],
    },
  ],

  'sap-c02': [
    {
      id: 'sap-multi-account',
      title: 'Multi-account & organizations',
      body: [
        'AWS Organizations with OUs and Service Control Policies (SCPs) for guardrails.',
        'Control Tower to set up a secure, well-governed multi-account landing zone.',
        'Centralized logging, billing (consolidated), and cross-account IAM roles.',
      ],
    },
    {
      id: 'sap-migration',
      title: 'Migration strategies',
      body: [
        'The 7 Rs: Retire, Retain, Relocate, Rehost, Replatform, Repurchase, Refactor.',
        'Migration tooling: Application Migration Service (MGN), DMS (databases), DataSync, Snow family for bulk transfer.',
        'Hybrid connectivity: Direct Connect, Site-to-Site VPN, Transit Gateway for hub-and-spoke networks.',
      ],
    },
    {
      id: 'sap-advanced-arch',
      title: 'Advanced architecture',
      body: [
        'Design for complex cost, performance and operational trade-offs across many accounts.',
        'Event-driven and microservice architectures at scale with EventBridge, SQS, Kinesis.',
        'Advanced DR with multi-Region active/active, data replication and global databases.',
      ],
    },
  ],

  'devops-c02': [
    {
      id: 'dop-iac',
      title: 'Infrastructure as Code',
      body: [
        'CloudFormation and CDK for repeatable, version-controlled infrastructure.',
        'Nested stacks, change sets, and stack policies for safe updates.',
        'Drift detection and automated remediation.',
      ],
    },
    {
      id: 'dop-pipelines',
      title: 'CI/CD pipelines',
      body: [
        'End-to-end pipelines with CodePipeline integrating build, test, approval and deploy stages.',
        'Automated testing gates and manual approval actions.',
        'Blue/green and canary deployments for EC2, ECS, and Lambda.',
      ],
    },
    {
      id: 'dop-monitoring',
      title: 'Monitoring & incident response',
      body: [
        'Centralized logging and metrics with CloudWatch and OpenSearch.',
        'Automated remediation with EventBridge rules triggering Lambda/SSM.',
        'High-availability and self-healing architectures.',
      ],
    },
  ],

  'ans-c01': [
    {
      id: 'ans-vpc',
      title: 'VPC design',
      body: [
        'Subnetting, route tables, IGW/NAT gateways, and VPC peering.',
        'VPC endpoints (Gateway for S3/DynamoDB, Interface via PrivateLink) for private service access.',
        'Transit Gateway for scalable multi-VPC and hybrid connectivity.',
      ],
    },
    {
      id: 'ans-hybrid',
      title: 'Hybrid connectivity',
      body: [
        'Direct Connect for dedicated, consistent bandwidth; DX gateways for multi-Region.',
        'Site-to-Site VPN as backup or lower-cost connectivity.',
        'BGP routing considerations and resilience patterns.',
      ],
    },
    {
      id: 'ans-dns-edge',
      title: 'DNS & edge networking',
      body: [
        'Route 53 routing policies, health checks, and private hosted zones.',
        'CloudFront, Global Accelerator and edge optimization.',
        'Network security with security groups, NACLs, Network Firewall and WAF.',
      ],
    },
  ],

  'scs-c02': [
    {
      id: 'scs-iam',
      title: 'Identity & access management',
      body: [
        'IAM policies, roles, permission boundaries and SCPs.',
        'Federation with SAML/OIDC and IAM Identity Center (SSO).',
        'Least privilege, policy evaluation logic, and access analyzer.',
      ],
    },
    {
      id: 'scs-data',
      title: 'Data protection',
      body: [
        'KMS key management, envelope encryption, and key policies.',
        'Encryption at rest and in transit across services.',
        'Secrets Manager rotation and certificate management with ACM.',
      ],
    },
    {
      id: 'scs-detect',
      title: 'Detection & incident response',
      body: [
        'GuardDuty (threat detection), Security Hub (posture), Macie (sensitive data), Inspector (vuln scanning).',
        'CloudTrail and Config for audit and compliance.',
        'Automated incident response with EventBridge + Lambda.',
      ],
    },
  ],

  'mls-c01': [
    {
      id: 'mls-data',
      title: 'Data engineering for ML',
      body: [
        'Ingest and prepare data with Glue, Athena, EMR and Kinesis.',
        'Feature engineering and SageMaker Feature Store.',
        'Data labeling with SageMaker Ground Truth.',
      ],
    },
    {
      id: 'mls-modeling',
      title: 'Modeling & training',
      body: [
        'SageMaker training jobs, built-in algorithms, and bring-your-own-container.',
        'Hyperparameter tuning, distributed training and spot training for cost.',
        'Model evaluation metrics and bias detection with Clarify.',
      ],
    },
    {
      id: 'mls-mlops',
      title: 'Deployment & MLOps',
      body: [
        'Real-time endpoints, batch transform, and serverless/async inference.',
        'SageMaker Pipelines, Model Registry and Model Monitor.',
        'CI/CD for ML and automated retraining.',
      ],
    },
  ],

  'aif-c01': [
    {
      id: 'aif-fundamentals',
      title: 'AI/ML fundamentals',
      body: [
        'Core concepts: supervised vs unsupervised learning, inference, training, and model types.',
        'Generative AI and foundation models (FMs); tokens, embeddings and context windows.',
        'When to use AI/ML vs traditional rules.',
      ],
    },
    {
      id: 'aif-aws-ai',
      title: 'AWS AI/ML services',
      body: [
        'Amazon Bedrock for foundation models (text, image) via a single API.',
        'SageMaker for building/training/deploying custom models.',
        'AI services: Rekognition (vision), Comprehend (NLP), Transcribe, Polly, Translate, Textract, Q.',
      ],
    },
    {
      id: 'aif-responsible',
      title: 'Prompt engineering & responsible AI',
      body: [
        'Prompt engineering techniques: zero/few-shot, instruction clarity, and guardrails.',
        'Responsible AI: fairness, explainability, robustness, privacy and governance.',
        'Guardrails for Bedrock, bias detection, and secure handling of sensitive data.',
      ],
    },
  ],
};

export function getNotes(moduleId) {
  return NOTES[moduleId] || [];
}
