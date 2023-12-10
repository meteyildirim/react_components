const ButtonWithPopupMenu = () => {
    const items = ['Option 1', 'Option 2', 'Option 3']; // Add your menu items here
  
    const [showMenu, setShowMenu] = useState(false);
  
    const toggleMenu = () => {
      setShowMenu(!showMenu);
    };
  
    return (
      <div>
        <button onClick={toggleMenu}>Open Menu</button>
        {showMenu && <PopupMenu items={items} />}
      </div>
    );
  };
  
  export default ButtonWithPopupMenu;