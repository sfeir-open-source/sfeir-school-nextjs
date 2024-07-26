import NavigationItem from './NavigationItem';

const NavigationMenu = () => {
  return (
    <nav>
      <ul className="menu">
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
          <form>
            <button type="submit" className="menu__item">
              Logout
            </button>
          </form>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationMenu;
