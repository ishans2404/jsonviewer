import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface ThemeToggleProps {
  theme: string
  setTheme: (theme: string) => void
}

export default function ThemeToggle({ theme, setTheme }: ThemeToggleProps) {
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className="flex items-center space-x-2">
      <Switch id="theme-toggle" checked={theme === 'dark'} onCheckedChange={toggleTheme} />
      <Label htmlFor="theme-toggle">Dark Mode</Label>
    </div>
  )
}