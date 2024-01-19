import { toast } from '@/components/ui/use-toast'

export const ShowToast = (
  title: string,
  description: string,
  variant: 'default' | 'destructive' | null = 'default',
  duration: number = 5000
): void => {
  toast({
    title,
    description,
    duration,
    variant
  })
}
