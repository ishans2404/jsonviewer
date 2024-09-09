import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface SearchFilterProps {
  data: string
}

export default function SearchFilter({ data }: SearchFilterProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState<string[]>([])

  const handleSearch = () => {
    try {
      const jsonData = JSON.parse(data)
      const foundPaths = searchJson(jsonData, searchTerm)
      setResults(foundPaths)
    } catch (error) {
      console.error('Invalid JSON:', error)
    }
  }

  const searchJson = (obj: any, term: string, path: string = ''): string[] => {
    let results: string[] = []

    for (const [key, value] of Object.entries(obj)) {
      const currentPath = path ? `${path}.${key}` : key

      if (typeof value === 'object' && value !== null) {
        results = results.concat(searchJson(value, term, currentPath))
      } else if (String(value).toLowerCase().includes(term.toLowerCase())) {
        results.push(currentPath)
      }
    }

    return results
  }

  return (
    <div>
      <div className="flex space-x-2">
        <Input
          type="text"
          placeholder="Search JSON..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>
      {results.length > 0 && (
        <div className="mt-2">
          <h3>Results:</h3>
          <ul>
            {results.map((path, index) => (
              <li key={index}>{path}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}