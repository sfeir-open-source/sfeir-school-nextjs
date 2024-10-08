import Image from 'next/image';

import { Person } from '@/types';

import placeholderImage from '@/assets/images/profile-placeholder.jpg';

type PersonCardProps = React.HTMLAttributes<HTMLDivElement> & {
  person: Person;
  actions?: React.ReactNode;
  compact?: boolean;
};

const PersonCard: React.FC<PersonCardProps> = ({ person, actions, className, compact = false }) => {
  return (
    <div className={`bg-white p-4 rounded-lg dark:bg-slate-900 ${className}`}>
      <div className="flex flex-col gap-2 items-center">
        <Image
          className="rounded-full"
          src={person.photo || placeholderImage}
          alt={`Picture of ${person.firstname} ${person.lastname}`}
          width="100"
          height="100"
        />
        <span className="font-semibold">
          {person.firstname} {person.lastname}
        </span>
        <span>{person.position}</span>
      </div>

      {!compact && (
        <div className="bg-gray-100 rounded-md p-2 mt-4 grid gap-2 dark:bg-slate-800">
          <span className="flex gap-1">{person.phone}</span>
          <span className="flex gap-1">{person.email}</span>
          {person.manager && <span className="flex gap-1">{person.manager}</span>}
        </div>
      )}

      {actions && <div className="pt-4">{actions}</div>}
    </div>
  );
};

export default PersonCard;
