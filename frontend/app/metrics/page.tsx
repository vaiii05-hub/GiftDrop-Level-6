"use client";
import { useEffect, useState } from "react";

export default function MetricsPage() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const CONTRACT = "CCKWQPTEXUAV7RK3WKD2T6YS4CLC4QE2KWI2MO4NHVAN4ABFJHA3YGVJ";
  const HORIZON = "https://horizon-testnet.stellar.org";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${HORIZON}/transactions?limit=50&order=desc`);
        const data = await res.json();
        setTransactions(data._embedded?.records || []);
      } catch (e) {
        console.error("Failed to fetch transactions", e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "monospace" }}>
      <h1>📊 GiftDrop Metrics</h1>

      <div style={{ display: "flex", gap: "2rem", marginBottom: "2rem" }}>
        <div style={{ background: "#1a1a2e", padding: "1rem", borderRadius: "8px", color: "white" }}>
          <h3>Total Transactions</h3>
          <p style={{ fontSize: "2rem" }}>{transactions.length}</p>
        </div>
        <div style={{ background: "#1a1a2e", padding: "1rem", borderRadius: "8px", color: "white" }}>
          <h3>Contract</h3>
          <p style={{ fontSize: "0.7rem" }}>{CONTRACT}</p>
        </div>
      </div>

      {loading ? (
        <p>Loading transactions...</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#1a1a2e", color: "white" }}>
              <th style={{ padding: "0.5rem", textAlign: "left" }}>Hash</th>
              <th style={{ padding: "0.5rem", textAlign: "left" }}>Date</th>
              <th style={{ padding: "0.5rem", textAlign: "left" }}>Operations</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx: any) => (
              <tr key={tx.hash} style={{ borderBottom: "1px solid #ccc" }}>
                <td style={{ padding: "0.5rem" }}>
                  <a href={`https://stellar.expert/explorer/testnet/tx/${tx.hash}`} target="_blank">
                    {tx.hash.slice(0, 20)}...
                  </a>
                </td>
                <td style={{ padding: "0.5rem" }}>
                  {new Date(tx.created_at).toLocaleDateString()}
                </td>
                <td style={{ padding: "0.5rem" }}>{tx.operation_count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}