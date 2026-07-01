const fs = require('fs');

const userQuestions = [
  {
    topic: "Storage",
    text: "The engineering team at a social media company has noticed that while some of the images stored in Amazon S3 are frequently accessed, others sit idle for a considerable span of time. As a solutions architect, what is your recommendation to build the MOST cost-effective solution?",
    options: [
      "Use S3 Standard for all images",
      "Use S3 Intelligent-Tiering",
      "Use S3 Glacier Flexible Retrieval",
      "Use S3 One Zone-IA"
    ],
    correctAnswer: 1,
    explanation: "S3 Intelligent-Tiering automatically moves objects between frequent and infrequent access tiers based on access patterns, making it ideal for data with unknown or changing access patterns."
  },
  {
    topic: "Networking & Content Delivery",
    text: "A company is developing a web-based application that will be used for real-time chat functionality. The application should use WebSocket APIs to maintain a persistent connection with the client. The backend services of the application, hosted in containers within private subnets of a VPC, need to be accessed securely. Which solution will meet these requirements?",
    options: [
      "Use Amazon CloudFront with an S3 origin",
      "Use a Network Load Balancer (NLB)",
      "Use an Application Load Balancer (ALB)",
      "Use AWS Global Accelerator"
    ],
    correctAnswer: 2,
    explanation: "Application Load Balancer (ALB) has native support for WebSockets and can securely route traffic to backend containers in private subnets."
  },
  {
    topic: "Storage",
    text: "A company is migrating from an on-premises infrastructure to the AWS Cloud. One of the company's applications stores files on a Windows file server farm that uses Distributed File System Replication (DFSR) to keep data in sync. A solutions architect needs to replace the file server farm. Which service should the solutions architect use?",
    options: [
      "Amazon EFS",
      "Amazon FSx for Windows File Server",
      "Amazon S3",
      "Amazon FSx for Lustre"
    ],
    correctAnswer: 1,
    explanation: "Amazon FSx for Windows File Server provides a fully managed native Microsoft Windows file system, including full support for the SMB protocol, Windows NTFS, and Microsoft Active Directory (AD) integration."
  },
  {
    topic: "Databases",
    text: "An Amazon RDS Read Replica is being deployed in a separate region. The master database is not encrypted but all data in the new region must be encrypted. How can this be achieved?",
    options: [
      "Enable encryption on the master database directly, then create the replica",
      "Create an encrypted snapshot of the master DB, restore it to a new encrypted master, and then create the cross-region replica",
      "Create an unencrypted cross-region read replica, then enable encryption on it",
      "Create a snapshot of the master, copy the snapshot to the new region and encrypt it during the copy, then restore to create the replica"
    ],
    correctAnswer: 3,
    explanation: "You cannot encrypt an existing unencrypted RDS instance directly. You must take a snapshot, copy the snapshot and encrypt it during the copy process, then restore the encrypted snapshot."
  },
  {
    topic: "Analytics",
    text: "A data analytics team at a global media firm is building a new analytics platform to process large volumes of both historical and real-time data. This data is stored in Amazon S3. The team wants to implement a serverless solution that allows them to query the data directly using SQL. Additionally, the solution must ensure that all data is encrypted at rest and automatically replicated to another AWS Region to support business continuity. Which solution will meet these requirements with the LEAST operational overhead?",
    options: [
      "Use Amazon Redshift to query the data, enable KMS encryption, and use AWS DataSync for replication",
      "Use Amazon Athena to query data directly from S3, enable S3 SSE-KMS, and configure S3 Cross-Region Replication (CRR)",
      "Use Amazon EMR to query the data, encrypt EBS volumes, and use S3 replication",
      "Use Amazon RDS to import and query data, enable Multi-AZ, and create a cross-region read replica"
    ],
    correctAnswer: 1,
    explanation: "Amazon Athena is a serverless interactive query service that lets you analyze data directly in S3 using standard SQL. S3 supports SSE-KMS for encryption and CRR for automatic cross-region replication."
  },
  {
    topic: "Networking & Content Delivery",
    text: "A startup has created a new web application for users to complete a risk assessment survey. The startup has purchased the domain survey.com using Amazon Route 53. The team would like to create a Route 53 record so that all traffic for survey.com is routed to www.survey.com. As a solutions architect, which of the following is the MOST cost-effective solution?",
    options: [
      "Run an EC2 instance to redirect traffic from survey.com to www.survey.com",
      "Use an Application Load Balancer to perform host-based routing",
      "Configure an Amazon S3 bucket for website hosting to redirect requests to www.survey.com",
      "Use AWS Lambda@Edge to rewrite the URL"
    ],
    correctAnswer: 2,
    explanation: "Amazon S3 allows you to configure a bucket for website hosting specifically to redirect requests to another domain. This is serverless and highly cost-effective compared to running EC2 or ALB."
  },
  {
    topic: "Management & Governance",
    text: "A company observed an increase in Amazon EC2 costs in its most recent bill. The billing team noticed unwanted vertical scaling of instance types for a couple of EC2 instances. A solutions architect needs to create a graph comparing the last 2 months of EC2 costs and perform an in-depth analysis to identify the root cause. How should the solutions architect generate the information with the LEAST operational overhead?",
    options: [
      "Use AWS Cost Explorer to visualize costs and analyze EC2 usage",
      "Export AWS Cost and Usage Reports to S3 and query with Amazon Athena",
      "Use Amazon CloudWatch billing alarms",
      "Write a Python script using the AWS Pricing API"
    ],
    correctAnswer: 0,
    explanation: "AWS Cost Explorer has an easy-to-use interface that lets you visualize, understand, and manage your AWS costs and usage over time, allowing for quick graphical analysis with zero overhead."
  },
  {
    topic: "Databases",
    text: "A Solutions Architect is migrating a distributed application from their on-premises environment into AWS. This application consists of an Apache Cassandra NoSQL database, a containerized Linux compute layer, and a Microsoft SQL Server database. The company wants as little operational overhead as possible with no schema conversion. Which services will provide the BEST solution?",
    options: [
      "Amazon DynamoDB, Amazon EC2, Amazon Aurora",
      "Amazon Keyspaces, Amazon ECS/EKS, Amazon RDS for SQL Server",
      "Amazon RDS for PostgreSQL, AWS Lambda, Amazon RDS for SQL Server",
      "Amazon DocumentDB, Amazon ECS, Amazon Redshift"
    ],
    correctAnswer: 1,
    explanation: "Amazon Keyspaces is compatible with Apache Cassandra. ECS or EKS can run the containerized Linux workloads. Amazon RDS for SQL Server provides a managed service without requiring schema conversion."
  },
  {
    topic: "Compute",
    text: "A company runs a financial application using an Amazon EC2 Auto Scaling group behind an Application Load Balancer (ALB). When running month-end reports on a specific day and time each month, the application becomes unacceptably slow. Amazon CloudWatch metrics show the CPU utilization hitting 100%. What should a solutions architect recommend?",
    options: [
      "Configure a scheduled scaling policy for the Auto Scaling group",
      "Configure a step scaling policy based on CPU utilization",
      "Change the instance type to a larger size",
      "Add an Amazon ElastiCache cluster to cache the reports"
    ],
    correctAnswer: 0,
    explanation: "Since the heavy workload occurs on a predictable schedule ('on a specific day and time each month'), a scheduled scaling policy allows you to scale up the capacity proactively before the traffic spike hits."
  },
  {
    topic: "Integration",
    text: "The engineering team has built a notification system using Amazon SNS which are then handled by an AWS Lambda function. During the peak season, the rate touches about 5000 requests per second and it is noticed that a significant number of the notifications are not being delivered. What is the BEST possible solution?",
    options: [
      "Increase the concurrent execution limit of the Lambda function",
      "Replace SNS with Amazon Kinesis Data Streams",
      "Put an Amazon SQS queue between SNS and the Lambda function",
      "Use an Application Load Balancer in front of Lambda"
    ],
    correctAnswer: 2,
    explanation: "Adding an Amazon SQS queue between SNS and Lambda (SNS to SQS fan-out) decoupling the architecture and acts as a buffer. It prevents the Lambda function from being overwhelmed by peak traffic, ensuring no messages are lost."
  }
];

const questionsPath = 'src/data/questions.json';
const existingData = JSON.parse(fs.readFileSync(questionsPath, 'utf8'));

// Filter out duplicates based on question text
const newItems = userQuestions.filter(uq => !existingData.some(eq => eq.text.substring(0, 30) === uq.text.substring(0, 30)));

const combined = [...existingData, ...newItems];

fs.writeFileSync(questionsPath, JSON.stringify(combined, null, 2));

console.log(`Added ${newItems.length} new user questions successfully.`);
