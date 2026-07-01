const fs = require('fs');

const rawText = `
Q1. A company is in the process of improving its security posture and wants to analyze and rectify a high volume of failed login attempts and unauthorized activities being logged in AWS CloudTrail.
What is the most efficient solution to help the company identify these security events with the LEAST amount of operational effort?

   A) Leverage AWS Lambda to trigger on CloudTrail log updates and use a custom script to scan for failed logins and unauthorized actions.
   B) Implement Amazon Elasticsearch Service with Kibana to visualize the CloudTrail logs and manually search for these events.
   C) Utilize AWS Data Pipeline to regularly extract CloudTrail logs and use a custom script to identify the required security events.
   D) Use Amazon Athena to directly query CloudTrail logs for failed logins and unauthorized activities.

Answer: D
------------------------------------------------------------

Q2. A digital media company uses an Amazon RDS MySQL instance for its content management system. Recently, the company has observed that their RDS instance is nearing its storage capacity due to the constant influx of new data. The company wants to ensure there's always sufficient storage without any operational interruption or manual intervention. Which solution should the company use to address this situation with the LEAST operational overhead?

   A) Enable automatic storage scaling for the MySQL instance on Amazon RDS
   B) Modify the DB instance manually to increase the allocated storage whenever it reaches 80% capacity
   C) Migrate the MySQL instance to Amazon DynamoDB
   D) Create a new Amazon RDS for MySQL DB instance with a larger storage capacity and migrate to the new DB instance

Answer: A
------------------------------------------------------------

Q3. The database tier of a web application is running on a Windows server on-premises. The database is a Microsoft SQL Server database. The application owner would like to migrate the database to an Amazon RDS instance. How can the migration be executed with minimal administrative effort and downtime?

   A) Use the AWS Database Migration Service (DMS) to directly migrate the database to RDS
   B) Use AWS DataSync to migrate the data from the database to Amazon S3. Use AWS Database Migration Service (DMS) to migrate the database to RDS
   C) Detach the SQL Server database and copy it to Amazon S3. Restore the database onto RDS
   D) Drop the database. Backup the Microsoft SQL Server database. Restore the backup onto RDS

Answer: A
------------------------------------------------------------

Q4. A leading online gaming company is migrating its flagship application to AWS Cloud for delivering its online games to users across the world. The company would like to use a Network Load Balancer to handle millions of requests per second. The engineering team has provisioned multiple instances in a public subnet and specified these instance IDs as the targets for the NLB. As a solutions architect, can you help the engineering team understand the correct routing mechanism for these target instances?

   A) Traffic is routed to instances using the primary private IP address specified in the primary network interface for the instance
   B) Traffic is routed to instances using the primary public IP address specified in the primary network interface for the instance
   C) Traffic is routed to instances using the primary elastic IP address specified in the primary network interface for the instance
   D) Traffic is routed to instances using the instance ID specified in the primary network interface for the instance

Answer: A
------------------------------------------------------------

Q5. A developer in your company has set up a classic 2 tier architecture consisting of an Application Load Balancer and an Auto Scaling group (ASG) managing a fleet of Amazon EC2 instances. The Application Load Balancer is deployed in a subnet of size 10.0.1.0/24 and the Auto Scaling group is deployed in a subnet of size 10.0.4.0/22. As a solutions architect, you would like to adhere to the security pillar of the well-architected framework. How do you configure the security group of the Amazon EC2 instances to only allow traffic coming from the Application Load Balancer?

   A) Add a rule to allow the security group of the Application Load Balancer
   B) Add a rule to allow the CIDR 10.0.1.0/24
   C) Add a rule to allow the CIDR 10.0.0.0/22
   D) Add a rule to allow the CIDR 10.0.4.0/22

Answer: A
------------------------------------------------------------

Q6. A retail startup runs a high-traffic order processing system on AWS. The architecture includes a frontend web tier using EC2 instances behind an Application Load Balancer, a processing tier powered by EC2 instances, and a data layer using Amazon DynamoDB. The frontend and processing tiers are decoupled using Amazon SQS. Recently, the engineering team observed that during unpredictable traffic surges, order processing slows down significantly, SQS queue depth increases rapidly, and the processing-tier EC2 instances hit 100% CPU usage. Which solution will help improve the application's responsiveness and scalability during peak load periods?

   A) Replace the SQS queue with Amazon Kinesis Data Streams. Use enhanced fan-out to distribute messages to multiple EC2 consumers
   B) Enable Amazon SQS long polling and increase the EC2 instance size in the processing tier
   C) Configure the processing tier Auto Scaling group to scale based on the SQS ApproximateNumberOfMessagesVisible metric
   D) Use Amazon EventBridge to replace SQS and trigger EC2 processing instances directly when orders arrive

Answer: C
------------------------------------------------------------

Q7. You would like to use AWS Snowball to move on-premises backups into a long term archival tier on AWS. Which solution provides the MOST cost savings?

   A) Create a Snowball job to import data into Amazon S3 Glacier Deep Archive directly
   B) Create a Snowball job to import data into Amazon S3. Then use a lifecycle policy to transition the data into Amazon S3 Glacier Deep Archive
   C) Create a Snowball job to import data into Amazon S3 Glacier Flexible Retrieval directly
   D) Create a Snowball job to import data into Amazon S3. Then use a lifecycle policy to transition the data into Amazon S3 Glacier Flexible Retrieval

Answer: B
------------------------------------------------------------

Q8. A media streaming startup is building a set of backend APIs that will be consumed by external mobile applications. To prevent API abuse, protect downstream resources, and ensure fair usage across clients, the architecture must enforce rate limiting and throttling on a per-client basis. The team also wants to define usage quotas and apply different limits to different API consumers. Which solution should the team implement to enforce rate limiting and usage quotas at the API layer?

   A) Use Amazon API Gateway with usage plans and API keys to enforce per-client throttling and quotas
   B) Deploy the APIs behind an Application Load Balancer and configure connection draining to throttle per-client requests
   C) Use AWS WAF with rate-based rules and attach it to an Application Load Balancer to throttle requests
   D) Implement an AWS Lambda authorizer to count requests per client and return a 429 response when the limit is exceeded

Answer: A
------------------------------------------------------------

Q9. A cloud architect is assessing the resilience of a web application deployed on AWS. It was observed that the application experienced a downtime of about 3 minutes when a scheduled failover was performed on the application's Amazon RDS MySQL database as part of a scaling operation. The organization wants to mitigate such downtime in future scaling exercises while minimizing operational overhead. Which solution will be the MOST effective in achieving this?

   A) Utilize Amazon RDS Proxy in front of the Amazon RDS MySQL database
   B) Configure an Amazon RDS read replica in the same AZ and use it as a target for the failover
   C) Implement Amazon ElastiCache to cache queries to reduce load on the Amazon RDS MySQL database during future scaling operations
   D) Enable AWS Auto Scaling for Amazon RDS and configure scaling policies that gradually scale up the RDS database

Answer: A
------------------------------------------------------------

Q10. An e-commerce company operates a containerized microservices application on a fleet of Amazon EC2 instances. As part of their infrastructure improvement efforts, the company plans to migrate the application to Amazon Elastic Kubernetes Service (Amazon EKS) for enhanced scalability and management. As part of the security protocol, the company has configured the Amazon EKS control plane with endpoint private access enabled and public access disabled. The data plane resides within private subnets. However, the company faces an issue where nodes fail to join the cluster. What can be done to allow the nodes to join the EKS cluster?

   A) Configure a NAT gateway to allow the nodes in the private subnets to communicate with the EKS control plane
   B) Create an interface VPC endpoint for the EKS service. Ensure that the nodes can resolve the private endpoint hostname
   C) Enable public access to the EKS control plane temporarily until all nodes have successfully joined the cluster
   D) Move the EKS worker nodes to public subnets to ensure they can communicate with the control plane

Answer: B
------------------------------------------------------------

Q11. Which of the following IAM policies provides read-only access to the Amazon S3 bucket mybucket and its content?

   A) { "Version":"2012-10-17", "Statement":[{ "Effect":"Allow", "Action":["s3:ListBucket","s3:GetObject"], "Resource":"arn:aws:s3:::mybucket" }] }
   B) { "Version":"2012-10-17", "Statement":[{ "Effect":"Allow", "Action":["s3:ListBucket","s3:GetObject"], "Resource":"arn:aws:s3:::mybucket/*" }] }
   C) { "Version":"2012-10-17", "Statement":[{ "Effect":"Allow", "Action":["s3:ListBucket"], "Resource":"arn:aws:s3:::mybucket" }, { "Effect":"Allow", "Action":["s3:GetObject"], "Resource":"arn:aws:s3:::mybucket/*" }] }
   D) { "Version":"2012-10-17", "Statement":[{ "Effect":"Allow", "Action":["s3:GetObject"], "Resource":"arn:aws:s3:::mybucket/*" }] }

Answer: C
------------------------------------------------------------

Q12. A global logistics company hosts its shipment tracking system in the eu-west-1 Region. The system runs on Amazon EC2 instances, and customers access the shipment tracking API to retrieve real-time updates about their packages. Customers from Asia and South America report slower API response times compared to customers in Europe. The company wants to improve API response times for international customers in a cost-effective manner. Which solution will meet these requirements MOST cost-effectively?

   A) Enable Amazon CloudFront in front of the API and configure a cache behavior to cache the API responses with appropriate TTLs
   B) Migrate the EC2 instances to AWS Lambda functions and deploy the API to AWS regions in Asia and South America
   C) Use AWS Global Accelerator to route API traffic from Asia and South America to the eu-west-1 region
   D) Create additional EC2 instances in AWS regions in Asia and South America and use Amazon Route 53 latency-based routing

Answer: C
------------------------------------------------------------

Q13. An educational content provider has accumulated several terabytes of learning resources in an Amazon S3 bucket located in a specific AWS Region. A partner organization, based in a different AWS Region, has been granted access to the S3 bucket to retrieve the resources for integration into its own platform. The content provider wants to minimize its data transfer costs when the partner organization accesses the S3 bucket. Which solution will meet these requirements?

   A) Create an S3 bucket in the partner's Region. Use S3 Cross-Region Replication to copy the content. Update the partner's access to use the bucket in their Region
   B) Use Amazon CloudFront to deliver the S3 content to the partner organization. Configure a CloudFront distribution with the S3 bucket as the origin
   C) Enable S3 Transfer Acceleration on the bucket and provide the partner organization with the Transfer Acceleration endpoint to use for requests
   D) Instruct the partner organization to use the S3 URL of the bucket and download the resources directly. Use S3 Intelligent-Tiering to optimize costs

Answer: A
------------------------------------------------------------

Q14. As an e-sport tournament hosting company, you have servers that need to scale and be highly available. Therefore you have deployed an Elastic Load Balancing (ELB) with an Auto Scaling group (ASG) across 3 Availability Zones (AZs). When e-sport tournaments are running, the servers need to scale quickly. And when tournaments are done, the servers can be idle. As a general rule, you would like to be highly available, have the capacity to scale and optimize your costs. What do you recommend? (Select two)

   A) Use Reserved Instances for the minimum capacity
   B) Use Dedicated Hosts for the minimum capacity
   C) Use On-Demand instances for the minimum capacity
   D) Use Spot Instances for the minimum capacity
   E) Use Spot Instances for the extra capacity

Answer: A, E
------------------------------------------------------------

Q15. A security consultant is designing a solution for a company that wants to provide developers with individual AWS accounts through AWS Organizations, while also maintaining standard security controls. Since the individual developers will have AWS account root user-level access to their own accounts, the consultant wants to ensure that the mandatory AWS CloudTrail configuration that is applied to new developer accounts is not modified. Which of the following actions meets the given requirements?

   A) Create an SCP that prohibits changes to CloudTrail and apply it to the organizational unit (OU) that contains the developer accounts
   B) Create an IAM policy that prohibits changes to CloudTrail and attach it to the root user
   C) Set up a notification through Amazon SNS to warn when CloudTrail is modified within the developer accounts
   D) Apply an IAM policy to the OU that prohibits changes to CloudTrail

Answer: A
------------------------------------------------------------

Q16. A company requires a fully managed replacement for an on-premises storage service. The company's employees often work remotely from various locations. The solution should also be easily accessible to systems connected to the on-premises environment. Which solution meets these requirements?

   A) Amazon FSx for Windows File Server
   B) AWS Storage Gateway - Volume Gateway
   C) Amazon Elastic File System (EFS)
   D) Amazon WorkDocs

Answer: D
------------------------------------------------------------

Q17. An enterprise is building a secure business intelligence API using Amazon API Gateway to serve internal users with confidential analytics data. The API must be accessible only from a set of trusted IP addresses that are part of the organization's internal network ranges. No external IP traffic should be able to invoke the API. A solutions architect must design this access control mechanism with the least operational complexity. What should the architect do to meet these requirements?

   A) Create a private REST API with a resource policy that allows access only from the specified IP ranges. Deploy the API as a private API and use a VPC endpoint for access
   B) Create a public REST API. Attach an AWS WAF Web ACL with an IP set match condition that allows only the trusted IP ranges and associate it with the API Gateway stage
   C) Create a public REST API. Configure an authorizer Lambda function that inspects the source IP of each request and returns a Deny policy for any IP outside the trusted range
   D) Create a public REST API with a resource policy that explicitly denies all traffic except from the specified IP ranges

Answer: B
------------------------------------------------------------

Q18. A company is planning to migrate a large quantity of important data to Amazon S3. The data will be uploaded to a versioning enabled bucket in the us-west-1 Region. The solution needs to include replication of the data to another Region for disaster recovery purposes. How should a solutions architect configure the replication?

   A) Create an S3 Multi-Region Access Points and configure replication
   B) Enable Cross-Region Replication (CRR) on the source bucket
   C) Enable Same-Region Replication (SRR) on the source bucket
   D) Replication is automatically enabled when you enable versioning

Answer: B
------------------------------------------------------------

Q19. A development team requires permissions to list an Amazon S3 bucket and delete objects from that bucket. A systems administrator has created the following IAM policy... The group is not able to delete objects in the bucket. Which statement should a solutions architect add to the policy to address this issue?

   A) {"Action":["s3:DeleteObject"],"Resource":["arn:aws:s3:::example-bucket/*"],"Effect":"Allow"}
   B) {"Action":["s3:DeleteBucket"],"Resource":["arn:aws:s3:::example-bucket"],"Effect":"Allow"}
   C) {"Action":["s3:ListBucket"],"Resource":["arn:aws:s3:::example-bucket/*"],"Effect":"Allow"}
   D) {"Action":["s3:DeleteObject"],"Resource":["arn:aws:s3:::example-bucket"],"Effect":"Allow"}

Answer: A
------------------------------------------------------------

Q20. A healthcare startup is modernizing its monolithic Python-based analytics application by transitioning to a microservices architecture on AWS. As a pilot, the team wants to refactor one module into a standalone microservice that can handle hundreds of requests per second. They are seeking an AWS-native solution that supports Python, scales automatically with traffic, and requires minimal infrastructure management and operational overhead to build, test, and deploy the service efficiently. Which AWS solution best meets these requirements?

   A) Deploy the microservice on Amazon EC2 instances with an Auto Scaling group and an Application Load Balancer. Use AWS CodePipeline for CI/CD
   B) Package the microservice in a Docker container. Deploy it to Amazon ECS using the Fargate launch type and expose it via an Application Load Balancer
   C) Use AWS Elastic Beanstalk with a Python platform to host the microservice and configure auto-scaling via the Beanstalk environment
   D) Use AWS Lambda to implement the microservice logic and expose it through Amazon API Gateway

Answer: D
------------------------------------------------------------

Q21. The content division at a digital media agency has an application that generates a large number of files on Amazon S3, each approximately 10 megabytes in size. The agency mandates that the files be stored for 5 years before they can be deleted. The files are frequently accessed in the first 30 days of the object creation but are rarely accessed after the first 30 days. The files contain critical business data that is not easy to reproduce, therefore, immediate accessibility is always required. Which solution is the MOST cost-effective for the given use case?

   A) Set up an Amazon S3 bucket lifecycle policy to move files from Amazon S3 Standard to Amazon S3 Standard-IA 30 days after object creation. Archive the files to Amazon S3 Glacier Deep Archive 5 years after object creation
   B) Set up an Amazon S3 bucket lifecycle policy to move files from Amazon S3 Standard to Amazon S3 Glacier Flexible Retrieval 30 days after object creation. Delete the files 5 years after object creation
   C) Set up an Amazon S3 bucket lifecycle policy to move files from Amazon S3 Standard to Amazon S3 Standard-IA 30 days after object creation. Delete the files 5 years after object creation
   D) Set up an Amazon S3 bucket lifecycle policy to move files from Amazon S3 Standard to Amazon S3 Intelligent-Tiering 30 days after object creation. Delete the files 5 years after object creation

Answer: C
------------------------------------------------------------

Q22. An edtech startup runs its course-management platform inside a private subnet in a VPC on AWS. The application uses Amazon Cognito user pools for authentication. Now, the team wants to extend the application so that authenticated users can upload and access personal course-related documents in Amazon S3. The solution must ensure scalable, fine-grained and secure access control to the S3 bucket and maintain private network architecture for the application. Which combination of steps will enable secure S3 integration for this workload? (Select two)

   A) Use Amazon Cognito identity pools to grant authenticated users temporary AWS credentials that allow scoped access to the S3 bucket using IAM roles
   B) Create a Gateway VPC endpoint for Amazon S3 and configure the route table of the private subnet to direct S3 traffic through the endpoint
   C) Assign a bucket ACL that grants read and write permissions to all authenticated AWS users
   D) Generate pre-signed URLs using static AWS IAM user credentials and share them with authenticated Cognito users for S3 access
   E) Create an Interface VPC endpoint for Amazon S3 and configure the security group to allow HTTPS traffic from the private subnet

Answer: A, B
------------------------------------------------------------

Q23. An application that is being installed on an Amazon EC2 instance requires a persistent block storage volume. The data must be encrypted at rest and regular volume-level backups must be automated. Which solution options should be used?

   A) Use Amazon S3 for block storage. Enable server-side encryption. Use Amazon S3 lifecycle policies to automate backups
   B) Use Amazon EBS for block storage. Enable EBS encryption. Use AWS Backup to automate backups
   C) Use Amazon EBS for block storage. Enable EBS encryption. Use Amazon DLM to automate backups
   D) Use Amazon EFS for block storage. Enable EFS encryption. Use AWS Backup to automate backups

Answer: C
------------------------------------------------------------

Q24. The engineering team at a retail company is planning to migrate to AWS Cloud from the on-premises data center. The team is evaluating Amazon RDS Multi-AZ capabilities. Which of the following would you identify as correct for Amazon RDS Multi-AZ? (Select two)

   A) To enhance read scalability, a Multi-AZ standby instance can be used to serve read requests
   B) Updates to your DB Instance are synchronously replicated across Availability Zones to the standby instance to keep both in sync
   C) In the event of planned DB maintenance, DB instance failure, or an AZ failure, Amazon RDS will automatically failover to the standby so that DB operations can resume quickly without administrative intervention
   D) Amazon RDS Multi-AZ failover is triggered when the DB Instance is modified by the database user
   E) For automated backups, I/O activity is no longer suspended on your primary DB because backups are taken from the standby

Answer: B, C
------------------------------------------------------------

Q25. An IT company wants to optimize the costs incurred on its fleet of 100 Amazon EC2 instances for the next year. Based on historical analyses, the engineering team observed that 70 of these instances handle the compute services of its flagship application and need to be always available. The other 30 instances are used to handle batch jobs that can afford a delay in processing. As a solutions architect, which of the following would you recommend as the MOST cost-optimal solution?

   A) Purchase 70 reserved instances and use spot instances for the remaining 30 instances
   B) Purchase 70 on-demand instances and use spot instances for the remaining 30 instances
   C) Purchase 70 reserved instances and use on-demand instances for the remaining 30 instances
   D) Purchase all 100 on-demand instances

Answer: A
------------------------------------------------------------

Q26. A developer has configured inbound traffic for the relevant ports in both the Security Group of the Amazon EC2 instance as well as the Network Access Control List (Network ACL) of the subnet for the Amazon EC2 instance. The developer is, however, unable to connect to the service running on the Amazon EC2 instance. As a solutions architect, how will you fix this issue?

   A) Network ACLs are stateless, so you must also allow outbound traffic over the ephemeral port range
   B) IAM Role defined in the Security Group is different from the IAM Role that the developer is using
   C) Security Groups are stateless, so you must also allow outbound traffic over the ephemeral port range
   D) Network ACL does not support Allow rule, so the user was wrong to configure Allow rules in both Network ACL and Security Group

Answer: A
------------------------------------------------------------

Q27. The DevOps team at a major financial services company uses Multi-Availability Zone (Multi-AZ) deployment for its MySQL Amazon RDS database in order to automate its database replication and augment data durability. The DevOps team has scheduled a maintenance window for a database engine level upgrade for the coming weekend. Which of the following is the correct outcome during the maintenance window?

   A) The standby DB instance is upgraded first, then a failover occurs and the primary DB instance is upgraded
   B) Both the primary and standby DB instances are upgraded at the same time
   C) The primary DB instance is upgraded first, then a failover occurs and the standby DB instance is upgraded
   D) The primary DB instance is taken offline for the duration of the upgrade and both primary and standby DB instances can only be in the same state

Answer: A
------------------------------------------------------------

Q28. A company allows its developers to attach existing IAM policies to existing IAM roles to enable faster experimentation and agility. However, the security operations team is concerned that the developers could attach the existing administrator policy, which would allow the developers to circumvent any other security policies. How should a solutions architect address this issue?

   A) Set an IAM permissions boundary on the developer IAM role that restricts the managed policies that can be attached by the developers
   B) Validate that the developer IAM role has no policies attached
   C) Create an Amazon SNS topic to send alerts every time a developer creates a new policy
   D) Use AWS Shield Advanced to manage the IAM roles

Answer: A
------------------------------------------------------------

Q29. A Solutions Architect has been tasked with re-deploying an application running on AWS to enable high availability. The application processes messages that are received in an ActiveMQ queue running on a single Amazon EC2 instance. Messages are then processed by a consumer application running on Amazon EC2. After processing the messages the consumer application writes results to a MySQL database running on Amazon EC2. Which architecture offers the highest availability and low operational complexity?

   A) Use Amazon MQ with a broker for ActiveMQ. Process the messages using Lambda functions with an Amazon MQ trigger. Store the results in an Amazon RDS for MySQL Multi-AZ DB instance
   B) Use Amazon MQ with a broker for ActiveMQ. Process the messages using Lambda functions with an Amazon MQ trigger. Store the results in an Amazon DynamoDB table
   C) Use Amazon SQS to queue the messages. Process the messages using a fleet of EC2 instances in an Auto Scaling group. Store the results in an Amazon RDS for MySQL Multi-AZ DB instance
   D) Use Amazon MQ with an active/standby broker for ActiveMQ. Process the messages using Lambda functions with an Amazon MQ trigger. Store the results in an Amazon RDS for MySQL Multi-AZ DB instance

Answer: D
------------------------------------------------------------

Q30. An enterprise runs a critical Oracle database workload in its on-premises environment. The company now plans to replicate both existing records and continuous transactional changes to a managed Oracle environment in AWS. The target database will run on Amazon RDS for Oracle. Data transfer volume is expected to fluctuate throughout the day, and the team wants the solution to provision compute resources automatically based on actual workload requirements. Which solution will meet these requirements?

   A) Use AWS Snowball to perform the initial data migration. Configure AWS DataSync to continuously replicate transactional changes to Amazon RDS for Oracle
   B) Use AWS DMS Serverless to configure a migration task that handles both the full-load migration of existing data and ongoing change data capture (CDC) replication
   C) Configure AWS Direct Connect for continuous data replication. Use AWS Schema Conversion Tool (SCT) for the initial load
   D) Export the Oracle database using Oracle Data Pump. Import the dump file into Amazon RDS for Oracle. Use AWS DMS with CDC to replicate ongoing changes

Answer: B
------------------------------------------------------------

Q31. An ivy-league university is assisting NASA to find potential landing sites for exploration vehicles of unmanned missions to our neighboring planets. The university uses High Performance Computing (HPC) driven application architecture to identify these landing sites. Which of the following Amazon EC2 instance topologies should this application be deployed on?

   A) The Amazon EC2 instances should be deployed in a partition placement group so that distributed workloads can be handled effectively
   B) The Amazon EC2 instances should be deployed in a spread placement group so that there are no correlated failures
   C) The Amazon EC2 instances should be deployed in a cluster placement group so that the underlying workload can benefit from low network latency and high network throughput
   D) The Amazon EC2 instances should be deployed in an Auto Scaling group so that application meets high availability requirements

Answer: C
------------------------------------------------------------

Q32. An application uses an Amazon RDS database and Amazon EC2 instances in a web tier. The web tier instances must not be directly accessible from the internet to improve security. How can a Solutions Architect meet these requirements?

   A) Launch the web tier instances in a public subnet and create an Application Load Balancer in a private subnet
   B) Launch the web tier instances in private subnets and create an Application Load Balancer in a public subnet
   C) Launch the web tier instances in a public subnet and use AWS WAF to protect the instances from internet-based attacks
   D) Launch the web tier instances in private subnets and deploy NAT Gateways in each private subnet

Answer: B
------------------------------------------------------------

Q33. A logistics company runs a two-step job handling process on AWS. The first step quickly receives job submissions from clients, while the second step requires longer processing time to complete each job. Currently, both steps run on separate Amazon EC2 Auto Scaling groups. However, during high-demand hours, the job processing stage falls behind, and there is concern that jobs may be lost due to instance termination during scaling events. Which solution will meet these requirements?

   A) Connect the two tiers directly via an Amazon EventBridge rule that forwards job submissions from the first tier's EC2 instances to the second tier's EC2 instances
   B) Use an Amazon SQS queue between the two tiers. Configure the second-tier Auto Scaling group to scale based on the SQS queue depth metric
   C) Configure the first-tier EC2 instances to write job data directly to Amazon S3. Set up an S3 event notification to trigger an AWS Lambda function for processing each job
   D) Use Amazon Kinesis Data Streams to pass the job data from the first tier to the second tier. Configure the Kinesis stream with enough shards to handle peak demand

Answer: B
------------------------------------------------------------

Q34. A mobile app allows users to submit photos, which are stored in an Amazon S3 bucket. Currently, a batch of Amazon EC2 Spot Instances is launched nightly to process all the day's uploads. Each photo requires approximately 3 minutes and 512 MB of memory to process. To improve responsiveness and minimize costs, the company wants to shift to near real-time image processing that begins as soon as an image is uploaded. Which solution will provide the MOST cost-effective and scalable architecture?

   A) Configure an S3 event notification to trigger an AWS Lambda function when photos are uploaded. Process each image in the Lambda function
   B) Configure an S3 event notification to publish a message to an Amazon SNS topic when photos are uploaded. Subscribe an SQS queue to the SNS topic and configure an EC2 Auto Scaling group to process messages from the queue
   C) Configure an S3 event notification to publish a message to an Amazon SQS queue when photos are uploaded. Configure an AWS Lambda function to poll the SQS queue and process the images
   D) Configure an S3 event notification to trigger an AWS Step Functions workflow when a photo is uploaded. Use an AWS Lambda function within the workflow to process each image

Answer: C
------------------------------------------------------------

Q35. A company runs an application in an on-premises data center that collects environmental data from production machinery. The data consists of JSON files stored on network attached storage (NAS) and around 5 TB of data is collected each day. The company must upload this data to Amazon S3 where it can be processed by an analytics application. The data must be transferred securely. Which solution offers the MOST reliable and time-efficient data transfer?

   A) Use AWS DataSync to securely transfer the data to an Amazon S3 bucket
   B) Use the AWS CLI to copy the data from the data center to Amazon S3
   C) Use AWS Snowball Edge Storage Optimized to migrate the data
   D) Use Amazon Kinesis Data Streams to stream the data to Amazon S3

Answer: A
------------------------------------------------------------

Q36. A company requires a high-performance file system that can be mounted on Amazon EC2 Windows instances and Amazon EC2 Linux instances. Applications running on the EC2 instances perform separate processing of the same files and the solution must provide a file system that can be mounted by all instances simultaneously. Which solution meets these requirements?

   A) Use Amazon EBS Multi-Attach on a Provisioned IOPS SSD (io1) volume
   B) Create an Amazon S3 bucket and use it as a file system for the EC2 instances
   C) Use Amazon FSx for Lustre as a high-performance parallel file system
   D) Use Amazon Elastic File System (EFS) with the default Linux ACL permissions

Answer: C
------------------------------------------------------------

Q37. The IT department at a consulting firm is conducting a training workshop for new developers. The new developers were asked to identify the invalid storage class lifecycle transitions for objects stored on Amazon S3. Can you spot the INVALID lifecycle transitions? (Select two)

   A) Amazon S3 Standard-IA => Amazon S3 Intelligent-Tiering
   B) Amazon S3 Standard => Amazon S3 Intelligent-Tiering
   C) Amazon S3 One Zone-IA => Amazon S3 Standard-IA
   D) Amazon S3 Standard-IA => Amazon S3 One Zone-IA
   E) Amazon S3 Intelligent-Tiering => Amazon S3 Standard

Answer: C, E
------------------------------------------------------------

Q38. A company runs a business-critical application in the us-east-1 Region. The application uses an Amazon Aurora MySQL database cluster which is 2 TB in size. A Solutions Architect needs to determine a disaster recovery strategy for failover to the us-west-2 Region. The strategy must provide a recovery time objective (RTO) of 10 minutes and a recovery point objective (RPO) of 5 minutes. Which strategy will meet these requirements?

   A) Create an Amazon Aurora global database with the primary cluster in us-east-1 and a secondary cluster in us-west-2. In a disaster, remove the secondary cluster from the Aurora global database and promote it to a standalone cluster
   B) Enable cross-Region automated backups on the Aurora cluster in us-east-1. Set the backup retention period to 5 minutes. In a disaster, restore the Aurora cluster from the backup in us-west-2
   C) Create an Amazon Aurora read replica in us-west-2. In a disaster, promote the read replica to be a standalone Aurora database cluster
   D) Schedule daily Aurora snapshots to Amazon S3, and replicate them to us-west-2 using Cross-Region replication. In a disaster, restore the Aurora database from the snapshot in us-west-2

Answer: A
------------------------------------------------------------

Q39. A gaming company operates a leaderboard application for a popular multiplayer game. The application uses an Amazon Aurora PostgreSQL DB cluster for storage. The game servers, hosted on Amazon EC2 instances, frequently update the leaderboard with player scores. The company has a strict security policy that requires database credentials to be encrypted and rotated every 30 days. The company wants to minimize operational overhead while ensuring the application can seamlessly retrieve and use updated credentials. What should a solutions architect do to meet this requirement?

   A) Store the database credentials in AWS Systems Manager Parameter Store as a secure string. Schedule an AWS Lambda function using Amazon EventBridge to rotate the credentials and update Parameter Store every 30 days. Update the application to fetch credentials from Parameter Store on each connection
   B) Store the database credentials in AWS Secrets Manager. Enable automatic rotation and configure a rotation schedule of 30 days. Update the application to retrieve credentials from Secrets Manager
   C) Use IAM database authentication for Aurora. Create an IAM role for the EC2 instances with permissions to connect to the database. Configure the application to generate authentication tokens for each connection
   D) Hardcode the database credentials in the application code. Use AWS CodePipeline to update and redeploy the application with new credentials every 30 days

Answer: B
------------------------------------------------------------

Q40. An application requires a MySQL database which will only be used several times a week for short periods. The database needs to provide automatic instantiation and scaling. Which database service is most suitable?

   A) Amazon RDS MySQL
   B) Amazon EC2 instance with MySQL installed
   C) Amazon Aurora Serverless
   D) Amazon DynamoDB

Answer: C
------------------------------------------------------------

Q41. A Machine Learning research group uses a proprietary computer vision application hosted on an Amazon EC2 instance. Every time the instance needs to be stopped and started again, the application takes about 3 minutes to start. The research group would like to minimize the application bootstrap time whenever the system needs to be stopped and then started at a later point in time. As a solutions architect, which of the following solutions would you recommend?

   A) Use Amazon EC2 Meta-Data
   B) Use Amazon EC2 Instance Hibernate
   C) Use Amazon EC2 User-Data
   D) Create an Amazon Machine Image (AMI) and launch your Amazon EC2 instances from that

Answer: B
------------------------------------------------------------

Q42. A company has divested a single business unit and needs to move the AWS account owned by the business unit to another AWS Organization. How can this be achieved?

   A) Create a Landing Zone using AWS Control Tower in the AWS partner organization. Migrate the divested account to the partner organization's Landing Zone
   B) Migrate the account using AWS CloudFormation StackSets
   C) Remove the member account from the old organization. Send an invite to the account from the new organization. Accept the invite to the new organization from the member account
   D) Migrate the account using the AWS CLI

Answer: C
------------------------------------------------------------

Q43. An automotive company plans to implement IoT sensors in manufacturing equipment that will send data to AWS in real time. The solution must receive events in an ordered manner from each asset and ensure that the data is saved for future processing. Which solution would be MOST efficient?

   A) Use Amazon Kinesis Data Streams for real-time data ingestion and an AWS Lambda function to store data in an Amazon DynamoDB table
   B) Use Amazon Kinesis Data Firehose to ingest the data and store it in an Amazon S3 bucket
   C) Use Amazon SQS FIFO queues for real-time data ingestion and an AWS Lambda function to store data in Amazon DynamoDB
   D) Subscribe the IoT devices to an Amazon SNS topic and store the data in Amazon S3 using an S3 subscription

Answer: A
------------------------------------------------------------

Q44. A tech enterprise operates several workloads using Amazon EC2, AWS Fargate, and AWS Lambda across various teams. To optimize compute costs, the company has purchased Compute Savings Plans. The cloud operations team needs to implement a solution that not only monitors utilization but also sends automated alerts when coverage levels of the Compute Savings Plans fall below a defined threshold. What is the MOST operationally efficient way to achieve this?

   A) Set up AWS Cost Explorer to monitor Savings Plans coverage. Configure a Cost Explorer alert to send an SNS notification when coverage falls below the threshold
   B) Use AWS Cost Anomaly Detection to identify sudden changes in Savings Plans coverage and configure email notifications for detected anomalies
   C) Use AWS Budgets to create a Savings Plans coverage budget. Configure budget alerts to notify the team via Amazon SNS when coverage falls below the defined threshold
   D) Enable AWS Trusted Advisor checks for Reserved Instance and Savings Plans coverage. Set up CloudWatch alarms to notify the team when the check reports low coverage

Answer: C
------------------------------------------------------------

Q45. A video editing company processes high-resolution footage for its clients. Each video file is several terabytes in size and needs to undergo intensive editing, such as applying filters and color grading, before delivery. Processing each video takes up to 25 minutes. The company needs a solution that can scale to handle increased demand during peak periods while remaining cost-effective. The processed videos must be accessible for a minimum of 90 days. Which solution will meet these requirements?

   A) Use an Amazon EC2 Auto Scaling group with On-Demand instances for video processing. Store the processed videos in Amazon S3 Standard. After processing, set a lifecycle policy to move videos to S3 Glacier after 90 days
   B) Use AWS Lambda functions to process the videos. Store the processed videos in Amazon EFS to enable shared access. Configure Amazon EFS lifecycle management to delete files after 90 days
   C) Use AWS Fargate with Amazon ECS to run containerized video-processing tasks. Store the processed videos in Amazon S3 Standard. Set a lifecycle policy to move videos to S3 Standard-IA after 90 days
   D) Use Amazon EC2 Spot Instances for video processing. Store the processed videos in Amazon S3 Standard. Set a lifecycle policy to move videos to S3 Standard-IA after 90 days

Answer: D
------------------------------------------------------------

Q46. A company offers an online product brochure that is delivered from a static website running on Amazon S3. The company's customers are mainly in the United States, Canada, and Mexico. The company is looking to cost-effectively reduce the latency for users in these regions. What is the most cost-effective solution?

   A) Create a CloudFront distribution and restrict the geographic distribution to the United States, Canada, and Mexico
   B) Create a CloudFront distribution with the S3 bucket as origin and configure the Price Class to include only the United States, Canada, and Mexico
   C) Create additional S3 buckets in the United States, Canada, and Mexico Regions. Use Route 53 latency-based routing to direct users to the closest bucket
   D) Create an Amazon Route 53 latency-based routing policy to direct users to the most performant region in the United States, Canada and Mexico

Answer: B
------------------------------------------------------------

Q47. An application consists of a web tier in a public subnet and a MySQL cluster hosted on Amazon EC2 instances in a private subnet. The MySQL instances must retrieve product data from a third-party provider over the internet. A Solutions Architect must determine a strategy to enable this access with maximum security and minimum operational overhead. What should the Solutions Architect do?

   A) Create a software VPN between the MySQL instances in the private subnet and the third-party provider
   B) Create a NAT gateway in the public subnet and create a route in the route table associated with the private subnet
   C) Move the MySQL instances to the public subnet and create a route in the route table associated with the public subnet
   D) Create an internet gateway and attach it to the VPC and create a route in the route table associated with the private subnet

Answer: B
------------------------------------------------------------
`;

