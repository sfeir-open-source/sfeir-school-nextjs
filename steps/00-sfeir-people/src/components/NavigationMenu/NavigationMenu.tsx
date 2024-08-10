import Logout from './Logout';
import NavigationItem from './NavigationItem';

const NavigationMenu = () => {
  return (
    <nav>
      <ul className="flex flex-col gap-2">
        <li>
          <NavigationItem href="/">Home</NavigationItem>
        </li>
        <li>
          <NavigationItem href="/employees">Employees</NavigationItem>
        </li>
        <li>
          <NavigationItem href="/expenses">Expenses</NavigationItem>
        </li>
        <li>
          <Logout />
        </li>
      </ul>
    </nav>
  );
};

export default NavigationMenu;
