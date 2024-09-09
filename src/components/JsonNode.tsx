import React, { useRef, useEffect } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';

interface JsonNodeProps {
  data: any;
  keyName: string;
  level: number;
  searchTerm: string;
  expandedPaths: Set<string>;
  toggleExpand: (path: string) => void;
  path: string;
  searchResults: string[];
  currentSearchIndex: number;
  expandNode: (path: string) => void;
}

const JsonNode: React.FC<JsonNodeProps> = ({
  data,
  keyName,
  level,
  searchTerm,
  expandedPaths,
  toggleExpand,
  path,
  searchResults,
  currentSearchIndex,
  expandNode
}) => {
  const nodeRef = useRef<HTMLDivElement>(null);

  const getColor = (type: string) => {
    switch (type) {
      case 'string': return 'text-green-600 dark:text-green-400';
      case 'number': return 'text-blue-600 dark:text-blue-400';
      case 'boolean': return 'text-purple-600 dark:text-purple-400';
      case 'null': return 'text-red-600 dark:text-red-400';
      default: return 'text-gray-800 dark:text-gray-200';
    }
  };

  const renderValue = (value: any) => {
    const type = typeof value;
    const color = getColor(type);
    const stringValue = JSON.stringify(value);

    if (searchTerm && stringValue.toLowerCase().includes(searchTerm.toLowerCase())) {
      return <span className={`${color} bg-yellow-200 dark:bg-yellow-800`}>{stringValue}</span>;
    }

    return <span className={color}>{stringValue}</span>;
  };

  const isExpanded = expandedPaths.has(path);
  const hasChildren = typeof data === 'object' && data !== null;
  const shouldHighlight = searchResults.includes(path) && searchResults[currentSearchIndex] === path;

  useEffect(() => {
    if (shouldHighlight && nodeRef.current) {
      nodeRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [shouldHighlight]);

  useEffect(() => {
    if (shouldHighlight) {
      expandNode(path);
    }
  }, [shouldHighlight]);

  return (
    <div
      ref={nodeRef}
      className={`ml-${level * 4} ${shouldHighlight ? 'bg-yellow-300 dark:bg-yellow-700' : ''}`}
    >
      <div
        className="flex items-center cursor-pointer"
        onClick={() => toggleExpand(path)}
      >
        {hasChildren && (
          isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />
        )}
        <span className="font-bold mr-2">{keyName}:</span>
        {!hasChildren && renderValue(data)}
      </div>
      {hasChildren && isExpanded && (
        <div>
          {Object.entries(data).map(([key, value]) => (
            <JsonNode
              key={`${path}.${key}`}
              data={value}
              keyName={key}
              level={level + 1}
              searchTerm={searchTerm}
              expandedPaths={expandedPaths}
              toggleExpand={toggleExpand}
              path={`${path}.${key}`}
              searchResults={searchResults}
              currentSearchIndex={currentSearchIndex}
              expandNode={expandNode}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default JsonNode;
