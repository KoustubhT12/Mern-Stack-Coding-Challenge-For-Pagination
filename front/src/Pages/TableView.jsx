import React, { useState, useEffect } from 'react';
import axios from 'axios';


const TableView = () => {
    const [page, setPage] = useState(1);
    const [pros, setPros] = useState([]);
    const [total, setTotal] = useState(0);
    const [search, setSearch] = useState('');
    const [loading,setLoading] = useState(true);
    const [pronofo,setpronofo] = useState(false);
    let content;               // ------------- Dynamic content








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
                    setLoading(false)
                    setpronofo(true);
                    return

                }
                const t = Math.ceil(UFpros.length / 10);
                const start = (page - 1) * 10;
                const end = page * 10;
                const Fpros = UFpros.slice(start, end);
                setPros(Fpros);
                setTotal(t);
            } catch (error) {
                alert("Cannot connect to server")
            }
        };
        getter();
    }, [page,search]);

// ------------------------------------------------------------DYNAMIC CONTENT RENDER--------------
      if(pros.length>0){
        content = pros.map((item, index) => (
            <tr key={index}>
                <td className="px-2 py-2 text-gray-900">{item.id}</td>
                <td className="px-2 py-2 text-gray-900">{item.title}</td>
                <td className="px-2 py-2 text-gray-600">{item.description}</td>
                <td className="px-2 py-2 text-gray-600">$ {item.price}</td>
                <td className="px-2 py-2 text-gray-600">{item.category}</td>
                <td className="px-2 py-2 text-gray-600">{item.dateOfSale.split('T')[0]}</td>
            </tr>
        )) }
        else if(pronofo){
            content = (
            <tr>
                <td colSpan={6}>
                    <div className="flex justify-center items-center h-48">
                        <p className="text-lg font-semibold text-green-500 inline-block typing" >No Products found</p>
                    </div>
                </td>
            </tr> 
            );
      }
      else{
        content = (
        <tr>
                <td colSpan={6}>
                    <div className="flex justify-center items-center h-48">
                        <p className="text-lg font-semibold text-green-500 inline-block typing" >Loading...</p>
                    </div>
                </td>
            </tr> 
        );
      }
 

//---------------------------------------DYNAMIC CONTENT RENDER 


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
                        {content}
                    </tbody>
                </table>

                <div className="flex justify-between items-center mt-4">
                    <button
                        onClick={() => setPage(page > 1 ? page - 1 : 1)}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-xs"
                    >
                        Previous Page
                    </button>
                    <span className="text-sm text-gray-600">Page {page} of {total}</span>
                    <button
                        onClick={() => setPage(page < total ? page + 1 : total)}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-xs"
                    >
                        Next Page
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TableView;
