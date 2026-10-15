// Most commonly asked questions clients/interviewers put to AWS Cloud Solution
// Architects, with model answers. Grouped by theme. Rendered in the
// "Interview Q&A" view with search + expand/collapse.

export const INTERVIEW = [
  {
    category: 'Architecture & Design',
    items: [
      {
        q: 'How do you design a highly available and fault-tolerant application on AWS?',
        a: 'Spread resources across multiple Availability Zones, place compute behind an Elastic Load Balancer with Auto Scaling, use managed multi-AZ data stores (RDS Multi-AZ, DynamoDB), decouple components with SQS/SNS/EventBridge so failures stay isolated, add health checks and automated failover with Route 53, and for disaster recovery extend to a second Region using a strategy chosen by RTO/RPO (Backup & Restore, Pilot Light, Warm Standby, or Active/Active).',
      },
      {
        q: 'What is the AWS Well-Architected Framework and how do you use it?',
        a: 'It is a set of best practices across six pillars — Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimization, and Sustainability. I use it to review designs, surface risks, and make explicit trade-offs that align the architecture with business priorities, typically via a Well-Architected Review.',
      },
      {
        q: 'How do you decide between serverless and container-based or EC2 architectures?',
        a: 'I weigh traffic patterns, operational overhead, latency and cost. Serverless (Lambda, Fargate) suits event-driven, spiky or low-ops workloads and scales to zero. Containers (ECS/EKS) suit portable, long-running or more controlled runtimes. EC2 suits specialized OS/kernel needs or licensing. The decision follows the Well-Architected trade-offs rather than a fixed preference.',
      },
      {
        q: 'How do you decouple components in a distributed system on AWS?',
        a: 'Use SQS for buffering and load-leveling between producers and consumers, SNS for fan-out pub/sub, and EventBridge for event-driven routing between services. This isolates failures, absorbs spikes, and lets each component scale independently.',
      },
    ],
  },
  {
    category: 'Security',
    items: [
      {
        q: 'Explain the AWS Shared Responsibility Model.',
        a: 'AWS secures the cloud itself — hardware, the global infrastructure, and managed-service internals ("security OF the cloud"). The customer secures what they put in the cloud: IAM configuration, data, encryption, OS/network/firewall settings, and application security ("security IN the cloud"). The split shifts depending on how managed the service is.',
      },
      {
        q: 'How do you secure access to AWS resources?',
        a: 'Apply least-privilege IAM policies, prefer IAM roles and temporary STS credentials over long-lived keys, enforce MFA, centralize identity with IAM Identity Center, use SCPs for org-wide guardrails, and audit with CloudTrail, Config and Access Analyzer.',
      },
      {
        q: 'How do you protect data at rest and in transit?',
        a: 'At rest: enable encryption with KMS-managed keys (S3 SSE, EBS/RDS encryption) and use envelope encryption for large payloads. In transit: enforce TLS, use ACM for certificates, and keep traffic private with VPC endpoints/PrivateLink. Manage secrets with Secrets Manager and rotate them automatically.',
      },
    ],
  },
  {
    category: 'Networking',
    items: [
      {
        q: 'Walk me through designing a VPC for a three-tier web application.',
        a: 'Create a VPC with public subnets (load balancer, NAT) and private subnets (app and database tiers) across at least two AZs. Route public subnets to an Internet Gateway and private subnets outbound through a NAT Gateway. Use security groups per tier (stateful) and NACLs at the subnet level (stateless). Reach AWS services privately via VPC endpoints. Keep the database tier with no inbound internet route.',
      },
      {
        q: 'When would you choose Direct Connect over a VPN?',
        a: 'Direct Connect provides a dedicated, consistent-bandwidth, lower-latency private link — preferred for steady, high-throughput or latency-sensitive hybrid workloads. Site-to-Site VPN is faster to set up and cheaper, good as a backup path or for lower/variable bandwidth. They are often combined for resilience.',
      },
    ],
  },
  {
    category: 'Cost Optimization',
    items: [
      {
        q: 'How do you reduce AWS costs without sacrificing performance?',
        a: 'Right-size resources and use Auto Scaling; use Spot for interruptible workloads and Savings Plans/Reserved Instances for steady state; apply S3 storage classes and lifecycle policies; remove idle resources; cache with CloudFront/ElastiCache to cut compute and data-transfer costs; and monitor with Cost Explorer, Budgets and Trusted Advisor.',
      },
      {
        q: 'A client\'s monthly bill is growing unexpectedly. How do you investigate?',
        a: 'Start with Cost Explorer to break spend down by service, account, tag and time to find the driver, cross-check with the Cost and Usage Report, review Trusted Advisor and Compute Optimizer recommendations, confirm resources are tagged for allocation, and set Budgets with alerts to catch regressions early.',
      },
    ],
  },
  {
    category: 'Migration & Operations',
    items: [
      {
        q: 'How do you approach migrating a large on-premises workload to AWS?',
        a: 'Assess the portfolio and dependencies, then classify each app against the 7 Rs (Retire, Retain, Relocate, Rehost, Replatform, Repurchase, Refactor). Build a landing zone (Control Tower / Organizations), plan networking (Direct Connect/VPN, Transit Gateway), pick tooling (MGN, DMS, DataSync, Snow family), migrate in waves starting with low-risk apps, validate, then optimize for cost and the Well-Architected pillars.',
      },
      {
        q: 'What is your disaster recovery strategy and how do you pick one?',
        a: 'I choose based on the business RTO and RPO versus cost: Backup & Restore (hours, cheapest), Pilot Light (core services always on), Warm Standby (scaled-down live copy), and Multi-Site Active/Active (near-zero RTO/RPO, highest cost). I document the plan and test it regularly with game days.',
      },
      {
        q: 'How do you implement monitoring and observability?',
        a: 'Collect metrics, logs and traces centrally: CloudWatch metrics/alarms/dashboards and Logs Insights, CloudTrail for API audit, Config for configuration compliance, and X-Ray for distributed tracing. Define SLOs, alert on meaningful thresholds, and automate responses with EventBridge and Systems Manager.',
      },
    ],
  },
  {
    category: 'Behavioral / Consulting',
    items: [
      {
        q: 'How do you explain a complex architecture to a non-technical stakeholder?',
        a: 'I anchor on business outcomes — availability, cost, time-to-market, risk — use simple diagrams and analogies, avoid jargon, and tie each technical choice back to the value or trade-off it delivers for them.',
      },
      {
        q: 'A client insists on a design you think is sub-optimal. How do you handle it?',
        a: 'I seek to understand their constraints and goals, present the trade-offs with data (cost, risk, performance), offer alternatives, and if they still choose their path I document the decision and risks. The goal is informed consensus, not winning the argument.',
      },
    ],
  },
];
