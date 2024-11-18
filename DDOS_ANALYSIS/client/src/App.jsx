// import React, { useState, useEffect } from 'react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

// const App = () => {
//   const [data, setData] = useState({
//     packetCount: 0,
//     protocolCounts: {},
//     ipCommunications: {},
//     bandwidthUsage: []
//   });

//   useEffect(() => {
//     const ws = new WebSocket('ws://localhost:5000');
//     // const ws = new WebSocket('ws://localhost:3001');
    
//     ws.onopen = () => {
//       console.log('Connected to the server');
//     };

//     ws.onmessage = (event) => {
//       const newData = JSON.parse(event.data);
//       setData(newData);
//     };

//     ws.onerror = (error) => {
//       console.log('WebSocket error: ', error);
//     };

//     return () => {
//       ws.close();
//     };
//   }, []);

//   const protocolData = Object.entries(data.protocolCounts).map(([name, value]) => ({ name, value }));
//   const ipData = Object.entries(data.ipCommunications).slice(0, 10).map(([name, value]) => ({ name, value }));

//   return (
//     <div className="w-full container mx-auto p-6">
//       <h1 className="text-4xl font-extrabold mb-6 text-center">Real-Time DDoS Analysis Demo</h1>
      
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
//         <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
//           <h2 className="text-2xl text-center font-semibold mb-3">Packet Count</h2>
//           <p className="text-5xl font-bold text-center text-blue-600">{data.packetCount.toLocaleString()}</p>
//         </div>
        
//         <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
//           <h2 className="text-2xl font-semibold mb-3">Protocol Distribution</h2>
//           <ResponsiveContainer width="100%" height={200}>
//             <BarChart data={protocolData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="value" fill="#8884d8" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
        
//         <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 lg:col-span-2">
//           <h2 className="text-2xl font-semibold mb-3">Top IP Communications</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={ipData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="value" fill="#82ca9d" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
        
//         <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 lg:col-span-2">
//           <h2 className="text-2xl font-semibold mb-3">Bandwidth Usage</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart data={data.bandwidthUsage.map((value, index) => ({ time: index, value }))}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="time" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Line type="monotone" dataKey="value" stroke="#8884d8" />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;


import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

const App = () => {
  const [data, setData] = useState({
    packetCount: 0,
    protocolCounts: {},
    ipCommunications: {},
    bandwidthUsage: []
  });

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:5000');
    // const ws = new WebSocket('ws://localhost:3001');
    
    ws.onopen = () => {
      console.log('Connected to the server');
    };

    ws.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      console.log('Received new data:', newData); // Debugging line
      setData(prevData => ({
        ...prevData,
        ...newData
      }));
    };

    ws.onerror = (error) => {
      console.log('WebSocket error: ', error);
    };

    return () => {
      ws.close();
    };
  }, []);

  // Convert protocol counts and IP communications to chart-friendly format
  const protocolData = Object.entries(data.protocolCounts).map(([name, value]) => ({ name, value }));
  
  // Only keep the latest 10 entries for IP communications
  const ipData = Object.entries(data.ipCommunications)
    .slice(-10) // Get the last 10 entries
    .map(([name, value]) => ({ name, value }));

  console.log('Protocol Data:', protocolData); // Debugging line
  console.log('IP Data:', ipData); // Debugging line

  return (
    <div className="w-full container mx-auto p-6">
      <h1 className="text-4xl font-extrabold mb-6 text-center">Real-Time DDoS Analysis Demo</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <h2 className="text-2xl text-center font-semibold mb-3">Packet Count</h2>
          <p className="text-5xl font-bold text-center text-blue-600">{data.packetCount.toLocaleString()}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <h2 className="text-2xl font-semibold mb-3">Protocol Distribution</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={protocolData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 lg:col-span-2">
          <h2 className="text-2xl font-semibold mb-3">Top IP Communications</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ipData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 lg:col-span-2">
          <h2 className="text-2xl font-semibold mb-3">Bandwidth Usage</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.bandwidthUsage.map((value, index) => ({ time: index, value }))}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default App;
