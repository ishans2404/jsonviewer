"use client";
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import JsonViewer from '@/components/JsonViewer'
import JsonShower from '@/components/JsonShower'
import ThemeToggle from '@/components/ThemeToggle'
// import VersionControl from '@/components/VersionControl'
import { exportToCSV, exportToXML, exportToYAML, downloadFile } from '@/lib/utils'

export default function MainPage() {
  const [jsonData, setJsonData] = useState('')
  const [theme, setTheme] = useState('light')
  const [activeTab, setActiveTab] = useState('editor')

  useEffect(() => {
    const storedData = localStorage.getItem('jsonData')
    if (storedData) {
      setJsonData(storedData)
    }
  }, [])

  const handleFormatJson = () => {
    try {
      const formatted = JSON.stringify(JSON.parse(jsonData), null, 2)
      setJsonData(formatted)
    } catch (error) {
      console.error('Invalid JSON:', error)
    }
  }

  const handleMinifyJson = () => {
    try {
      const minified = JSON.stringify(JSON.parse(jsonData))
      setJsonData(minified)
    } catch (error) {
      console.error('Invalid JSON:', error)
    }
  }

  const handleDownload = () => {
    downloadFile(jsonData, 'formatted.json', 'application/json')
  }

  const handleExport = (format: 'csv' | 'xml' | 'yaml') => {
    try {
      const parsedJson = JSON.parse(jsonData)
      let exportedContent: string
      let fileName: string
      let mimeType: string

      switch (format) {
        case 'csv':
          exportedContent = exportToCSV(parsedJson)
          fileName = 'exported.csv'
          mimeType = 'text/csv'
          break
        case 'xml':
          exportedContent = exportToXML(parsedJson)
          fileName = 'exported.xml'
          mimeType = 'application/xml'
          break
        case 'yaml':
          exportedContent = exportToYAML(parsedJson)
          fileName = 'exported.yaml'
          mimeType = 'application/x-yaml'
          break
      }

      downloadFile(exportedContent, fileName, mimeType)
    } catch (error) {
      console.error('Export failed:', error)
    }
  }

  return (
    <div className="container mx-auto mt-10">
      <Card>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">JSON Viewer/Formatter</h1>
            <ThemeToggle theme={theme} setTheme={setTheme} />
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="editor">JSON Editor</TabsTrigger>
              <TabsTrigger value="shower">JSON Shower</TabsTrigger>
            </TabsList>
            <TabsContent value="editor">
              <JsonViewer data={jsonData} setData={setJsonData} />
            </TabsContent>
            <TabsContent value="shower">
              <JsonShower data={jsonData} />
            </TabsContent>
          </Tabs>
          <div className="mt-4 space-x-2">
            <Button onClick={handleFormatJson}>Format</Button>
            <Button onClick={handleMinifyJson}>Minify</Button>
            <Button onClick={handleDownload}>Download JSON</Button>
            <Button onClick={() => handleExport('csv')}>Export to CSV</Button>
            <Button onClick={() => handleExport('xml')}>Export to XML</Button>
            <Button onClick={() => handleExport('yaml')}>Export to YAML</Button>
          </div>
          {/* <div className="mt-4">
            <VersionControl data={jsonData} setData={setJsonData} />
          </div> */}
          <div className="mt-4">
            <Link href="/visualizer">
              <Button>Visualize JSON</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}