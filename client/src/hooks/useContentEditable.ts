import { SyntheticEvent, useEffect, useRef, useState } from 'react';

export const useContentEditable = <T extends HTMLElement>(
  initialContent: string | undefined = ''
) => {
  const [content, setContent] = useState(initialContent);
  const contentRef = useRef<T>(null);
  const caretPos = useRef<number>();

  useEffect(() => {
    if (!contentRef.current || !caretPos.current) return;

    setCaret(contentRef.current, caretPos.current);
    contentRef.current.focus();
  }, [content]);

  const onInput = (e: SyntheticEvent) => {
    if (!contentRef.current) return;
    caretPos.current = getCaret(contentRef.current);
    setContent(contentRef.current.textContent || '');
  };

  return { content, onInput, contentRef, setContent };
};

function getCaret(element: Node) {
  let caretAt = 0;
  const selection = window.getSelection();

  if (!selection) return;

  if (selection.rangeCount === 0) return caretAt;

  const range = selection.getRangeAt(0);
  const preRange = range.cloneRange();
  preRange.selectNodeContents(element);
  preRange.setEnd(range.endContainer, range.endOffset);
  caretAt = preRange.toString().length;

  return caretAt;
}

function setCaret(element: Node, offset: number) {
  const selection = window.getSelection();
  const range = document.createRange();

  if (!selection) return;

  range.setStart(element.childNodes[0], offset);
  range.collapse(true);
  selection.removeAllRanges();
  selection.addRange(range);
}
