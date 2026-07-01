const fs = require('fs');
const questionsPath = 'src/data/questions.json';
let data = JSON.parse(fs.readFileSync(questionsPath, 'utf8'));

const newQuestions = [
  {
    topic: "Security & Compliance",
    text: "A company is in the process of improving its security posture and wants to analyze and rectify a high volume of failed login attempts and unauthorized activities being logged in AWS CloudTrail. What is the most efficient solution to help the company identify these security events with the LEAST amount of operational effort?",
    options: [
      "Leverage AWS Lambda to trigger on CloudTrail log updates and use a custom script to scan for failed logins and unauthorized actions.",
      "Implement Amazon Elasticsearch Service with Kibana to visualize the CloudTrail logs and manually search for these events.",
      "Utilize AWS Data Pipeline to regularly extract CloudTrail logs and use a custom script to identify the required security events.",
      "Use Amazon Athena to directly query CloudTrail logs for failed logins and unauthorized activities."
    ],
    correctAnswer: 3,
    explanation: "Amazon Athena can directly query data from S3 (where CloudTrail logs are stored) using standard SQL, making it a powerful and efficient tool for analyzing these logs. You don't need to manage any infrastructure or write custom scripts."
  },
  {
    topic: "Databases",
    text: "A digital media company uses an Amazon RDS MySQL instance for its content management system. Recently, the company has observed that their RDS instance is nearing its storage capacity due to the constant influx of new data. The company wants to ensure there's always sufficient storage without any operational interruption or manual intervention. Which solution should the company use to address this situation with the LEAST operational overhead?",
    options: [
      "Create a new larger RDS instance and use AWS DMS to migrate the data.",
      "Enable Amazon RDS Storage Auto Scaling.",
      "Configure an AWS Lambda function triggered by CloudWatch alarms to modify the DB instance storage.",
      "Migrate the database to Amazon Aurora Serverless."
    ],
    correctAnswer: 1,
    explanation: "Amazon RDS Storage Auto Scaling automatically scales the storage capacity of your database instances dynamically with zero downtime when the database is nearing its storage limit."
  },
  {
    topic: "Security & Compliance",
    text: "A developer has set up a classic 2-tier architecture consisting of an Application Load Balancer (ALB) and an Auto Scaling group (ASG) managing a fleet of Amazon EC2 instances. How do you configure the security group of the Amazon EC2 instances to ONLY allow traffic coming from the Application Load Balancer?",
    options: [
      "Add an inbound rule allowing HTTP/HTTPS traffic from the IP address range of the ALB's subnet.",
      "Add an inbound rule allowing HTTP/HTTPS traffic where the source is the Security Group ID of the Application Load Balancer.",
      "Add a network ACL to block all traffic except from the ALB's public IP addresses.",
      "Configure the ALB to use an Elastic IP and whitelist that IP in the EC2 security group."
    ],
    correctAnswer: 1,
    explanation: "Referencing the Security Group ID of the ALB as the source in the EC2 instance's security group is the most secure and robust way to ensure that only traffic originating from the ALB can reach the instances."
  },
  {
    topic: "Compute",
    text: "A retail startup runs a high-traffic order processing system. The frontend and processing tiers are decoupled using Amazon SQS. Recently, the engineering team observed that during unpredictable traffic surges, order processing slows down significantly, SQS queue depth increases rapidly, and the processing-tier EC2 instances hit 100% CPU usage. Which solution will help improve the application’s responsiveness and scalability?",
    options: [
      "Increase the size of the SQS queue to hold more messages.",
      "Change the processing EC2 instances to a larger instance type vertically.",
      "Configure an Auto Scaling policy for the processing tier based on the ApproximateNumberOfMessagesVisible CloudWatch metric of the SQS queue.",
      "Replace SQS with Amazon Kinesis Data Streams for faster processing."
    ],
    correctAnswer: 2,
    explanation: "When decoupled with SQS, scaling based on the SQS queue length (ApproximateNumberOfMessagesVisible) ensures that the backend processing tier dynamically provisions enough instances to handle the backlog of messages during traffic spikes."
  },
  {
    topic: "Networking & Content Delivery",
    text: "An enterprise is building a secure business intelligence API using Amazon API Gateway to serve internal users with confidential analytics data. The API must be accessible only from a set of trusted IP addresses that are part of the organization's internal network ranges. No external IP traffic should be able to invoke the API. What should the architect do to meet these requirements?",
    options: [
      "Create a Resource Policy on the API Gateway to deny access unless the source IP matches the trusted IP ranges.",
      "Put the API Gateway behind an Application Load Balancer and configure ALB security groups.",
      "Use AWS WAF to block all traffic by default and allow only the trusted IPs.",
      "Deploy the API Gateway in a private subnet and configure a Network ACL."
    ],
    correctAnswer: 0,
    explanation: "API Gateway Resource Policies let you create resource-based policies to allow or deny access to your APIs from specified source IP addresses or VPC endpoints."
  }
];

// Add only if not already exists
const added = [];
newQuestions.forEach(nq => {
  if (!data.some(q => q.text.substring(0, 30) === nq.text.substring(0, 30))) {
    data.push(nq);
    added.push(nq);
  }
});

fs.writeFileSync(questionsPath, JSON.stringify(data, null, 2));
console.log(`Added ${added.length} more user questions.`);
