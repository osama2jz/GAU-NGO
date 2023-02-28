import { Editor } from "react-draft-wysiwyg";

const TextEditor = ({value, onChange }) => {
  return (
    <Editor
      editorState={value}
      wrapperClassName="wrapperClassName"
      editorClassName="editorClassName"
      onEditorStateChange={onChange}
    />
  );
};
export default TextEditor;
