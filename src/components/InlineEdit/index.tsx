import React, { useEffect, useState } from "react";

interface Props {
  value: string;
  setValue: (newValue: string) => void;
  textarea?: boolean;
}

const InlineEdit = ({ textarea, value, setValue }: Props) => {
  const [editingValue, setEditingValue] = useState(value);

  useEffect(() => {
    setEditingValue(value);
  }, [value]);

  const onChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => setEditingValue(event.target.value);

  const onKeyDown = (
    event:
      | React.KeyboardEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if ((event.key === "Enter" || event.key === "Escape") && !event.shiftKey) {
      event.currentTarget.blur();
    }
  };

  const onBlur = (
    event:
      | React.FocusEvent<HTMLInputElement, Element>
      | React.FocusEvent<HTMLTextAreaElement, Element>
  ) => {
    if (event.target.value.trim() === "") {
      setValue(value);
      setEditingValue(value);
    } else {
      setValue(event.target.value);
    }
  };

  return (
    <>
      {textarea ? (
        <textarea
          value={editingValue}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onBlur={onBlur}
        />
      ) : (
        <input
          type="text"
          value={editingValue}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onBlur={onBlur}
        />
      )}
    </>
  );
};

export default InlineEdit;
