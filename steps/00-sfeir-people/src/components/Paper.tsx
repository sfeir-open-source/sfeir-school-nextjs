import clsx from 'clsx';

type PaperProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  rounded?: boolean;
};

const Paper: React.FC<PaperProps> = ({ children, rounded = true, ...restProps }) => (
  <div className={clsx('bg-white dark:bg-slate-900', rounded && 'rounded-lg', restProps?.className)}>{children}</div>
);

export default Paper;
