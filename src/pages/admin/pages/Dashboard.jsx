import React from 'react';

const Dashboard = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Welcome to Admin Dashboard</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-2">Development Table</h3>
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left">Name</th>
                <th className="text-left">Tech</th>
                <th className="text-left">Date</th>
                <th className="text-left">Progress</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Marketplace</td>
                <td>iOS, Android, Windows</td>
                <td>12.Jan.2021</td>
                <td>30%</td>
              </tr>
              <tr>
                <td>Venus DB PRO</td>
                <td>iOS</td>
                <td>21.Feb.2021</td>
                <td>30%</td>
              </tr>
              <tr>
                <td>Venus DS</td>
                <td>iOS, Windows</td>
                <td>13.Mar.2021</td>
                <td>30%</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-2">Check Table</h3>
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left">Name</th>
                <th className="text-left">Progress</th>
                <th className="text-left">Quantity</th>
                <th className="text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Marketplace</td>
                <td>75.5%</td>
                <td>2458</td>
                <td>12.Jan.2021</td>
              </tr>
              <tr>
                <td>Venus DB PRO</td>
                <td>35.4%</td>
                <td>1485</td>
                <td>21.Feb.2021</td>
              </tr>
              <tr>
                <td>Venus DS</td>
                <td>25%</td>
                <td>1024</td>
                <td>13.Mar.2021</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
