import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';
import { Controller,  } from 'react-hook-form';

interface RTEProps {
  name: string;
  
  label?: string;
  defaultValue?: string;
}

export default function RTE({ name, label, defaultValue = "" }: RTEProps) {
  const editorRef = useRef(null);

  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}
      
      <Controller
        name={name}
        
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <Editor
            apiKey="s55yl11p3aeje5wqbq7rbb1inmh1jl83b6jjhhzhbz833cts"
            onInit={(evt, editor) => (editorRef.current ? '' :  editor)}
            initialValue={defaultValue}
            init={{
              branding: false,
              height: 500,
              menubar: true,
              plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
              ],
              toolbar:
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
              content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            value={value}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}
