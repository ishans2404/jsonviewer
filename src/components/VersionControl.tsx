import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"

interface VersionControlProps {
  data: string
}

interface Version {
  id: number
  data: string
  timestamp: Date
}

export default function VersionControl({ data }: VersionControlProps) {
  const [versions, setVersions] = useState<Version[]>([])
  const [currentVersion, setCurrentVersion] = useState(0)

  useEffect(() => {
    const storedVersions = localStorage.getItem('jsonVersions')
    if (storedVersions) {
      setVersions(JSON.parse(storedVersions))
    }
  }, [])

  useEffect(() => {
    if (data !== versions[currentVersion]?.data) {
      const newVersion: Version = {
        id: versions.length,
        data: data,
        timestamp: new Date(),
      }
      const updatedVersions = [...versions, newVersion]
      setVersions(updatedVersions)
      setCurrentVersion(updatedVersions.length - 1)
      localStorage.setItem('jsonVersions', JSON.stringify(updatedVersions))
    }
  }, [data])

  const handleVersionChange = (versionId: number) => {
    setCurrentVersion(versionId)
    // Update the main JSON data with the selected version
    // You'll need to implement this logic in the parent component
  }

  return (
    <div>
      <h3>Version History</h3>
      <div className="space-x-2">
        {versions.map((version) => (
          <Button
            key={version.id}
            onClick={() => handleVersionChange(version.id)}
            variant={currentVersion === version.id ? 'default' : 'outline'}
          >
            V{version.id + 1}
          </Button>
        ))}
      </div>
    </div>
  )
}