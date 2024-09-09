"use client";
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { BarChart, Bar } from 'recharts'
import { PieChart, Pie, Cell } from 'recharts'

export default function VisualizerPage() {
  const [jsonData, setJsonData] = useState<any>(null)
  const [chartType, setChartType] = useState<'line' | 'bar' | 'pie'>('line')

  useEffect(() => {
    const storedData = localStorage.getItem('jsonData')
    if (storedData) {
      try {
        setJsonData(JSON.parse(storedData))
      } catch (error) {
        console.error('Invalid JSON:', error)
      }
    }
  }, [])

  const renderChart = () => {
    if (!jsonData || !Array.isArray(jsonData)) {
      return <p>No valid data to visualize</p>
    }

    switch (chartType) {
      case 'line':
        return (
          <LineChart width={600} height={300} data={jsonData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart>
        )
      case 'bar':
        return (
          <BarChart width={600} height={300} data={jsonData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        )
      case 'pie':
        return (
          <PieChart width={400} height={400}>
            <Pie
              data={jsonData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={150}
              fill="#8884d8"
              label
            >
              {jsonData.map((_: any, index: number) => (
                <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random()*16777215).toString(16)}`} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        )
    }
  }

  return (
    <div className="container mx-auto mt-10">
      <Card>
        <CardContent>
          <h1 className="text-2xl font-bold mb-4">JSON Visualizer</h1>
          <div className="mb-4 space-x-2">
            <Button onClick={() => setChartType('line')} variant={chartType === 'line' ? 'default' : 'outline'}>Line Chart</Button>
            <Button onClick={() => setChartType('bar')} variant={chartType === 'bar' ? 'default' : 'outline'}>Bar Chart</Button>
            <Button onClick={() => setChartType('pie')} variant={chartType === 'pie' ? 'default' : 'outline'}>Pie Chart</Button>
          </div>
          {renderChart()}
          <div className="mt-4">
            <Link href="/main">
              <Button>Back to Main Page</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}