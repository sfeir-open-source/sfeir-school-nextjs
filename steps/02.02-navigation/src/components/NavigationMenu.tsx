const NavigationMenu = () => {
  return (
    <nav>
      <ul className="flex flex-col gap-2">
        <li>
          <a className="block px-4 py-2 rounded-md" href="/">
            Home
          </a>
        </li>
        <li>
          <a className="block px-4 py-2 rounded-md" href="/employees">
            Employees
          </a>
        </li>
        <li>
          <a className="block px-4 py-2 rounded-md" href="/expenses">
            Expenses
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationMenu;
