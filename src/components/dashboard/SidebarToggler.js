import React, { useContext } from 'react';
import { GlobalContext } from '../../context';

const SidebarToggler = () => {
  const { showSidebar, setSidebar } = useContext(GlobalContext);

  return (
    <button
      className={`toggler ${showSidebar && 'toggler--clicked'}`}
      onClick={() => setSidebar(!showSidebar)}
    >
      <div className="toggler__bars">
        <div className="toggler__bar toggler__bar--top"></div>
        <div className="toggler__bar toggler__bar--bottom"></div>
      </div>
    </button>
  );
};

export default SidebarToggler;
