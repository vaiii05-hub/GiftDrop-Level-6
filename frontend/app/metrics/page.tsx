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
        const res = await fetch(
          `${HORIZON}/contracts/${CONTRACT}/transactions?limit=50&order=desc`
        );
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
    <div style={{ padding: "2rem", fontFamily: "monospace", background: "#0a0a0a", minHeight: "100vh", color: "white" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>📊 GiftDrop Metrics</h1>
      <p style={{ color: "#888", marginBottom: "2rem" }}>Real-time data from Stellar Testnet</p>

      <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
        <div style={{ background: "#1a1a2e", padding: "1.5rem", borderRadius: "12px", minWidth: "150px" }}>
          <p style={{ color: "#888", fontSize: "0.8rem" }}>Total Transactions</p>
          <p style={{ fontSize: "3rem", color: "#f472b6", fontWeight: "bold" }}>{transactions.length}</p>
        </div>
        <div style={{ background: "#1a1a2e", padding: "1.5rem", borderRadius: "12px", minWidth: "150px" }}>
          <p style={{ color: "#888", fontSize: "0.8rem" }}>Network</p>
          <p style={{ fontSize: "1.2rem", color: "#fb923c", fontWeight: "bold" }}>Stellar Testnet</p>
        </div>
      </div>

      {loading ? (
        <p>Loading transactions...</p>
      ) : transactions.length === 0 ? (
        <p style={{ color: "#888" }}>No transactions found yet.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#1a1a2e", color: "#888" }}>
              <th style={{ padding: "0.75rem", textAlign: "left" }}>Hash</th>
              <th style={{ padding: "0.75rem", textAlign: "left" }}>Date</th>
              <th style={{ padding: "0.75rem", textAlign: "left" }}>Operations</th>
              <th style={{ padding: "0.75rem", textAlign: "left" }}>Explorer</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx: any) => (
              <tr key={tx.hash} style={{ borderBottom: "1px solid #222" }}>
                <td style={{ padding: "0.75rem", color: "#f472b6", fontFamily: "monospace" }}>
                  {tx.hash.slice(0, 16)}...
                </td>
                <td style={{ padding: "0.75rem", color: "#ccc" }}>
                  {new Date(tx.created_at).toLocaleDateString()}
                </td>
                <td style={{ padding: "0.75rem", color: "#fb923c" }}>
                  {tx.operation_count} ops
                </td>
                <td style={{ padding: "0.75rem" }}>
                  <a href={`https://stellar.expert/explorer/testnet/tx/${tx.hash}`}
                    target="_blank" style={{ color: "#888" }}>
                    View →
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}