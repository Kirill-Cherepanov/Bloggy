import { useState, useEffect, useRef } from 'react';
import Icon from 'components/Elements/Icon';

interface Props {
  data: string[];
  setData: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function Picker({ data, setData }: Props) {
  const [isAdding, setIsAdding] = useState(false);
  const newCategoryRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isAdding) newCategoryRef.current!.focus();
  }, [isAdding]);

  return (
    <div className="flex gap-2 flex-wrap min-h-8">
      {data.map((datum) => (
        <span
          key={datum}
          className="inline-flex justify-center items-center rounded-3xl text-main bg-accent-700 pl-3 pr-2 py-1 gap-1"
        >
          {datum}
          <button
            onClick={() => {
              setData((data) => data.filter((d) => d !== datum));
            }}
          >
            <Icon type="close" className="h-5" />
          </button>
        </span>
      ))}
      {!isAdding ? (
        <button onClick={() => setIsAdding(true)}>
          <span className="inline-flex justify-center items-center rounded-3xl border-2 border-accent-700 px-2 py-0.5 gap-1 hover:bg-accent-100 group">
            Add <Icon type="plus" className="h-5 text-accent-900" />
          </span>
        </button>
      ) : (
        <div className="relative min-w-[120px]">
          <input
            ref={newCategoryRef}
            type="text"
            size={1}
            className="w-full border-2 border-accent-700 px-2 py-0.5 rounded-3xl focus:outline-none"
            onBlur={(e) => {
              setIsAdding(false);
              if (
                e.target.value !== '' &&
                e.target.value.length <= 20 &&
                !data.includes(e.target.value)
              ) {
                setData((data) => [...data, e.target.value]);
              }
            }}
            onKeyDown={(e) => {
              if (e.code === 'Escape') {
                setIsAdding(false);
              }
              if (e.code === 'Enter') {
                if (
                  e.target.value !== '' &&
                  e.target.value.length <= 20 &&
                  !data.includes(e.target.value)
                ) {
                  setData((data) => [...data, e.target.value]);
                }
                setIsAdding(false);
              }
            }}
          />
        </div>
      )}
    </div>
  );
}
