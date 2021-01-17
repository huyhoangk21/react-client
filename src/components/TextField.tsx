import { Fragment, InputHTMLAttributes, ReactElement, useState } from 'react';

const TextField = ({
  className,
  id,
  name,
  type,
  ...otherInputProps
}: InputHTMLAttributes<HTMLInputElement>): ReactElement => {
  const [show, setShow] = useState(false);

  return (
    <Fragment>
      <div className={`relative ${className}`}>
        <label htmlFor={id} className='text-xs capitalize text-gray-500'>
          {name}
        </label>
        <input
          id={id}
          name={name}
          type={show ? 'text' : type}
          {...otherInputProps}
          className='border border-gray-300 focus:border-gray-400 focus:outline-none rounded-sm px-2 py-1.5 w-full bg-gray-50 sm:bg-gray-100'
        />
        {id == 'password' && (
          <small
            onClick={() => setShow(!show)}
            className='font-semibold absolute right-2 top-8 cursor-pointer select-none'
          >
            {show ? 'Hide' : 'Show'}
          </small>
        )}
      </div>
    </Fragment>
  );
};

export default TextField;
