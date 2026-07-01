import React, { useState, useEffect } from 'react';
import { Lightbulb } from 'lucide-react';
import localTipsData from '../data/tips.json';

const ExamTips = () => {
  const [tipsData, setTipsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTipsData(localTipsData);
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="animate-fade-in" style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>טוען טיפים מהשרת...</div>;
  }

  return (
    <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '3rem' }}>
      <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1>טיפים למבחן SAA-C03 💡</h1>
        <p style={{ color: 'var(--text-muted)' }}>אסטרטגיות למבחן, ניהול זמן, ואיך לגשת לשאלות מורכבות.</p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {tipsData.map((section, index) => (
          <div key={index} className="glass-panel" style={{ padding: '2rem' }}>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', color: 'var(--accent-aws)' }}>
              <Lightbulb size={24} />
              {section.category}
            </h2>
            <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
              {section.tips.map((tip, tipIndex) => (
                <li key={tipIndex} style={{ 
                  padding: '1rem', 
                  backgroundColor: 'rgba(255,153,0,0.05)', 
                  borderRight: '4px solid var(--accent-aws)',
                  marginBottom: '1rem',
                  borderRadius: '4px',
                  lineHeight: '1.6'
                }}>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="glass-panel" style={{ padding: '2rem', marginTop: '1rem' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--accent-aws)' }}>
            מילון הטריגרים המלא (The Ultimate Trigger List) 🏆
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1rem' }}>
            רשימת הזהב של מילות מפתח שתראה בשאלות, מה הן מסמנות, ולאיזה שירות הן מכוונות.
          </p>

          {[
            {
              title: 'מילות מפתח לבחירת התשובה הנכונה ("Which answer" words)',
              triggers: [
                { trigger: "least operational overhead", meaning: "Managed service, less manual work", service: "Serverless (Fargate, Lambda)" },
                { trigger: "most cost-effective / cheapest", meaning: "Simplest option, no extras", service: "Spot, S3 Glacier, SQS" },
                { trigger: "highly available (HA)", meaning: "Redundancy across locations", service: "Multi-AZ, Load Balancer" },
                { trigger: "fault tolerant", meaning: "Auto-replaces failures", service: "Auto Scaling" },
                { trigger: "most efficient / best performance", meaning: "Optimize speed/throughput", service: "Cache, more instances" },
              ]
            },
            {
              title: 'תזמון ועומסים (Scheduling / load)',
              triggers: [
                { trigger: "unpredictable", meaning: "Dynamic scaling needed, NOT scheduled", service: "Dynamic / Target Tracking" },
                { trigger: "predictable / known times", meaning: "Scale based on time", service: "Scheduled Scaling" },
                { trigger: "historical trends / forecast", meaning: "Predict future load", service: "Predictive Scaling" },
                { trigger: "spiky / intermittent", meaning: "Bursty workloads", service: "Lambda / Dynamic Scaling" },
              ]
            },
            {
              title: 'מיקום ורשת (Location / network)',
              triggers: [
                { trigger: "nearest / lowest latency", meaning: "Serve from closest edge", service: "Active-Active, CloudFront, MRAP" },
                { trigger: "failover / standby / backup", meaning: "Disaster recovery setup", service: "Active-Passive, Multi-AZ" },
                { trigger: "globally / worldwide", meaning: "Global presence", service: "CloudFront, Global Accelerator" },
              ]
            },
            {
              title: 'נתונים ומסדי נתונים (Data / DB)',
              triggers: [
                { trigger: "read scaling / read capacity", meaning: "Offload reads from primary DB", service: "Read Replicas / Multi-AZ cluster" },
                { trigger: "no data loss / synchronous", meaning: "Real-time sync to standby", service: "Multi-AZ" },
                { trigger: "corruption / point in time", meaning: "Recover from accidental deletion", service: "PITR (Not replication!)" },
                { trigger: "relationships / connected / map", meaning: "Graph structure", service: "Amazon Neptune" },
              ]
            },
            {
              title: 'עיבוד נתונים (Processing)',
              triggers: [
                { trigger: "1-hour / 2-hour / long-running", meaning: "Too long for Lambda (15m max)", service: "AWS Batch / Fargate" },
                { trigger: "event-driven / on upload / short", meaning: "Triggered by actions", service: "Lambda" },
                { trigger: "in order / same order", meaning: "Strict ordering guarantees", service: "SQS FIFO / Kinesis" },
              ]
            },
            {
              title: 'אבטחה והרשאות (Security / permissions)',
              triggers: [
                { trigger: "cross-account", meaning: "Handshake from both sides", service: "IAM Role + Resource Policy" },
              ]
            },
            {
              title: 'טריגרים מיוחדים ובונוסים',
              triggers: [
                { trigger: "credentials/passwords + rotation", meaning: "Auto-rotate secrets", service: "Secrets Manager (NOT KMS!)" },
                { trigger: "cost breakdown per app", meaning: "Analyze costs", service: "Cost Allocation Tags + Cost Explorer" },
                { trigger: "owner wants low transfer cost, others download", meaning: "Shift cost to downloader", service: "Requester Pays" },
                { trigger: "temporary access to private S3 object", meaning: "Time-limited access", service: "Presigned URL" },
                { trigger: "cross-Region", meaning: "Ask 'of WHAT?'", service: "Backup / AMI / S3 CRR / Global Tables" },
                { trigger: "HTTP requests + managed", meaning: "Expose APIs easily", service: "API Gateway + Lambda" },
                { trigger: "NFS files → backup", meaning: "NFS to S3", service: "File Gateway (NFS ≠ EFS only!)" },
                { trigger: "domain/URL outbound filtering", meaning: "Block specific URLs", service: "Network Firewall" },
                { trigger: "instant DB copy for testing, no prod impact", meaning: "Fast cloning", service: "Aurora Cloning" },
                { trigger: "DynamoDB item > 400KB", meaning: "Item too large", service: "Store in S3, pointer in DynamoDB" },
              ]
            }
          ].map((category, catIdx) => (
            <div key={catIdx} style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ borderBottom: '2px solid rgba(255,153,0,0.3)', paddingBottom: '0.5rem', marginBottom: '1rem', color: '#f8fafc', fontSize: '1.2rem' }}>
                {category.title}
              </h3>
              <div style={{ overflowX: 'auto', direction: 'ltr' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid rgba(255,255,255,0.1)', color: 'var(--accent-aws)', fontSize: '0.85rem', letterSpacing: '1px' }}>
                      <th style={{ padding: '0.8rem', textTransform: 'uppercase', width: '35%' }}>Trigger Phrase</th>
                      <th style={{ padding: '0.8rem', textTransform: 'uppercase', width: '40%' }}>What It Means</th>
                      <th style={{ padding: '0.8rem', textTransform: 'uppercase', width: '25%' }}>Service</th>
                    </tr>
                  </thead>
                  <tbody>
                    {category.triggers.map((row, idx) => (
                      <tr key={idx} style={{ 
                        borderBottom: '1px solid rgba(255,255,255,0.05)',
                        backgroundColor: idx % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent',
                        transition: 'background-color 0.2s'
                      }}>
                        <td style={{ padding: '1rem', fontWeight: 'bold', color: '#e2e8f0' }}>{row.trigger}</td>
                        <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{row.meaning}</td>
                        <td style={{ padding: '1rem', fontWeight: 'bold', color: '#c084fc' }}>{row.service}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}

          <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--danger)', padding: '1.5rem', borderRadius: '8px', marginTop: '2rem' }}>
            <h3 style={{ color: 'var(--danger)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              🎯 3 מלכודות נפוצות (Traps)
            </h3>
            <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem', direction: 'ltr', textAlign: 'left' }}>
              <li style={{ padding: '0.5rem', borderLeft: '3px solid var(--danger)', background: 'rgba(0,0,0,0.2)' }}>
                ⚠️ <strong>"least overhead" + many service names:</strong> This does <strong>NOT</strong> mean high overhead! Managed/serverless = less work.
              </li>
              <li style={{ padding: '0.5rem', borderLeft: '3px solid var(--danger)', background: 'rgba(0,0,0,0.2)' }}>
                ⚠️ <strong>Flashy noun:</strong> (Microsoft, PostgreSQL, videos, RAM) → <strong>Bait</strong>, not a trigger 🎣
              </li>
              <li style={{ padding: '0.5rem', borderLeft: '3px solid var(--danger)', background: 'rgba(0,0,0,0.2)' }}>
                ⚠️ <strong>"swap out / replace X":</strong> Usually wrong if a native <strong>feature</strong> solves the problem without replacing the entire architecture.
              </li>
            </ul>
          </div>

          <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid var(--success)', padding: '1.5rem', borderRadius: '8px', marginTop: '2rem', textAlign: 'center' }}>
            <h3 style={{ color: 'var(--success)', marginBottom: '0.5rem' }}>🔑 The Exam Mantra</h3>
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold', fontStyle: 'italic', direction: 'ltr' }}>
              "How many requirements? Which adjective? Where's the bait?"
            </p>
            <p style={{ color: 'var(--text-muted)', marginTop: '1rem', direction: 'ltr' }}>
              <strong>When 2 answers are left:</strong> compare them, find the <strong>one different word</strong>, and ask "what did the question ask for?"
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ExamTips;
