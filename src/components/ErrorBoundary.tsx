

import { Component, type ErrorInfo, type ReactNode } from "react"
import { Button } from "./ui/button"

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ errorInfo })
    console.error("Error caught by ErrorBoundary:", error, errorInfo)
  }

  private handleReset = (): void => {
    this.setState({ hasError: false, error: null, errorInfo: null })
  }

  public render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
          <div className="w-full max-w-md p-8 space-y-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-red-600 dark:text-red-400">Something went wrong</h2>
            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded border border-red-200 dark:border-red-800">
              <p className="text-sm font-mono text-red-800 dark:text-red-300 overflow-auto">
                {this.state.error?.toString()}
              </p>
            </div>
            <div className="space-y-4">
              <Button onClick={this.handleReset} className="w-full">
                Try again
              </Button>
              <Button variant="outline" onClick={() => (window.location.href = "/")} className="w-full">
                Go to homepage
              </Button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
