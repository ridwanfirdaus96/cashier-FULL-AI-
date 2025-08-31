import React from 'react';

const Transactions: React.FC = () => {
    // Sample transaction data
    const transactions = [
        { id: 1, date: '2023-10-01', amount: 50.00, status: 'Completed' },
        { id: 2, date: '2023-10-02', amount: 75.00, status: 'Completed' },
        { id: 3, date: '2023-10-03', amount: 20.00, status: 'Pending' },
    ];

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Transaction History</h1>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="border-b py-2">ID</th>
                        <th className="border-b py-2">Date</th>
                        <th className="border-b py-2">Amount</th>
                        <th className="border-b py-2">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map(transaction => (
                        <tr key={transaction.id}>
                            <td className="border-b py-2">{transaction.id}</td>
                            <td className="border-b py-2">{transaction.date}</td>
                            <td className="border-b py-2">${transaction.amount.toFixed(2)}</td>
                            <td className="border-b py-2">{transaction.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Transactions;