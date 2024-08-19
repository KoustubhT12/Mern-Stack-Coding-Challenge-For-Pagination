import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TableView = () => {
    const [page, setPage] = useState(1);
    const [pros, setPros] = useState([]);
    const [total, setTotal] = useState(0);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const getter = async () => {
            try {
                const response = await axios.get('http://localhost:3000');
                let UFpros = response.data;
                if(search){
                    UFpros = UFpros.filter((item)=>{
                        return item.title.toLowerCase().includes(search.toLowerCase())
                    });
                    setPros(UFpros);
                    return

                }
                const t = Math.ceil(UFpros.length / 10);
                const start = (page - 1) * 10;
                const end = page * 10;
                const Fpros = UFpros.slice(start, end);
                setPros(Fpros);
                setTotal(t);
            } catch (error) {
                console.log(error.message);
            }
        };
        getter();
    }, [page,search]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white shadow-md rounded-lg w-full max-w-3xl p-4">
            <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search Product"
                    className="w-full px-4 py-2 border border-gray-300 rounded mb-4"
                />
                <table className="w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-50">
                        <tr>
                        <th className="px-4 py-2 text-left font-medium text-gray-700">ID</th>
                            <th className="px-4 py-2 text-left font-medium text-gray-700">Title</th>
                            <th className="px-4 py-2 text-left font-medium text-gray-700">Description</th>
                            <th className="px-4 py-2 text-left font-medium text-gray-700">Price</th>
                            <th className="px-4 py-2 text-left font-medium text-gray-700">Category</th>
                            <th className="px-4 py-2 text-left font-medium text-gray-700">Date Of Sale</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {pros.map((item, index) => (
                            <tr key={index}>
                                <td className="px-4 py-2 text-gray-900">{item.id}</td>
                                <td className="px-4 py-2 text-gray-900">{item.title}</td>
                                <td className="px-4 py-2 text-gray-600">{item.description}</td>
                                <td className="px-4 py-2 text-gray-600">$ {item.price}</td>
                                <td className="px-4 py-2 text-gray-600">{item.category}</td>
                                <td className="px-4 py-2 text-gray-600">{item.dateOfSale.split('T')[0]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="flex justify-between items-center mt-4">
                    <button
                        onClick={() => setPage(page > 1 ? page - 1 : 1)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-xs"
                    >
                        Previous Page
                    </button>
                    <span className="text-sm text-gray-600">Page {page} of {total}</span>
                    <button
                        onClick={() => setPage(page < total ? page + 1 : total)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-xs"
                    >
                        Next Page
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TableView;
