"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

export default function Home() {
  const [jsonInput, setJsonInput] = useState('');
  const router = useRouter();

  const handleSubmit = () => {
    if (jsonInput) {
      localStorage.setItem('jsonData', jsonInput);
      router.push('/main');
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        // Optionally check content here or add validation
        console.log(content); // Debugging line to check file content
        setJsonInput(content);
      };
      reader.onerror = (error) => {
        console.error("File reading error:", error);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>JSON Viewer/Formatter</CardTitle>
          <CardDescription>Paste your JSON data or upload a JSON file</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Paste your JSON here..."
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            className="min-h-[200px]"
          />
          <div className="mt-4">
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="hidden"
              id="json-file-input"
            />
            <label htmlFor="json-file-input">
              <Button variant="outline" className="cursor-pointer">
                Upload JSON File
              </Button>
            </label>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit}>View JSON</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
