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

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2rem' }}>
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
      </div>

      <div className="glass-panel" style={{ padding: '2rem', overflowX: 'auto' }}>
        {renderTable()}
      </div>
    </div>
  );
};

export default CheatSheets;
