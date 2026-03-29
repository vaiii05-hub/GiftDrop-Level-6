"use client";
import { useEffect, useState } from "react";

export default function MetricsPage() {
  const [operations, setOperations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const CONTRACT = "CCKWQPTEXUAV7RK3WKD2T6YS4CLC4QE2KWI2MO4NHVAN4ABFJHA3YGVJ";
  const DEPLOYER = "GDBIJAOFPMGQWDUUQTJ3YFHI44MWHQHPALJQG7ZDA7D5WWEDKJYA4OHA";
  const HORIZON = "https://horizon-testnet.stellar.org";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${HORIZON}/accounts/${DEPLOYER}/operations?limit=200&order=desc`
        );
        const data = await res.json();
        const allOps = data._embedded?.records || [];
        const contractOps = allOps.filter(
          (op: any) => op.type === "invoke_host_function"
        );
        setOperations(contractOps);
      } catch (e) {
        console.error("Failed to fetch", e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10">
      <div className="max-w-6xl mx-auto">

        <div className="mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent">
            📊 GiftDrop Metrics
          </h1>
          <p className="text-gray-400 mt-2">
            Real-time data from Stellar Testnet · Soroban Smart Contract
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-gray-900 border border-pink-500/30 rounded-2xl p-6">
            <p className="text-gray-400 text-sm mb-1">Total Transactions</p>
            <p className="text-5xl font-bold text-pink-400">{operations.length}</p>
          </div>
          <div className="bg-gray-900 border border-orange-500/30 rounded-2xl p-6">
            <p className="text-gray-400 text-sm mb-1">Network</p>
            <p className="text-2xl font-bold text-orange-400">Stellar Testnet</p>
          </div>
          <div className="bg-gray-900 border border-purple-500/30 rounded-2xl p-6">
            <p className="text-gray-400 text-sm mb-1">Contract</p>
            <p className="text-xs font-mono text-purple-400 break-all">
              {CONTRACT.slice(0, 20)}...{CONTRACT.slice(-6)}
            </p>
            
              <a href={`https://stellar.expert/explorer/testnet/contract/${CONTRACT}`}
              target="_blank"
              className="text-xs text-gray-500 hover:text-pink-400 mt-1 block"
            >
              View on Explorer →
            </a>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">
              GiftDrop Contract Transactions
            </h2>
            
              <a href={`https://stellar.expert/explorer/testnet/contract/${CONTRACT}`}
              target="_blank"
              className="text-xs text-pink-400 hover:text-pink-300"
            >
              View all on Explorer →
            </a>
          </div>

          {loading ? (
            <div className="p-10 text-center text-gray-400">
              Loading transactions...
            </div>
          ) : operations.length === 0 ? (
            <div className="p-10 text-center">
              <p className="text-gray-400 text-lg">No transactions yet</p>
              <p className="text-gray-600 text-sm mt-2">
                Transactions will appear here when users interact with GiftDrop
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-800 text-gray-400 text-sm">
                    <th className="px-6 py-3 text-left">Transaction Hash</th>
                    <th className="px-6 py-3 text-left">Type</th>
                    <th className="px-6 py-3 text-left">Date</th>
                    <th className="px-6 py-3 text-left">Explorer</th>
                  </tr>
                </thead>
                <tbody>
                  {operations.map((op: any, i: number) => (
                    <tr
                      key={op.id || i}
                      className={`border-t border-gray-800 hover:bg-gray-800/50 transition-colors ${i % 2 === 0 ? "" : "bg-gray-900/50"}`}
                    >
                      <td className="px-6 py-4 font-mono text-sm text-pink-400">
                        {op.transaction_hash
                          ? `${op.transaction_hash.slice(0, 16)}...${op.transaction_hash.slice(-8)}`
                          : "N/A"}
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-orange-500/20 text-orange-400 text-xs px-2 py-1 rounded-full">
                          contract call
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {op.created_at
                          ? new Date(op.created_at).toLocaleDateString("en-IN", {
                              day: "numeric", month: "short", year: "numeric"
                            })
                          : "N/A"}
                      </td>
                      <td className="px-6 py-4">
                        {op.transaction_hash ? (
                          
                           <a href={`https://stellar.expert/explorer/testnet/tx/${op.transaction_hash}`}
                            target="_blank"
                            className="text-xs text-gray-400 hover:text-pink-400 transition-colors"
                          >
                            View →
                          </a>
                        ) : "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm">
            View all GiftDrop contract activity on{" "}
            
              <a href={`https://stellar.expert/explorer/testnet/contract/${CONTRACT}`}
              target="_blank"
              className="text-pink-400 hover:text-pink-300"
            >
              Stellar Expert →
            </a>
          </p>
        </div>

      </div>
    </div>
  );
}