import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

const MaxWidthWrapper = ({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) => {
  return (
    <div
      className={cn(
        'h-full mx-auto w-full max-w-screen-xl px-3.5 md:px-20 transition-all ease-in-out',
        className
      )}>
      {children}
    </div>
  )
}

export default MaxWidthWrapper