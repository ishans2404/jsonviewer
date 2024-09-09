import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Parser } from 'json2csv'
import { js2xml } from 'xml-js'
import yaml from 'js-yaml'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function exportToCSV(jsonData: any): string {
  const parser = new Parser()
  return parser.parse(jsonData)
}

export function exportToXML(jsonData: any): string {
  return js2xml(jsonData, { compact: true, spaces: 2 })
}

export function exportToYAML(jsonData: any): string {
  return yaml.dump(jsonData)
}

export function downloadFile(content: string, fileName: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = fileName
  a.click()
  URL.revokeObjectURL(url)
}