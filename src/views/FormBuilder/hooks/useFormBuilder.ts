import {useCallback, useEffect, useRef, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {FormRef} from "../../../components/Form/types";
import {Question} from "../components/QuestionEditor/types";
import {FormData} from "../../FormViewer/types";
import {v4 as uuidv4} from "uuid";

const SUCCESS_NOTE = "Changes Saved, Redirecting...";
const CHANGE_NOTE = "New Changes Added, Save the form to update";

export const useFormBuilder = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [formName, setFormName] = useState("");
  const [formId, setFormId] = useState<string | null>(null);
  const [footerNote, setFooterNote] = useState("");
  const questionRefs = useRef<Record<string, FormRef>>({});

  const setQuestionRef = useCallback((id: string, ref: FormRef | null) => {
    if (ref) {
      questionRefs.current[id] = ref;
    }
  }, []);

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      const forms: FormData[] = JSON.parse(
        localStorage.getItem("forms") || "[]"
      );
      const form = forms.find((f) => f.id === id);
      if (form) {
        setFormId(id);
        setFormName(form.name);
        setQuestions(form.questions);
      }
    }
  }, [formId, searchParams]);

  const addQuestion = useCallback(() => {
    const newQuestion: Question = {
      id: uuidv4(),
      title: "",
      type: "text",
      required: false,
    };
    setQuestions([...questions, newQuestion]);
    setFooterNote(CHANGE_NOTE);
  }, [questions]);

  const updateQuestion = useCallback((updatedQuestion: Question) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q.id === updatedQuestion.id ? updatedQuestion : q
      )
    );
    setFooterNote(CHANGE_NOTE);
  }, []);

  const deleteQuestion = useCallback(
    (questionId: string) => {
      setQuestions(questions.filter((q) => q.id !== questionId));
      setFooterNote(CHANGE_NOTE);
    },
    [questions]
  );

  const validateAllQuestions = useCallback(() => {
    let isValid = true;

    if (questions.length === 0) {
      isValid = false;
    }

    questions.forEach((question) => {
      const questionRef = questionRefs.current[question.id];
      if (questionRef) {
        const isQuestionValid = questionRef.submitForm();
        if (!isQuestionValid) {
          isValid = false;
        }
      }
    });

    return isValid;
  }, [questions]);

  const validateForm = useCallback(() => {
    if (!formName.trim()) {
      setFooterNote("Form name is required");
      return false;
    }
    return validateAllQuestions();
  }, [formName, validateAllQuestions]);

  const handleSaveForm = useCallback(() => {
    if (validateForm()) {
      const forms: FormData[] = JSON.parse(
        localStorage.getItem("forms") || "[]"
      );
      const formData = {
        id: formId || uuidv4(),
        name: formName.trim(),
        questions,
        createdAt: new Date().toISOString(),
      };

      if (formId) {
        const updatedForms = forms.map((f) => (f.id === formId ? formData : f));
        localStorage.setItem("forms", JSON.stringify(updatedForms));
      } else {
        localStorage.setItem("forms", JSON.stringify([...forms, formData]));
      }

      setFooterNote(SUCCESS_NOTE);
      setTimeout(() => navigate(`/view?id=${formData.id}`), 1000);
    }
  }, [formId, formName, navigate, questions, validateForm]);

  return {
    handleSaveForm,
    footerNote,
    deleteQuestion,
    updateQuestion,
    addQuestion,
    questions,
    formName,
    setFormName,
    setQuestionRef,
  };
};
