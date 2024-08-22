import { useCallback } from "react";

const useTextAnalyzer = (dispatch, state) => {
  const handleInputChange = useCallback(
    async (e) => {
      const text = e.target.value;
      dispatch({ type: "SET_USER_INPUT", payload: text });

      if (text) {
        try {
          const response = await fetch("http://localhost:3002/api/analyze", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ text }),
          });

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const data = await response.json();
          dispatch({ type: "SET_ANALYSIS_RESULT", payload: data.result });
        } catch (error) {
          console.error("Error analyzing text:", error);
          dispatch({
            type: "SET_ANALYSIS_RESULT",
            payload: "Error occurred while analyzing text.",
          });
        }
      } else {
        dispatch({ type: "RESET_ANALYSIS_RESULT" });
      }
    },
    [dispatch]
  );

  const handleSubmit = useCallback(async () => {
    if (!state.userInput || !state.analysisResult) return;

    try {
      const response = await fetch("http://localhost:3002/api/save-analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: state.currentUser,
          text: state.userInput,
          result: state.analysisResult,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      if (data.success) {
        dispatch({ type: "ADD_ANALYSIS" });
        dispatch({ type: "SET_USER_INPUT", payload: "" }); // Clear the input field
      }
    } catch (error) {
      console.error("Error saving analysis data:", error);
    }
  }, [state.userInput, state.analysisResult, state.currentUser, dispatch]);

  return {
    handleInputChange,
    handleSubmit,
  };
};

export default useTextAnalyzer;
