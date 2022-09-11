import { useState, useEffect, useRef } from 'react';

import { Icon } from '.';

interface PickerProps {
  data: string[];
  setData: React.Dispatch<React.SetStateAction<string[]>>;
  maxLength?: number;
  filter?: (datum: string) => boolean;
}

export function Picker({
  data,
  setData,
  maxLength = 100,
  filter: filter_ = (...args) => true,
}: PickerProps) {
  const [isAdding, setIsAdding] = useState(false);
  const newCategoryRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isAdding) newCategoryRef.current!.focus();
  }, [isAdding]);

  const filter = (value: string) => {
    return filter_(value) && !data.includes(value) && data.length < maxLength;
  };
  const addValue = (value: string) => setData((data) => [...data, value]);
  const removeValue = (value: string) => {
    setData((data) => data.filter((d) => d !== value));
  };

  return (
    <div className="flex gap-2 flex-wrap min-h-8">
      {data.map((datum) => (
        <span
          key={datum}
          className="inline-flex justify-center items-center rounded-3xl text-main bg-accent-700 pl-3 pr-2 py-1 gap-1"
        >
          {datum}
          <button onClick={() => removeValue(datum)}>
            <Icon type="close" className="h-5" />
          </button>
        </span>
      ))}

      {isAdding ? (
        <div className="relative min-w-[120px]">
          <input
            ref={newCategoryRef}
            type="text"
            size={1}
            className="w-full border-2 border-accent-700 px-2 py-0.5 rounded-3xl focus:outline-none"
            onBlur={(e) => {
              setIsAdding(false);
              if (filter(e.target.value)) addValue(e.target.value);
            }}
            onKeyDown={(e) => {
              switch (e.code) {
                case 'Escape':
                  return setIsAdding(false);
                case 'Enter':
                  if (filter(e.target.value)) addValue(e.target.value);
                  return setIsAdding(false);
              }
            }}
          />
        </div>
      ) : (
        <button onClick={() => setIsAdding(true)}>
          <span className="inline-flex justify-center items-center rounded-3xl border-2 border-accent-700 px-2 py-0.5 gap-1 hover:bg-accent-100 group">
            Add <Icon type="plus" className="h-5 text-accent-900" />
          </span>
        </button>
      )}
    </div>
  );
}
