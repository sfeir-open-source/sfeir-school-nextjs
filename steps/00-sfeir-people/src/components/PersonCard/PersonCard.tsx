import Image from 'next/image';

import { Person } from '@/types';

type PersonCardProps = {
  person: Person;
  actions?: React.ReactNode;
};

const PersonCard: React.FC<PersonCardProps> = ({ person, actions }) => {
  return (
    <div className="bg-white p-4 rounded-lg">
      <div className="flex flex-col gap-2 items-center">
        {person.photo && (
          <Image
            className="rounded-full"
            src={person.photo}
            alt={`Picture of ${person.firstname} ${person.lastname}`}
            width="100"
            height="100"
          />
        )}
        <span>
          {person.firstname} {person.lastname}
        </span>
        <span>{person.position}</span>
      </div>
      <div className="bg-gray-100 rounded-md p-2 mt-4 grid gap-2">
        <span className="flex gap-1">{person.phone}</span>
        <span className="flex gap-1">{person.email}</span>
        {person.manager && <span className="flex gap-1">{person.manager}</span>}
      </div>
      {actions && <div className="pt-4">{actions}</div>}
    </div>
  );
};

export default PersonCard;
