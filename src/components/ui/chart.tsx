import * as React from "react"
import { cn } from "../../lib/utils"

const ChartContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("flex flex-col gap-4", className)} {...props} />,
)
ChartContainer.displayName = "ChartContainer"

const Chart = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("h-[200px] w-full", className)} {...props} />
))
Chart.displayName = "Chart"

const ChartTooltip = ({
  content,
  ...props
}: {
  content: React.ReactNode
} & React.ComponentPropsWithoutRef<"div">) => {
  return (
    <div
      {...props}
      className={cn("recharts-tooltip-wrapper", "recharts-tooltip-wrapper-right", "recharts-tooltip-wrapper-bottom")}
    >
      {content}
    </div>
  )
}

const ChartTooltipContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("rounded-lg border bg-background p-2 shadow-md", className)} {...props} />
  ),
)
ChartTooltipContent.displayName = "ChartTooltipContent"

const ChartLegend = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-wrap items-center gap-4", className)} {...props} />
  ),
)
ChartLegend.displayName = "ChartLegend"

const ChartLegendItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    name: string
    color: string
  }
>(({ className, name, color, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center gap-1", className)} {...props}>
    <div className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: color }} />
    <span className="text-sm font-medium">{name}</span>
  </div>
))
ChartLegendItem.displayName = "ChartLegendItem"

export { ChartContainer, Chart, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendItem }
