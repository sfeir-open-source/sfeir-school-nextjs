import Image from 'next/image';

import { Person } from '@/types';

type PersonCardProps = {
  person: Person;
};

const PersonCard: React.FC<PersonCardProps> = ({ person }) => {
  return (
    <div className="card">
      <div className="card__body">
        <div className="personcard-header">
          {person.photo && (
            <Image
              className="personcard-header__photo"
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
        <div className="personcard-footer">
          <span className="personcard-footer__item">{person.phone}</span>
          <span className="personcard-footer__item">{person.email}</span>
          {person.manager && <span className="personcard-footer__item">{person.manager}</span>}
        </div>
      </div>
    </div>
  );
};

export default PersonCard;