const blocks = rawText.split('------------------------------------------------------------');

const parsedQuestions = [];

blocks.forEach(block => {
  const lines = block.trim().split('\n').map(l => l.trim()).filter(l => l.length > 0);
  if (lines.length < 5) return;

  // Question text is everything before the A) option
  let textLines = [];
  let optionLines = [];
  let answerLine = null;
  
  lines.forEach(line => {
    if (/^[A-E]\)/.test(line)) {
      optionLines.push(line);
    } else if (line.startsWith('Answer:')) {
      answerLine = line;
    } else {
      textLines.push(line);
    }
  });

  if (textLines.length > 0 && /^Q\d+\./.test(textLines[0])) {
    // Strip the Q1. part
    textLines[0] = textLines[0].replace(/^Q\d+\.\s*/, '');
  }

  const text = textLines.join(' ');
  
  if (!answerLine) return; // Skip if no answer

  // answerLine is like "Answer: A, B" or "Answer: D"
  const answerMatch = answerLine.match(/Answer:\\s*([A-E])/i);
  if (!answerMatch) return; // if it's multiple answers, we skip it because UI supports only single

  if (answerLine.includes(',')) {
    return; // Skip multi-select
  }

  const answerLetter = answerMatch[1].toUpperCase();
  const letterToIndex = { 'A': 0, 'B': 1, 'C': 2, 'D': 3, 'E': 4 };
  const correctAnswer = letterToIndex[answerLetter];

  const options = [];
  optionLines.forEach(opt => {
    let cleanOpt = opt.replace(/^[A-E]\)\s*/, '');
    options.push(cleanOpt);
  });

  if (text && options.length === 4 && correctAnswer !== undefined && correctAnswer >= 0 && correctAnswer < 4) {
    parsedQuestions.push({
      topic: "AWS Services",
      text: text,
      options: options,
      correctAnswer: correctAnswer,
      explanation: "No explanation provided."
    });
  }
});

console.log('parsedQuestions.length', parsedQuestions.length);

const questionsPath = 'src/data/questions.json';
let data = JSON.parse(fs.readFileSync(questionsPath, 'utf8'));

let addedCount = 0;
parsedQuestions.forEach(nq => {
  if (!data.some(q => q.text.substring(0, 30) === nq.text.substring(0, 30))) {
    data.push(nq);
    addedCount++;
  }
});

fs.writeFileSync(questionsPath, JSON.stringify(data, null, 2));
console.log('Successfully parsed and added ' + addedCount + ' multiple choice questions.');
