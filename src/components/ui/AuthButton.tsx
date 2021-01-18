import { ButtonHTMLAttributes, PropsWithChildren, ReactElement } from 'react';

const AuthButton = ({
  children,
  className,
  disabled,
  ...otherButtonProps
}: PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement>
>): ReactElement => {
  return (
    <button
      className={`bg-light-blue text-white text-sm font-semibold w-full py-1.5 rounded-sm mt-6 ${className} ${
        disabled && 'cursor-not-allowed opacity-40'
      }`}
      disabled={disabled}
      {...otherButtonProps}
    >
      {children}
    </button>
  );
};

export default AuthButton;
