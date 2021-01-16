import { Fragment, InputHTMLAttributes, ReactElement, useState } from 'react';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  error?: string;
}

const TextField = ({
  className,
  error,
  id,
  name,
  type,
  ...otherInputProps
}: TextFieldProps): ReactElement => {
  const [show, setShow] = useState(false);

  return (
    <Fragment>
      <div className={`relative w-full ${className}`}>
        <label htmlFor={id} className='text-xs capitalize text-gray-500'>
          {name}
        </label>
        <input
          id={id}
          name={name}
          type={show ? 'text' : type}
          {...otherInputProps}
          className='border border-gray-300 focus:border-gray-400 focus:outline-none rounded-sm px-2 py-1.5 w-full bg-gray-50'
        />
        {id == 'password' && (
          <small
            onClick={() => setShow(!show)}
            className='font-semibold absolute right-2 top-8'
          >
            {show ? 'Hide' : 'Show'}
          </small>
        )}
      </div>
      <small className='text-red-500'>{error}</small>
    </Fragment>
  );
};

export default TextField;
