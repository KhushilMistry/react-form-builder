import {Field, FormProvider, FormRef} from "../../../../components/Form";
import {QuestionEditorProps} from "./types";
import {forwardRef, useCallback, useMemo} from "react";
import {MdDelete} from "react-icons/md";
import "./styles.css";
import {OptionsListField} from "../OptionListField";
import {SelectOption} from "../../../../components/Form/types";

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
    // const [isExpanded, setIsExpanded] = useState(true);

    const initialValues = useMemo(
      () => ({
        title: question.title,
        type: question.type,
        description: question.description,
        required: question.required,
        options: question.options || [],
      }),
      [
        question.title,
        question.type,
        question.description,
        question.required,
        question.options,
      ]
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

    // const toggleExpand = useCallback(() => setIsExpanded((prev) => !prev), []);

    const validate = useCallback((newValues: Record<string, unknown>) => {
      if (
        (newValues["type"] === "select" ||
          newValues["type"] === "multi-select") &&
        (newValues["options"] as SelectOption[]).length === 0
      ) {
        return {options: "Options are required"};
      }
      return null;
    }, []);

    const customFields = useMemo(() => {
      if (question.type === "select" || question.type === "multi-select") {
        return [
          ...fields,
          {
            name: "options",
            type: "custom",
            label: "Option List",
            customRederer: OptionsListField,
          } as Field,
        ];
      }

      return fields;
    }, [question.type]);

    return (
      <div className="question-editor">
        <div className="question-header">
          <div className="question-title">
            {question.title || "Untitled Question"}
          </div>
          <div className="question-actions">
            {/* <button
              className="icon-button"
              onClick={toggleExpand}
              title={isExpanded ? "Collapse" : "Expand"}
            >
              {isExpanded ? (
                <MdExpandLess size={24} />
              ) : (
                <MdExpandMore size={24} />
              )}
            </button> */}
            <button
              className="icon-button delete"
              onClick={handleDelete}
              title="Delete"
            >
              <MdDelete size={24} />
            </button>
          </div>
        </div>

        <div className="question-content">
          <FormProvider
            ref={ref}
            formName={`question-${question.id}`}
            initialValues={initialValues}
            fields={customFields}
            onChange={handleChange}
            debounceMs={300}
            validate={validate}
          />
        </div>
      </div>
    );
  }
);

export default QuestionEditor;
