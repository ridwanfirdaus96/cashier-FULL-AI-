import React from 'react';

const Transactions: React.FC = () => {
    // Sample transaction data
    const transactions = [
        { id: 1, date: '2023-01-01', amount: 100, description: 'Purchase 1' },
        { id: 2, date: '2023-01-02', amount: 200, description: 'Purchase 2' },
        { id: 3, date: '2023-01-03', amount: 150, description: 'Purchase 3' },
    ];

    return (
        <div className="transactions">
            <h2>Transaction History</h2>
            <table className="min-w-full">
                <thead>
                    <tr>
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">Date</th>
                        <th className="px-4 py-2">Amount</th>
                        <th className="px-4 py-2">Description</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map(transaction => (
                        <tr key={transaction.id}>
                            <td className="border px-4 py-2">{transaction.id}</td>
                            <td className="border px-4 py-2">{transaction.date}</td>
                            <td className="border px-4 py-2">${transaction.amount}</td>
                            <td className="border px-4 py-2">{transaction.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Transactions;