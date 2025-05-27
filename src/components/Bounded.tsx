import { cn } from '@/lib/utils';

type BoundedProps = {
  as?: 'section' | 'article' | 'div' | 'main' | 'header' | 'footer' | 'nav' | 'form';
  className?: string;
  children: React.ReactNode;
};

export default function Bounded({
  as: Comp = 'section',
  className,
  children,
  ...restProps
}: BoundedProps) {
  return (
    <Comp className={cn('px-4 py-10 md:px-6 md:py-14 lg:py-16', className)} {...restProps}>
      <div className="mx-auto flex w-full max-w-7xl flex-col">{children}</div>
    </Comp>
  );
}
