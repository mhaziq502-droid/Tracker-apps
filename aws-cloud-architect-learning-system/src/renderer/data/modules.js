// Catalog of AWS certification modules the learning system covers.
// Each module links to the live AWS exam-guide page (opened in the user's
// browser) and an RSS/feed source the app attempts to fetch at runtime for
// fresh "What's New" content. If the fetch fails (offline), the bundled
// curated notes in ./notes.js are shown instead.

export const MODULES = [
  {
    id: 'clf-c02',
    code: 'CLF-C02',
    name: 'AWS Certified Cloud Practitioner',
    level: 'Foundational',
    color: '#f59e0b',
    blurb:
      'Entry-level overview of the AWS Cloud: value proposition, core services, security, pricing and support.',
    examGuideUrl:
      'https://aws.amazon.com/certification/certified-cloud-practitioner/',
    feedUrl: 'https://aws.amazon.com/about-aws/whats-new/recent/feed/',
  },
  {
    id: 'saa-c03',
    code: 'SAA-C03',
    name: 'AWS Certified Solutions Architect – Associate',
    level: 'Associate',
    color: '#3b82f6',
    blurb:
      'Design resilient, high-performing, secure and cost-optimized architectures on AWS. The core cert for a junior Cloud Solution Architect.',
    examGuideUrl:
      'https://aws.amazon.com/certification/certified-solutions-architect-associate/',
    feedUrl: 'https://aws.amazon.com/about-aws/whats-new/recent/feed/',
  },
  {
    id: 'dva-c02',
    code: 'DVA-C02',
    name: 'AWS Certified Developer – Associate',
    level: 'Associate',
    color: '#22c55e',
    blurb:
      'Develop, deploy and debug cloud-based applications using AWS, including SDKs, CI/CD and serverless.',
    examGuideUrl:
      'https://aws.amazon.com/certification/certified-developer-associate/',
    feedUrl: 'https://aws.amazon.com/about-aws/whats-new/recent/feed/',
  },
  {
    id: 'soa-c02',
    code: 'SOA-C02',
    name: 'AWS Certified SysOps Administrator – Associate',
    level: 'Associate',
    color: '#14b8a6',
    blurb:
      'Deploy, manage and operate workloads on AWS: monitoring, automation, networking, and incident response.',
    examGuideUrl:
      'https://aws.amazon.com/certification/certified-sysops-admin-associate/',
    feedUrl: 'https://aws.amazon.com/about-aws/whats-new/recent/feed/',
  },
  {
    id: 'sap-c02',
    code: 'SAP-C02',
    name: 'AWS Certified Solutions Architect – Professional',
    level: 'Professional',
    color: '#8b5cf6',
    blurb:
      'Advanced architecture: complex, multi-account, hybrid and migration scenarios. The growth target after SAA.',
    examGuideUrl:
      'https://aws.amazon.com/certification/certified-solutions-architect-professional/',
    feedUrl: 'https://aws.amazon.com/about-aws/whats-new/recent/feed/',
  },
  {
    id: 'devops-c02',
    code: 'DOP-C02',
    name: 'AWS Certified DevOps Engineer – Professional',
    level: 'Professional',
    color: '#ec4899',
    blurb:
      'Provision, operate and manage distributed systems with CI/CD, IaC, monitoring and automated governance.',
    examGuideUrl:
      'https://aws.amazon.com/certification/certified-devops-engineer-professional/',
    feedUrl: 'https://aws.amazon.com/about-aws/whats-new/recent/feed/',
  },
  {
    id: 'ans-c01',
    code: 'ANS-C01',
    name: 'AWS Certified Advanced Networking – Specialty',
    level: 'Specialty',
    color: '#06b6d4',
    blurb:
      'Design and maintain network architecture for AWS and hybrid connectivity at scale.',
    examGuideUrl:
      'https://aws.amazon.com/certification/certified-advanced-networking-specialty/',
    feedUrl: 'https://aws.amazon.com/about-aws/whats-new/recent/feed/',
  },
  {
    id: 'scs-c02',
    code: 'SCS-C02',
    name: 'AWS Certified Security – Specialty',
    level: 'Specialty',
    color: '#ef4444',
    blurb:
      'Specialized security topics: data protection, IAM, infrastructure security, incident response and logging.',
    examGuideUrl:
      'https://aws.amazon.com/certification/certified-security-specialty/',
    feedUrl: 'https://aws.amazon.com/about-aws/whats-new/recent/feed/',
  },
  {
    id: 'mls-c01',
    code: 'MLA-C01',
    name: 'AWS Certified Machine Learning Engineer – Associate',
    level: 'Associate',
    color: '#a855f7',
    blurb:
      'Build, train, deploy and operationalize ML workloads on AWS (SageMaker, data pipelines, MLOps).',
    examGuideUrl:
      'https://aws.amazon.com/certification/certified-machine-learning-engineer-associate/',
    feedUrl: 'https://aws.amazon.com/about-aws/whats-new/recent/feed/',
  },
  {
    id: 'aif-c01',
    code: 'AIF-C01',
    name: 'AWS Certified AI Practitioner',
    level: 'Foundational',
    color: '#f97316',
    blurb:
      'Foundational AI/ML and generative AI concepts on AWS: Bedrock, SageMaker, responsible AI and prompt engineering.',
    examGuideUrl:
      'https://aws.amazon.com/certification/certified-ai-practitioner/',
    feedUrl: 'https://aws.amazon.com/about-aws/whats-new/recent/feed/',
  },
];

export function getModule(id) {
  return MODULES.find((m) => m.id === id);
}
