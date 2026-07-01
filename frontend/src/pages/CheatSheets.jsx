import { useState } from 'react';

const CheatSheets = () => {
  const [activeTab, setActiveTab] = useState('compute');

  const renderTable = () => {
    switch(activeTab) {
      case 'compute':
        return (
          <table className="aws-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', direction: 'ltr' }}>
            <thead>
              <tr style={{ background: 'rgba(255,153,0,0.1)' }}>
                <th style={{ padding: '1rem' }}>Service</th>
                <th style={{ padding: '1rem' }}>Best For</th>
                <th style={{ padding: '1rem' }}>Pricing</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>EC2 On-Demand</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>Unpredictable workloads, short-term</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>Pay per second, most expensive</td>
              </tr>
              <tr>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>EC2 Reserved (RI)</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>Predictable, steady state workloads ({'>'}1 yr)</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>Up to 72% discount</td>
              </tr>
              <tr>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>EC2 Spot</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>Fault-tolerant, flexible, stateless workloads</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>Up to 90% discount, can be interrupted</td>
              </tr>
              <tr>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>AWS Lambda</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>Event-driven, serverless short executions ({'<'} 15m)</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>Pay per invocation & duration</td>
              </tr>
            </tbody>
          </table>
        );
      case 'storage':
        return (
          <table className="aws-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', direction: 'ltr' }}>
            <thead>
              <tr style={{ background: 'rgba(255,153,0,0.1)' }}>
                <th style={{ padding: '1rem' }}>Service</th>
                <th style={{ padding: '1rem' }}>Type</th>
                <th style={{ padding: '1rem' }}>Use Case</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>Amazon S3</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>Object</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>Static files, backups, data lakes, WORM</td>
              </tr>
              <tr>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>Amazon EBS</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>Block</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>EC2 boot volumes, databases, low latency</td>
              </tr>
              <tr>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>Amazon EFS</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>File (Linux)</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>Shared NFS for multiple Linux EC2 instances</td>
              </tr>
              <tr>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>Amazon FSx for Windows</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>File (Windows)</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>Shared SMB for Windows EC2 instances</td>
              </tr>
            </tbody>
          </table>
        );
      case 'databases':
        return (
          <table className="aws-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', direction: 'ltr' }}>
            <thead>
              <tr style={{ background: 'rgba(255,153,0,0.1)' }}>
                <th style={{ padding: '1rem' }}>Service</th>
                <th style={{ padding: '1rem' }}>Type</th>
                <th style={{ padding: '1rem' }}>Key Features</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>Amazon RDS</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>Relational (SQL)</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>Multi-AZ, Read Replicas, Automated Backups</td>
              </tr>
              <tr>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>Amazon Aurora</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>Relational (SQL)</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>5x faster than MySQL, Serverless option, Auto-scaling storage</td>
              </tr>
              <tr>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>Amazon DynamoDB</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>NoSQL (Key-Value)</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>Serverless, single-digit ms latency, DAX for caching</td>
              </tr>
              <tr>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>Amazon Redshift</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>Data Warehouse</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>OLAP, Columnar storage, analytics on large datasets</td>
              </tr>
            </tbody>
          </table>
        );
      case 'networking':
        return (
          <table className="aws-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', direction: 'ltr' }}>
            <thead>
              <tr style={{ background: 'rgba(255,153,0,0.1)' }}>
                <th style={{ padding: '1rem' }}>Service</th>
                <th style={{ padding: '1rem' }}>Comparison / Best For</th>
                <th style={{ padding: '1rem' }}>Key Features</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>ALB vs NLB vs GLB</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>App (HTTP/S) vs Network (TCP/UDP) vs Gateway</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>ALB: Path/Host routing. NLB: Ultra-high perf. GLB: 3rd party appliances.</td>
              </tr>
              <tr>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>CloudFront vs Global Accelerator</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>Content Delivery vs Network Optimization</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>CloudFront uses edge caches. GA uses Anycast IP over AWS private network.</td>
              </tr>
              <tr>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>Transit Gateway vs VPC Peering</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>Hub & Spoke vs Point-to-Point</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>TGW simplifies network topology. Peering is cheaper but not transitive.</td>
              </tr>
              <tr>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>Direct Connect vs Site-to-Site VPN</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>Private Physical vs Internet-based IPsec</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>DX takes 1+ month to setup, reliable. VPN is quick to setup, uses public net.</td>
              </tr>
            </tbody>
          </table>
        );
      case 'security':
        return (
          <table className="aws-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', direction: 'ltr' }}>
            <thead>
              <tr style={{ background: 'rgba(255,153,0,0.1)' }}>
                <th style={{ padding: '1rem' }}>Service</th>
                <th style={{ padding: '1rem' }}>Comparison / Best For</th>
                <th style={{ padding: '1rem' }}>Key Features</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>KMS vs CloudHSM</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>Managed Keys vs Dedicated Hardware</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>CloudHSM provides FIPS 140-2 Level 3, single tenant, you manage the keys.</td>
              </tr>
              <tr>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>Secrets Manager vs Parameter Store</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>Automatic Rotation vs Simple Storage</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>Secrets Manager natively rotates DB passwords. SSM is cheaper, manual rotation.</td>
              </tr>
              <tr>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>WAF vs Shield vs Firewall Manager</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>L7 Protection vs L3/L4 DDoS vs Central Mgmt</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>WAF filters SQLi/XSS. Shield Adv offers DDoS cost protection. FMS applies rules across accounts.</td>
              </tr>
              <tr>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>Security Group vs NACL</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>Instance-level vs Subnet-level</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>SG is Stateful (allow rules only). NACL is Stateless (allow & deny rules).</td>
              </tr>
            </tbody>
          </table>
        );
      case 'integration':
        return (
          <table className="aws-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', direction: 'ltr' }}>
            <thead>
              <tr style={{ background: 'rgba(255,153,0,0.1)' }}>
                <th style={{ padding: '1rem' }}>Service</th>
                <th style={{ padding: '1rem' }}>Comparison / Best For</th>
                <th style={{ padding: '1rem' }}>Key Features</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>SQS vs SNS</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>Pull (Queue) vs Push (Pub/Sub)</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>SQS workers pull messages. SNS pushes to multiple subscribers (Fan-out).</td>
              </tr>
              <tr>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>Kinesis vs SQS</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>Real-time Streaming vs Message Queuing</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>Kinesis allows multiple consumers to read the same stream. SQS deletes msg after processing.</td>
              </tr>
              <tr>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>EventBridge vs CloudWatch Events</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>Modern Event Bus vs Legacy</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>EventBridge supports 3rd party SaaS integration and custom event buses.</td>
              </tr>
              <tr>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>Amazon MQ</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>Industry Standard Messaging</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>Managed ActiveMQ or RabbitMQ. Use when migrating from on-prem to avoid rewriting code.</td>
              </tr>
            </tbody>
          </table>
        );
      case 'management':
        return (
          <table className="aws-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', direction: 'ltr' }}>
            <thead>
              <tr style={{ background: 'rgba(255,153,0,0.1)' }}>
                <th style={{ padding: '1rem' }}>Service</th>
                <th style={{ padding: '1rem' }}>Comparison / Best For</th>
                <th style={{ padding: '1rem' }}>Key Features</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>CloudWatch vs CloudTrail</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>Performance Monitoring vs API Auditing</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>CloudWatch for metrics/logs/alarms. CloudTrail answers "who made this API call?".</td>
              </tr>
              <tr>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>AWS Config</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>Resource Configuration History</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>Evaluates resource compliance against rules, tracks configuration changes over time.</td>
              </tr>
              <tr>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>AWS Organizations</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>Multi-Account Management</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>Consolidated billing, Service Control Policies (SCPs) to restrict OUs/Accounts.</td>
              </tr>
              <tr>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>AWS Trusted Advisor</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>Best Practice Recommendations</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>Checks Cost, Performance, Security, Fault Tolerance, and Service Limits.</td>
              </tr>
            </tbody>
          </table>
        );
      default:
        return null;
    }
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1>דפי השוואה (Cheat Sheets)</h1>
        <p style={{ color: 'var(--text-muted)' }}>סיכומים טבלאיים מהירים כדי לזכור איזה שירות מתאים לאיזה תרחיש.</p>
      </header>

      <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <button 
          className={`btn ${activeTab === 'compute' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('compute')}
        >
          Compute
        </button>
        <button 
          className={`btn ${activeTab === 'storage' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('storage')}
        >
          Storage
        </button>
        <button 
          className={`btn ${activeTab === 'databases' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('databases')}
        >
          Databases
        </button>
        <button 
          className={`btn ${activeTab === 'networking' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('networking')}
        >
          Networking
        </button>
        <button 
          className={`btn ${activeTab === 'security' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('security')}
        >
          Security
        </button>
        <button 
          className={`btn ${activeTab === 'integration' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('integration')}
        >
          Integration
        </button>
        <button 
          className={`btn ${activeTab === 'management' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('management')}
        >
          Management
        </button>
      </div>

      <div className="glass-panel" style={{ padding: '2rem', overflowX: 'auto' }}>
        {renderTable()}
      </div>
    </div>
  );
};

export default CheatSheets;
