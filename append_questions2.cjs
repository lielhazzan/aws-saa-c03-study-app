const fs = require('fs');

const newQuestions = [
  {
    "topic": "VPC & Networking",
    "text": "A company wants to securely connect its on-premises data center to its AWS VPC. They require a dedicated, high-speed network connection that does not travel over the public internet. Which service should they use?",
    "options": ["AWS Site-to-Site VPN", "AWS Direct Connect", "AWS Transit Gateway", "VPC Peering"],
    "correctAnswer": 1,
    "explanation": "AWS Direct Connect provides a dedicated private network connection from on-premises to AWS, bypassing the public internet."
  },
  {
    "topic": "Compute",
    "text": "You are designing an architecture for an application that processes video files. The processing is highly parallelizable and can be interrupted without issues. Which EC2 purchasing option will be the most cost-effective?",
    "options": ["On-Demand Instances", "Reserved Instances", "Spot Instances", "Dedicated Hosts"],
    "correctAnswer": 2,
    "explanation": "Spot Instances are the most cost-effective for workloads that are fault-tolerant and can handle interruptions."
  },
  {
    "topic": "Storage",
    "text": "A media company needs a shared file system that can be mounted simultaneously by hundreds of Amazon EC2 instances running Windows. Which service should they use?",
    "options": ["Amazon EFS", "Amazon EBS Multi-Attach", "Amazon FSx for Windows File Server", "Amazon S3"],
    "correctAnswer": 2,
    "explanation": "Amazon FSx for Windows File Server provides a fully managed native Windows file system that supports SMB protocol."
  },
  {
    "topic": "Databases",
    "text": "An e-commerce website uses Amazon RDS for MySQL. During peak shopping seasons, the database experiences heavy read traffic, causing performance issues. How can a Solutions Architect improve read performance?",
    "options": ["Enable Multi-AZ", "Create a Read Replica", "Migrate to Amazon DynamoDB", "Increase the EBS volume size"],
    "correctAnswer": 1,
    "explanation": "Read Replicas allow you to offload read-heavy workloads from the primary database instance."
  },
  {
    "topic": "Security",
    "text": "A company needs to ensure that all data stored in Amazon S3 is protected against accidental deletion. Which feature should be enabled?",
    "options": ["S3 Block Public Access", "S3 Versioning", "S3 Server-Side Encryption", "S3 Transfer Acceleration"],
    "correctAnswer": 1,
    "explanation": "S3 Versioning keeps multiple variants of an object. If an object is deleted, it can be restored from a previous version."
  },
  {
    "topic": "Serverless",
    "text": "A startup is building a microservices architecture. They need a fully managed service to route API requests to various AWS Lambda functions. Which service is appropriate?",
    "options": ["Amazon API Gateway", "Application Load Balancer", "AWS AppSync", "Amazon CloudFront"],
    "correctAnswer": 0,
    "explanation": "Amazon API Gateway is a fully managed service that makes it easy to create, publish, maintain, monitor, and secure APIs."
  },
  {
    "topic": "Management",
    "text": "A company wants to automatically receive an alert if their monthly AWS spending exceeds $1,000. Which tool should they use?",
    "options": ["AWS Cost Explorer", "AWS Budgets", "AWS Trusted Advisor", "Amazon CloudWatch Billing Alarms"],
    "correctAnswer": 1,
    "explanation": "AWS Budgets gives you the ability to set custom budgets that alert you when your costs or usage exceed your budgeted amount."
  },
  {
    "topic": "Global Infrastructure",
    "text": "A global gaming company needs to accelerate the performance of their UDP-based multiplayer game for users around the world. Which AWS service should they use?",
    "options": ["Amazon CloudFront", "AWS Global Accelerator", "Amazon Route 53", "AWS Transit Gateway"],
    "correctAnswer": 1,
    "explanation": "AWS Global Accelerator improves the availability and performance of your applications with local or global users using the AWS global network. It supports TCP and UDP."
  },
  {
    "topic": "VPC & Networking",
    "text": "You have a web server in a public subnet and a database in a private subnet. The web server needs to communicate with the database, but the database must not be reachable from the internet. How should the security groups be configured?",
    "options": ["Allow all inbound traffic on the database security group.", "Configure the database security group to allow inbound traffic only from the web server's security group.", "Configure the web server security group to allow inbound traffic from the database subnet.", "Use a Network ACL to block all inbound traffic to the database subnet."],
    "correctAnswer": 1,
    "explanation": "Security groups can reference other security groups. By allowing inbound traffic on the DB security group only from the Web security group, you ensure secure access."
  },
  {
    "topic": "Storage",
    "text": "A company needs to store massive amounts of archive data. The data must be stored for 10 years and will rarely be accessed. Retrieval times of up to 12 hours are acceptable. What is the most cost-effective storage option?",
    "options": ["Amazon S3 Standard", "Amazon S3 Glacier Flexible Retrieval", "Amazon S3 Glacier Deep Archive", "Amazon EBS Cold HDD (sc1)"],
    "correctAnswer": 2,
    "explanation": "Amazon S3 Glacier Deep Archive is the lowest-cost storage class and supports retrieval times within 12 hours."
  },
  {
    "topic": "Databases",
    "text": "A company is migrating a Cassandra database to AWS. They want a fully managed, highly available, and scalable NoSQL database service that is compatible with Cassandra. Which service should they choose?",
    "options": ["Amazon DynamoDB", "Amazon Keyspaces (for Apache Cassandra)", "Amazon RDS", "Amazon DocumentDB"],
    "correctAnswer": 1,
    "explanation": "Amazon Keyspaces is a scalable, highly available, and managed Apache Cassandra-compatible database service."
  },
  {
    "topic": "Analytics",
    "text": "A data engineering team needs a service to query data directly from files stored in Amazon S3 using standard SQL. Which serverless querying service should they use?",
    "options": ["Amazon Redshift", "Amazon Athena", "Amazon EMR", "AWS Glue"],
    "correctAnswer": 1,
    "explanation": "Amazon Athena is an interactive query service that makes it easy to analyze data in Amazon S3 using standard SQL."
  },
  {
    "topic": "Security",
    "text": "A company wants to enforce a rule that all EC2 instances must be tagged with a 'Department' tag. Which AWS service can be used to monitor and evaluate this compliance rule automatically?",
    "options": ["AWS Config", "AWS CloudTrail", "AWS IAM", "Amazon Inspector"],
    "correctAnswer": 0,
    "explanation": "AWS Config allows you to assess, audit, and evaluate the configurations of your AWS resources, including checking for specific tags."
  },
  {
    "topic": "Compute",
    "text": "A company is designing a high-performance computing (HPC) cluster. They need the lowest possible network latency and highest network throughput between EC2 instances. Which deployment strategy should they use?",
    "options": ["Deploy instances in multiple Availability Zones.", "Deploy instances in a Cluster Placement Group.", "Deploy instances in a Spread Placement Group.", "Deploy instances in a Partition Placement Group."],
    "correctAnswer": 1,
    "explanation": "A Cluster Placement Group packs instances close together inside an Availability Zone. This strategy enables workloads to achieve the low latency network performance necessary for tightly-coupled node-to-node communication."
  },
  {
    "topic": "Storage",
    "text": "An application requires an Amazon EBS volume that provides the highest possible IOPS for a critical, mission-critical relational database. Which EBS volume type should be used?",
    "options": ["General Purpose SSD (gp3)", "Provisioned IOPS SSD (io2)", "Throughput Optimized HDD (st1)", "Cold HDD (sc1)"],
    "correctAnswer": 1,
    "explanation": "Provisioned IOPS SSD (io1/io2) volumes are designed to meet the needs of I/O-intensive workloads, particularly database workloads, that are sensitive to storage performance and consistency."
  }
];

const existingPath = './src/data/questions.json';
const existing = require(existingPath);

let nextId = existing.length > 0 ? Math.max(...existing.map(q => q.id)) + 1 : 1;

for (const q of newQuestions) {
  q.id = nextId++;
  existing.push(q);
}

fs.writeFileSync(existingPath, JSON.stringify(existing, null, 2));
console.log(`Added ${newQuestions.length} questions. Total: ${existing.length}`);
