import Link from 'next/link';

type NavigationItemsProps = {
  href: string;
  children: React.ReactNode;
};

const NavigationItem: React.FC<NavigationItemsProps> = ({ href, children }) => {
  return (
    <Link href={href} className={'block px-4 py-2 rounded-md'}>
      {children}
    </Link>
  );
};

export default NavigationItem;
