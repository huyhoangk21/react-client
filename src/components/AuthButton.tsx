import { ButtonHTMLAttributes, PropsWithChildren, ReactElement } from 'react';

const AuthButton = ({
  children,
  className,
  ...otherButtonProps
}: PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement>
>): ReactElement => {
  return (
    <button
      className={`bg-light-blue text-white text-sm font-semibold w-full py-1.5 rounded-sm mt-6 ${className}`}
      {...otherButtonProps}
    >
      {children}
    </button>
  );
};

export default AuthButton;
