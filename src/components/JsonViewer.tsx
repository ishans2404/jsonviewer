import { useState, useEffect } from 'react'
import { Textarea } from "@/components/ui/textarea"

interface JsonViewerProps {
  data: string
  setData: (data: string) => void
}

export default function JsonViewer({ data, setData }: JsonViewerProps) {
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    validateJson(data)
  }, [data])

  const validateJson = (jsonString: string) => {
    try {
      JSON.parse(jsonString)
      setError(null)
    } catch (e) {
      setError((e as Error).message)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setData(e.target.value)
  }

  return (
    <div>
      <Textarea
        value={data}
        onChange={handleChange}
        className={`font-mono ${error ? 'border-red-500' : ''}`}
        rows={20}
      />
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  )
}