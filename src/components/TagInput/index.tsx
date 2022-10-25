import React from "react";
import './index.scss'

type TagListType = React.FC<{ list: string [], removeTagData: (index: number) => void }>
type TagInputType = React.FC<{ tags: string []}>

const TagList: TagListType =  ({ list, removeTagData }) => {
  return (
    <ul className="tags">
        {list.map((tag, index) => (
          <li key={index} className="tag">
            <span className="tag-title">{tag}</span>
            <span
              className="tag-close-icon"
              onClick={() => removeTagData(index)}
            >
              x
            </span>
          </li>
        ))}
      </ul>
  )
}

const TagInput: TagInputType = ({ tags }) => {
  const [tagData, setTagData] = React.useState(tags);

  const removeTagData: (indexToRemove: number) => void = indexToRemove => {
    setTagData([...tagData.filter((_: string, index: number) => index !== indexToRemove)]);
  };

  const addTagData = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.currentTarget.value !== '') {
      setTagData([...tagData, event.currentTarget.value]);
      event.currentTarget.value = '';
    }
  };

  return (
    <div className="tag-input">
      <TagList 
        list={tagData}
        removeTagData={removeTagData}
      />
      <input
        type="text"
        onKeyUp={event => (event.key === 'Enter' ? addTagData(event) : null)}
        placeholder="Press enter to add a tag"
      />
    </div>
  );
};


export default TagInput