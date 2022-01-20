import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const EventGenre = ({ events }) => {
    const [data, setData] = useState([]);
    useEffect(() => {

        const getData = () => {
            //const genres = ['React', 'JavaScript', 'Node.js', 'Node', 'jQuery', 'Angular', 'AngularJS'];
            const genres = ['React', 'JavaScript', 'Node.js', 'jQuery', 'AngularJS'];
            const data = genres.map((genre) => {
                const value = events.filter((event) => event.summary.split(' ').includes(genre)).length;

                return { name: genre, value: value };
            });
            return data;
        };
        setData(() => getData());
    }, [events]);
    const colors = ['blue', 'red', 'green', 'orange', 'purple'];

    //const colors = ['blue', 'red', 'green', 'green', 'orange', 'purple', 'purple'];

    return (
        <ResponsiveContainer height={350} >

            <PieChart width={400} height={400}>
                <Pie
                    data={data}
                    cx={400}
                    cy={190}
                    labelLine={false}
                    outerRadius={90}
                    fill='#8884d8'
                    dataKey='value'
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                </Pie>
                <Legend layout="horizontal" verticalAlign="top" align="center" height={45} />
            </PieChart>
        </ResponsiveContainer>
    );
}
export default EventGenre;