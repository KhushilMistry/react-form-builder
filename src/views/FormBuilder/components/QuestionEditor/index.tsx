import {Field, FormProvider, FormRef} from "../../../../components/Form";
import {Question} from "./types";
import "./styles.css";
import {forwardRef, useCallback, useMemo} from "react";

interface QuestionEditorProps {
  question: Question;
  onUpdate: (question: Question) => void;
  onDelete: (questionId: string) => void;
}

const fields: Field[] = [
  {
    name: "title",
    type: "text",
    label: "Question Title",
    required: true,
  },
  {
    name: "type",
    type: "select",
    label: "Question Type",
    required: true,
    options: [
      {value: "text", label: "Text"},
      {value: "number", label: "Number"},
      {value: "select", label: "Select"},
      {value: "multi-select", label: "Multi Select"},
      {value: "switch", label: "Switch"},
    ],
  },
  {
    name: "description",
    type: "text",
    label: "Description",
  },
  {
    name: "required",
    type: "switch",
    label: "Required",
  },
];

const QuestionEditor = forwardRef<FormRef, QuestionEditorProps>(
  ({question, onUpdate, onDelete}, ref) => {
    const initialValues = useMemo(
      () => ({
        title: question.title,
        type: question.type,
        description: question.description,
        required: question.required,
      }),
      [question.title, question.type, question.description, question.required]
    );

    const handleDelete = useCallback(() => {
      onDelete(question.id);
    }, [onDelete, question.id]);

    const handleChange = useCallback(
      (values: Record<string, unknown>) => {
        onUpdate({...question, ...values});
      },
      [onUpdate, question]
    );

    return (
      <div className="question-editor">
        <div className="question-header">
          <button onClick={handleDelete}>Delete</button>
        </div>

        <FormProvider
          ref={ref}
          formName={`question-${question.id}`}
          initialValues={initialValues}
          fields={fields}
          onChange={handleChange}
          autoSave={true}
          debounceMs={300}
        />
      </div>
    );
  }
);

export default QuestionEditor;
