const fs = require('fs');
const questionsPath = 'src/data/questions.json';
let data = JSON.parse(fs.readFileSync(questionsPath, 'utf8'));

// Q1 update
const q1 = data.find(q => q.text.includes('social media company has noticed that while some of the images'));
if (q1) {
  q1.options = [
    "Create a data monitoring application on an Amazon EC2 instance in the same region as the bucket storing the images. The application is triggered daily via Amazon CloudWatch and it changes the storage class of infrequently accessed objects to Amazon S3 One Zone-IA and the frequently accessed objects are migrated to Amazon S3 Standard class",
    "Store the images using the Amazon S3 Intelligent-Tiering storage class",
    "Create a data monitoring application on an Amazon EC2 instance in the same region as the bucket storing the images. The application is triggered daily via Amazon CloudWatch and it changes the storage class of infrequently accessed objects to Amazon S3 Standard-IA and the frequently accessed objects are migrated to Amazon S3 Standard class",
    "Store the images using the Amazon S3 Standard-IA storage class"
  ];
  q1.correctAnswer = 1;
}

// Q2 update
const q2 = data.find(q => q.text.includes('used for real-time chat functionality. The application should use WebSocket APIs'));
if (q2) {
  q2.options = [
    "Develop a WebSocket API using Amazon API Gateway. Host the application in Amazon Elastic Kubernetes Service (EKS) in a private subnet. Create a security group that allows API Gateway to access the Amazon EKS cluster.",
    "Develop a REST API using Amazon API Gateway. Host the application in Amazon Elastic Kubernetes Service (EKS) in a private subnet. Create a security group that allows API Gateway to access the Amazon EKS cluster.",
    "Develop a WebSocket API using Amazon API Gateway. Host the application in Amazon Elastic Kubernetes Service (EKS) in a private subnet. Establish a private VPC link for the API Gateway to securely access the Amazon EKS cluster.",
    "Develop a REST API using Amazon API Gateway. Host the application in Amazon Elastic Kubernetes Service (EKS) in a private subnet. Establish a private VPC link for the API Gateway to securely access the Amazon EKS cluster."
  ];
  q2.correctAnswer = 2;
  q2.explanation = "API Gateway WebSocket API allows persistent connections. To securely route traffic to a private EKS cluster without exposing it to the public internet, a private VPC link is the recommended and most secure approach.";
}

// Q3 update
const q3 = data.find(q => q.text.includes('Distributed File System Replication (DFSR)'));
if (q3) {
  q3.options = [
    "Amazon FSx",
    "AWS Storage Gateway",
    "Amazon S3",
    "Amazon EFS"
  ];
  q3.correctAnswer = 0;
  q3.explanation = "Amazon FSx (specifically FSx for Windows File Server) natively supports Windows workloads, DFS Namespaces, and DFS Replication (DFSR).";
}

fs.writeFileSync(questionsPath, JSON.stringify(data, null, 2));
console.log('Updated the 3 questions with exact user options.');
