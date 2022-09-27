import clsx from 'clsx';
import { createPortal } from 'react-dom';

import { Icon } from './';

type DrawerProps = {
  id: string;
  closeMenu: () => unknown;
  children?: React.ReactNode;
  size?: keyof typeof sizes;
  className?: string;
};

const sizes = {
  md: {
    container: 'min-w-[20rem] w-[480px] max-w-xl p-4',
    button: 'right-4 top-4',
  },
};
export function Drawer({
  id,
  closeMenu,
  children,
  size = 'md',
  className = '',
}: DrawerProps) {
  return createPortal(
    <div
      onClick={(e) => {
        if (e.currentTarget !== e.target) return true;
        closeMenu();
      }}
      className="flex bg-opacity-60 bg-secondary-900 justify-center items-center fixed top-0 w-full h-full z-20"
    >
      <div
        className={clsx(
          'text-secondary-800 bg-main shadow-lg rounded-[32px] relative',
          sizes[size].container,
          className
        )}
      >
        <button
          onClick={closeMenu}
          className={clsx(
            'absolute ml-auto rounded-full hover:bg-secondary-200 p-1',
            sizes[size].button
          )}
        >
          <Icon type="close" className="w-8 h-8 select-none" />
        </button>
        {children}
      </div>
    </div>,
    document.getElementById(id)!
  );
}
