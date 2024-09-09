import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search, ChevronLeft, ChevronRight as ChevronRightIcon } from 'lucide-react';
import { JSONTree } from 'react-json-tree';
import { ScrollArea } from '@radix-ui/react-scroll-area';

interface JsonShowerProps {
  data: string;
}

const theme = {
    base00: 'white',
    base0B: 'rgb(0, 116, 232)',
    base0D: 'rgb(0, 184, 212)',
    base0E: 'rgb(174, 129, 255)',
  };

const JsonShower: React.FC<JsonShowerProps> = ({ data }) => {
  const [parsedData, setParsedData] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(new Set());
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [currentSearchIndex, setCurrentSearchIndex] = useState(-1);

  useEffect(() => {
    try {
      setParsedData(JSON.parse(data));
    } catch (error) {
      console.error('Invalid JSON:', error);
    }
  }, [data]);

  const expandAll = () => {
    const allPaths = new Set<string>();
    const traverse = (obj: any, path: string = '') => {
      if (typeof obj === 'object' && obj !== null) {
        Object.keys(obj).forEach(key => {
          const newPath = path ? `${path}.${key}` : key;
          allPaths.add(newPath);
          traverse(obj[key], newPath);
        });
      }
    };
    traverse(parsedData);
    setExpandedPaths(allPaths);
  };

  const collapseAll = () => {
    setExpandedPaths(new Set());
  };

  const search = () => {
    const results: string[] = [];
    const searchRecursive = (obj: any, path: string = '') => {
      if (typeof obj === 'object' && obj !== null) {
        Object.entries(obj).forEach(([key, value]) => {
          const newPath = path ? `${path}.${key}` : key;
          if (key.toLowerCase().includes(searchTerm.toLowerCase()) ||
              JSON.stringify(value).toLowerCase().includes(searchTerm.toLowerCase())) {
            results.push(newPath);
          }
          searchRecursive(value, newPath);
        });
      }
    };
    searchRecursive(parsedData);
    setSearchResults(results);
    setCurrentSearchIndex(results.length > 0 ? 0 : -1);

    // Expand paths to search results
    const pathsToExpand = new Set(expandedPaths);
    results.forEach(result => {
      const parts = result.split('.');
      let currentPath = '';
      parts.forEach(part => {
        currentPath += (currentPath ? '.' : '') + part;
        pathsToExpand.add(currentPath);
      });
    });
    setExpandedPaths(pathsToExpand);
  };

  const navigateSearch = (direction: 'next' | 'prev') => {
    if (searchResults.length === 0) return;

    let newIndex;
    if (direction === 'next') {
      newIndex = (currentSearchIndex + 1) % searchResults.length;
    } else {
      newIndex = (currentSearchIndex - 1 + searchResults.length) % searchResults.length;
    }
    setCurrentSearchIndex(newIndex);

    // Scroll to the highlighted search result
    const highlightedPath = searchResults[newIndex];
    if (highlightedPath) {
      const parts = highlightedPath.split('.');
      let currentPath = '';
      parts.forEach(part => {
        currentPath += (currentPath ? '.' : '') + part;
        if (expandedPaths.has(currentPath)) {
          return;
        }
        setExpandedPaths(prev => new Set(prev.add(currentPath)));
      });
    }
  };

  const getItemString = (type: string, data: any, itemType: string, itemString: string, keyPath: (string | number)[]) => (
    <span>{itemType} {itemString}</span>
  );

  return (
    <div>
      <div className="mb-4 flex space-x-2">
        <Input
          type="text"
          placeholder="Search JSON..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && search()}
        />
        <Button onClick={search}><Search size={16} /></Button>
        <Button onClick={() => navigateSearch('prev')} disabled={searchResults.length === 0}><ChevronLeft size={16} /></Button>
        <Button onClick={() => navigateSearch('next')} disabled={searchResults.length === 0}><ChevronRightIcon size={16} /></Button>
      </div>
      <div className="mb-2 space-x-2">
        <Button onClick={expandAll} variant="outline">Expand All</Button>
        <Button onClick={collapseAll} variant="outline">Collapse All</Button>
      </div>
      {/* <Card>
        <CardContent> */}
    
    <ScrollArea className="w-full h-full">
        {parsedData && (
          <JSONTree
            data={parsedData}
            theme={theme}
            invertTheme={false}
            getItemString={getItemString}
            shouldExpandNodeInitially={(keyPath, data, level) => expandedPaths.has(keyPath.join('.'))}
          />
        )}
    </ScrollArea>

        {/* </CardContent>
      </Card> */}
    </div>
  );
};

export default JsonShower;
