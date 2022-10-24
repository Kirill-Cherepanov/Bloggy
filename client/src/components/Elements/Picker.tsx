import { useState, useEffect, useRef } from 'react';

import { Icon } from '.';

interface PickerProps {
  data: string[];
  setData: React.Dispatch<React.SetStateAction<string[]>>;
  maxLength?: number;
  filter?: (datum: string) => boolean;
  transform?: (datum: string) => string;
}

const defaultFilter = (value: string) => value.length > 0 && value.length < 20;
const defaultTransform = (value: string) => value.trim().split(' ')[0];

export function Picker({
  data,
  setData,
  maxLength = 100,
  filter: filter_ = defaultFilter,
  transform = defaultTransform,
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
              const value = transform(e.target.value);
              if (filter(value)) addValue(value);
              setIsAdding(false);
            }}
            onKeyDown={(e) => {
              const value = transform(e.target.value);
              switch (e.code) {
                case 'Escape':
                  return setIsAdding(false);
                case 'Enter':
                  if (filter(value)) addValue(value);
                  return setIsAdding(false);
                case 'Space':
                  if (filter(value)) {
                    addValue(value);
                    if (data.length >= maxLength - 1) setIsAdding(false);
                  }
                  e.target.value = '';
              }
            }}
          />
        </div>
      ) : (
        <button
          type="button"
          onClick={() => data.length < maxLength && setIsAdding(true)}
        >
          <span className="inline-flex justify-center items-center rounded-3xl border-2 border-accent-700 px-2 py-0.5 gap-1 hover:bg-accent-100 group">
            Add <Icon type="plus" className="h-5 text-accent-900" />
          </span>
        </button>
      )}
    </div>
  );
}
